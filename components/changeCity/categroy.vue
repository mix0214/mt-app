<template>
    <div>
       <dl class="m-categroy">
         <dt>按拼音首字母选择:</dt>
         <dd v-for="item in list" :key="item">
           <!-- 跳转连接 -->
             <a :href="'#city-'+item">{{ item }}</a>
         </dd>
       </dl>
       <dl v-for='item in block' :key="item.title" class="m-categroy-section">
         <!-- 跳转连接 -->
         <dt :id="'city-'+item.title">{{item.title}}</dt>
         <dd>
             <span v-for="c in item.city" :key="c" >{{c}}</span>
         </dd>
       </dl>
    </div>
</template>

<script>
  import pyjs from 'js-pinyin'
  export default {
    data(){
      return {
        list:'ABCDEFGHIJKLMNOPQRSTUVWXZ'.split(''),
        block:[]
      }
    },
    async mounted(){
      let self = this
      let blocks=[];
      let {status,data:{city}}= await self.$axios.get('/geo/city')
      if (status===200){
         let p
         let c
         let d ={}
         city.forEach(item=>{
           //js-pinying  获取拼音的方法
           p=pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1)
           c=p.charCodeAt(0)
           //取小写a-z的值
           if(c>96&&c<123){
              if(!d[p]){
                d[p]=[]
              }
              //地区去一个  push一个
              d[p].push(item.name)
           }
         })
         //将数据转化为数组
         for (let [k,v] of Object.entries(d) ){
             blocks.push({
               title:k.toUpperCase(),
               city:v
             })
         }
         //排序
      blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))
      self.block=blocks
      }
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/categroy.scss"
</style>
