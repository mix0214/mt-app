export default {
	dbs:'mongodb://127.0.0.1:27017/student',
	redis:{
		get host(){
			return '127.0.0.1'
		},
		get port(){
			return 6379
		}
	},
	// 邮箱验证
	smtp:{
		get host(){
			return 'smtp.qq.com'
		},
		get user(){
			return '863350690@qq.com'
		},
		// 邮箱授权码
		get pass(){
			return 'vhcsbtqhljvfbdaj'
		},
		// 获取4位验证码
		get code(){
			return () =>{
				return Math.random().toString(16).slice(2,6).toUpperCase()
			}
		},
		// 保存时间
		get expire(){
			return () =>{
				return new Date().getTime()+60*60*1000
			}
		}
	}
	
}