import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

// 检验是否登录
// 查询用户名是否存在
passport.use(new LocalStrategy(async function(username,password,done){
	let where = {
		username
	};
	let result = await UserModel.findOne(where)
	if(result!=null){
		if(result.password===password){
			return done(null,result)
		}else{
			return done(null,false,'密码错误')
		}
	}else{
		return done(null,false,'用户不存在')
	}
}))
// 序列化
// 登录成功  加入cookie
passport.serializeUser(function(user,done){
	done(null,user)
})

// 反序列化
passport.deserializeUser(function(user,done){
	return done(null,user)
})

export default passport
