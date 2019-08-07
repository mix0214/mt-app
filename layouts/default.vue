<template>
	<el-container class="layout-default">
		<el-header style="height:100%;">
			<my-header/>
		</el-header>
		<nuxt />
		<el-footer style="height:100%">
			<my-footer/>
		</el-footer>
	</el-container>
</template>
<script>
	import MyHeader from "@/components/public/header/index";
	import MyFooter from "@/components/public/footer/index";
	export default {
		components: {
			MyHeader,
			MyFooter
		}
	}
</script>
