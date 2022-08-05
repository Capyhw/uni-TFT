<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				options:{
					
				}
			};
		},
		methods: {

		},
		onLoad() {
			this._http('/img/tft/js/equip.js', 'GET').then(res => {
				console.log('装备===');
				this.options.equipList = res.data
				console.log(this.options);
			})
		}
	}
</script>

<style lang="scss">

</style>
