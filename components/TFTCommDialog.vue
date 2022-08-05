<template>
	<view v-if="show && stage !== 'hide'">
		<view class="tft-dialog-wrap" :class="[bind_class,stage]">
			<slot></slot><i class="disable-mask"></i>
		</view>
	</view>
</template>

<script>
	export default {
		name: "TFTCommDialog",
		props: {
			bind_class: String
		},
		data() {
			return {
				show: false,
				stage: 'hide',
				close_back: null
			}
		},
		methods: {
			open() {
				this.stage = "in";
				this.show = true;

				this.stage = 'live';
			},
			close(close_back) {
				this.close_back = close_back;
				this.stage = "out";

				this.stage = 'hide';
				this.close_back && this.close_back();
				this.show = false;
			},
			responseAnimationEnd() {
				if (this.stage === "out") {
					this.stage = 'hide';
					this.close_back && this.close_back();
					this.show = false;
				} else if (this.stage === "in") {
					this.stage = 'live';
				}
			}
		},





	}
</script>

<style>
	.tft-dialog-wrap {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9999;
		left: 0;
		top: 0;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(15px);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tft-dialog-wrap>.disable-mask {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 999999;
		display: none;
	}

	.tft-dialog-wrap.hide {
		display: none;
	}

	.tft-dialog-wrap.in {
		display: flex;
		/* animation: dialog-show-in 0.24s ease; */
	}

	.tft-dialog-wrap.in>.disable-mask {
		display: block;
	}

	/* 	.tft-dialog-wrap.in>.dialog-container {
		animation: dialog-container-in 0.48s ease-out;
		overflow-y: scroll;
	} */

	.tft-dialog-wrap.out {
		display: flex;
		/* animation: dialog-show-out 0.3s ease; */
	}

	.tft-dialog-wrap.out>.disable-mask {
		display: block;
	}

	.tft-dialog-wrap>.dialog-container {
		overflow-y: scroll;
	}
</style>
