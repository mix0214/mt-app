<template>
	<el-row :gutter="0" class="m-header">
		<el-col :span="6">
		  <geo/>
		</el-col>
		<el-col :span="5">
			<user/>
		</el-col>
		<el-col :span="13">
			<navbar/>
		</el-col>
	</el-row>
</template>
<style lang="scss">
@import "@/assets/css/public/layout.scss";	
@import "@/assets/css/public/header/index.scss";
</style>
<script>
import Geo from './geo'	
import User from './user'
import Navbar from './nav'
export default {
	components:{ Geo , User , Navbar }
}
</script>
