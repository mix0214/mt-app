<template>
	<div class="m-geo">
		<i class="el-icon-location"/>{{ $store.state.geo.position.city }}
		<nuxt-link
		class="changecity"
		to="/changeCity"
		>
		切换城市
		</nuxt-link>
		[香河 廊坊 固安]
	</div>
</template>
<style lang="scss">

</style>
<script type="text/javascript">

</script>
