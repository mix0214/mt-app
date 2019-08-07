import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
	prefix:"/users"
})

let Store = new Redis().client

// 注册接口
router.post('/signup',async (ctx)=>{
	const {
		username,
		password,
		email,
		code
	} = ctx.request.body;
	
	if(code){
		// 验证验证码消息
		const saveCode = await Store.hget(`nodemail:${username}`,'code');
		const saveExpire = await Store.hget(`nodemail:${username}`,'expire');
		if(code===saveCode){
			if(new Date().getTime() - saveExpire >0 ){
				ctx.body = {
					code:-1,
					msg:'验证码已过期,请重新尝试'
				}
				return false
			}
		} else {
			ctx.body = {
				code:-1,
				msg:'请填写正确的验证码'
			}
		} 
		// 没有验证码
	}else{
		ctx.body={
			code:-1,
			msg:'请填写验证码'
		}
	}
	// 检查用户名是否存在
	let user = await User.find({
		username
	})
	if(user.length){
		ctx.body={
			code:-1,
			msg:'用户已注册'
		}
		return
	}
	// 写入数据库
	let nuser = await User.create({username,password,email})
	if (nuser){
		let res = await axios.post('/users/signin',{username,password})
		if (res.data && res.data.code ===0 ){
			ctx.body = {
				code:0,
				msg:'注册成功',
				user:res.data.user
			}
		}else{
			ctx.body={
				code:-1,
				msg:'error'
			}
		}
	}else{
		ctx.body={
			code:-1,
			msg:'注册失败'
		}
	}
})

// 登录接口
router.post('/signin',async (ctx,next)=>{
	return Passport.authenticate('local',function(err,user,info,status){
		if(err){
			ctx.body={
				code:-1,
				msg:err
			}
		}else{
			if(user){
				ctx.body={
					code:0,
					msg:'登录成功',
					user
				}
				return ctx.login(user)
			}else{
				ctx.body={
					code:1,
					msg:info
				}
			}
		}
	})(ctx,next)
})
// 验证码
router.post('/verify',async (ctx,next)=>{
	let username = ctx.request.body.username
	// 获取时间
	const saveExpire = await Store.hget(`nodemail:${username}`,`expire`)
	if(saveExpire&& Date().getTime()-saveExpire<0){
		ctx.body={
			code:-1,
			msg:'验证请求过于频繁，1分钟内1次'
		}
		return false
	}
	let transporter = nodeMailer.createTransport({
		host:Email.smtp.host,
		port:587,
		// 监听其他端口
		secure:false,
		auth:{
			user:Email.smtp.user,
			pass:Email.smtp.pass
		}
	})
	// 储存数据
	let ko = {
		code:Email.smtp.code(),
		expire:Email.smtp.expire(),
		email:ctx.request.body.email,
		user:ctx.request.body.username
	}
	// 邮件参数
	let mailOptions={
		from:`"认证邮箱"<${Email.smtp.user}>`,
		to:ko.email,
		subject:'《慕课网高仿美团网全栈实战》注册码',
		html:`您在《慕课网高仿美团网全栈实战》课程中的注册,您的邀请码是${ko.code}`
	}
	// 发送内容
	await transporter.sendMail(mailOptions,(error,info)=>{
		if(error){
			return console.log('error')
		}else{
			Strore.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
		}
	})
	ctx.body={
		code:0,
		msg:'验证码已发送,可能·会有·验证,请耐心等待1分钟'
	}
})

// 退出
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

// 获取用户名
router.get('/getUser',async (ctx)=>{
	if(ctx.isAuthenticated()){
		const {username,email} = ctx.session.passport.user
		ctx.body={
			user:username,
			email
		}
	}else{
		ctx.body={
			user:'',
			email:''
		}
	}
})

export default router