<template>
	<view class="has-tabbar">
		<view class="flex-column-container">
			<text class="title">{{title}}</text>
		</view>
		 <tabbar :flag="1"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">

</style>
