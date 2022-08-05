<template>
	<tft-comm-dialog ref="wrap">
		<view class="dialog-container dialog-select-hero">
			<view class="list">
				<template v-for="item in render_map_list">
					<view :key="item.TFTID" class="item" :class="item.TFTID == select_map.TFTID && 'selected'"
						:style="{'background-image': 'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/'+item.name+')'}"
						@click="addHero(item)">
					</view>
				</template>
			</view>
			<view class="tip" v-if="render_map_list.length!=0">请在棋盘英雄中选择一位主C英雄</view>
			<view class="tip" v-else>请在棋盘中先添加英雄</view>
			<view class="btn">
				<view class="delete" @click="close">取消</view>
				<view class="ok" @click="confirm">确定</view>
			</view>
		</view>
	</tft-comm-dialog>
</template>

<script>
	import TFTCommDialog from '@/components/TFTCommDialog.vue'
	import _ from 'lodash'
	export default {
		name: "SelectCarryDialog",
		components: {
			'tft-comm-dialog': TFTCommDialog,
		},
		props: {
			mapList: {
				type: Array,
				default: () => {
					return []
				}
			},
			carryMain: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				//棋牌上所有英雄
				map_list: [],
				select_map: null
			}
		},
		computed: {
			render_map_list() {
				return this.map_list
			},

		},
		watch: {

			mapList: {
				handler: function(newValue, oldValue) {
					this.map_list = newValue
				},
				immediate: true,
				deep: true // 深度监听
			},
			carryMain: {
				handler: function(newValue, oldValue) {
					this.select_map = newValue
				},
				immediate: true,
				deep: true // 深度监听
			},
		},
		methods: {
			open() {
				if (this.carryMain) {
					// this.select_map = this.carryMain
				}
				this.$refs.wrap.open();
			},
			close() {
				this.$refs.wrap.close(() => {
					this.select_map = null;
				});
			},
			addHero(map_item) {
				this.select_map = map_item;
			},
			confirm() {
				if (this.select_map) {
					this.$emit('setFinalMapMainCarry', this.select_map)
				}
				this.close();
			}
		}
	}
</script>

<style>
	.dialog-select-hero {
		width: 90vw;
		height: auto;
		background-color: #FFFFFF;
		border-radius: 2vw;
		overflow: hidden;
		/* padding-top: 48px; */
		display: flex;
		flex-direction: column;
	}

	.dialog-select-hero .list-wrap {
		padding-top: 6px;
		flex: 1;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.dialog-select-hero>.btn {
		border-top: 1px solid #E6E6E6;
		width: 100%;
		height: 6vh;
		overflow: hidden;
	}

	.dialog-select-hero>.btn>view {
		float: left;
		width: 49%;
		height: 10vh;
		font-size: 4vw;
		color: #1C1C1C;
		line-height: 6vh;
		text-align: center;
	}

	.dialog-select-hero>.btn>view.delete {
		color: #E9634E;
	}

	.dialog-select-hero>.btn>view.cancel {
		color: #A0ACB5;
	}

	.dialog-select-hero>.btn>view:last-of-type {
		border-left: 1px solid #E6E6E6;
	}

	.dialog-select-hero .tip {
		font-size: 3vw;
		color: #A0ACB5;
		text-align: center;

	}

	.dialog-select-hero .list {
		width: auto;
		height: auto;
		overflow: auto;
		display: flex;
		flex-wrap: wrap;
		padding: 2vw 4vw;
		align-content: flex-start;
	}

	.dialog-select-hero .item {

		display: inline-block;
		width: 10vw;
		height: 10vw;
		margin: 0 2vw 2vw 0;
		background-size: contain;
		background-repeat: no-repeat;

		background-color: #1c1c1c;
		outline: 0.8vw transparent solid;
		outline-offset: -0.6vw;
		position: relative;
	}

	.dialog-select-hero .item.selected {
		outline-color: #37a8b3;
		border-radius: 0;
		border-color: #eeeeee;
		filter: brightness(1.08);
	}

	.dialog-select-hero .item>.equal-number {
		width: 40px;
		height: 40px;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.75);
		text-align: center;
		line-height: 40px;
		font-size: 34px;
		color: #eeeeee;
		outline: 2px rgba(255, 255, 255, 0.75) solid;
	}
</style>
