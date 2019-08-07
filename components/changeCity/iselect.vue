<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select
     v-model="cvalue"
     :disabled="!city.length"
     placeholder="城市">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-autocomplete v-model="input" :fetch-suggestions="querySearchAsync" placeholder="请输入城市和拼音" @select="handleSelect"></el-autocomplete>
  </div>
</template>

<script>
  import _ from 'lodash';
  export default {
    data() {
      return {
        province:[],
        pvalue: '',
        city: [],
        cvalue: '',
        input:'',
        cities:[]
      }
    },
    //监听pvalue的变化
    watch:{
      pvalue:async function(newPvalue){
         let self = this;
         let {status,data:{city}} = await self.$axios.get(`/geo/province/${newPvalue}`)
         if(status===200){
           self.city=city.map(item=>{
             return {
               value:item.id,
               label:item.name
             }
           })
          self.cvalue=""
         }
      }
    },
    // 城市修改连动效果
    mounted:async function(){
      let self = this;
      let {status,data:{ province }} = await self.$axios.get('/geo/province')
      if(status===200){
        self.province = province.map(item=>{
           return {
             value:item.id,
             label:item.name
           }
        })
      }
    },
    methods:{
      //输入内容触发的函数
      // 第二参数是回调
    querySearchAsync:_.debounce(async function(query,cb){
        let self = this;
        if(self.cities.length){
          //过滤第一个字检索
          cb(self.cities.filter(item => item.value.indexOf(query)>-1))
        }else{
          let {status,data:{city}}=await self.$axios.get('/geo/city')
          if(status===200){
            self.cities=city.map(item=>{return{
              value:item.name
            }})
            cb(self.cities.filter(item => item.value.indexOf(query)>-1))
          }else{
            cb([])
          }
        }
    },200),
    handleSelect:function(item){
       console.log(item.value)
    }
  },
 }
</script>

<style lang="scss">
@import '@/assets/css/changecity/iselect.scss';
</style>
