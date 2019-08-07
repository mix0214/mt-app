<template>
	<div class="m-menu">
		<dl 
		class="nav"
		@mouseleave="mouseleave"
		>
			<dt>全部分类</dt>
			<dd 
			v-for="(item,idx) in $store.state.home.menu" 
			:key="idx" 
			@mouseenter="enter"
			>
				<i :class="item.type"/>{{item.name}}<span class="arrow"/>
			</dd>
		</dl>
		<div 
		class="detail"
		 v-if="kind"
		 @mouseenter="sover"
		 @mouseleave="sout"
		 >
			 <template v-for="(item,idx) in curdetail.child">
				 <h4 :key="idx">{{ item.title }}</h4>
				 <span
				 v-for="v in item.child"
				 :key="v"
				 >
					{{ v }} 
				 </span>
			 </template>
		</div>
	</div>
</template>

<style>
</style>
<script>
	export default{
		data(){
			return{
				kind:'',
				menu:[{
					type:'food',
					name:'美食',
					child:[{
						title:'美食',
						child:['代金券','甜品饮品','火锅','自助餐','小吃快餐']
					}]
				},{
					type:'takeout',
					name:'外卖',
					child:[{
						title:'外卖',
						child:['美团外卖']
					}]
				},{
					type:'hotel',
					name:'酒店',
					child:[{
						title:'酒店星级',
						child:['经济型','舒适/三星','高档/四星','豪华/五星']
					}]
				},{
					type:'homestay',
					name:'榛果民宿'
				},{
					type:'movie',
					name:'猫眼电影'
				},{
					type:'food',
					name:'机票/火车票'
				},{
					type:'ktv',
					name:'休闲娱乐 / KTV'
				},{
					type:'life',
					name:'生活服务'
				},{
					type:'takeout',
					name:'丽人/美发/医学美容'
				},{
					type:'marry',
					name:'结婚 / 婚纱摄影 / 婚宴'
				},{
					type:'hotel',
					name:'亲子 / 儿童乐园 / 幼教'
				},{
					type:'sport',
					name:'运动健身 / 健身中心'
				},{
					type:'homestay',
					name:'家装 / 建材 / 家居'
				},{
					type:'study',
					name:'学习培训 / 音乐培训'
				},{
					type:'health',
					name:'医疗健康 / 宠物 / 爱车'
				},{
					type:'bar',
					name:'酒吧 / 密室逃脱'
				}]
			}
		},
		computed:{
			curdetail:function(){
				// 过滤没有kind子数据的
				return this.$store.state.home.menu.filter((item) => item.type===this.kind)[0]
			}
		},
		methods:{
			mouseleave:function(){
				let self = this;
				self._timer=setTimeout(function(){
					self.kind=''
				},150)
			},
			enter:function(e){
				// hover时的 class就是type值
				// 赋值给kind
				this.kind=e.target.querySelector('i').className
			},
			sover:function(){
				clearTimeout(this._timer)
			},
			sout:function(){
				this.kind=''
			}
		}
		
	}
</script>
