<template>
	<tft-comm-dialog ref="wrap">
		<view class="dialog-container dialog-select-hero">
			<view class="list-wrap">
				<view class="list">
					<template v-for="item in render_hero_list">
						<view :key="item.data.TFTID" v-if="item" class="item" :class="item.amount && 'selected'"
							:style="{'background-image': 'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/'+item.data.name+')'}"
							@click="addHero(item.data.chessId)">
							<view class="equal-number" v-show="item.amount">{{item.amount}}</view>
						</view>
					</template>
				</view>
			</view>
			<view class="tip">请选择优先三星的英雄</view>
			<view class="btn">
				<view class="delete" @click="deleteAll">全部移除</view>
				<view class="ok" @click="close">确定</view>
			</view>
		</view>
	</tft-comm-dialog>
</template>

<script>
	import TFTCommDialog from '@/components/TFTCommDialog.vue'
	import _ from 'lodash'
	export default {
		name: "AdjustHeroListDialog",
		components: {
			'tft-comm-dialog': TFTCommDialog,
		},
		data() {
			return {
				//棋牌上所有英雄
				map_list: [],
				hero_list: null,


			}
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
		computed: {

			render_hero_list() {

				// return this.mapList


				const hero_list = [];
				_.forEach(this.map_list, hero => {
					const item = {
						amount: 0,
						data: hero,
						chessId: hero.chessId
					};
					hero_list.push(item);
				});
				_.forEach(this.hero_list, chessId => {
					if (!chessId) return;
					const _data = _.find(hero_list, {
						chessId: chessId
					});
					if (!_data) return;
					_data.amount = this.countHero(chessId);
				});
				// console.log(hero_list);
				return hero_list

			}
		},
		watch: {
			mapList: {
				handler: function(newValue, oldValue) {
					this.map_list = newValue
				},
				immediate: true,
				deep: true // 深度监听
			}
		},
		methods: {
			open(hero_list) {
				if (!hero_list) return;
				this.hero_list = hero_list;
				this.$refs.wrap.open();
			},
			close() {
				this.$refs.wrap.close(() => {
					this.hero_list = null;
				});
			},
			addHero(hero_id) {
				//从左向右放
				for (var i = 0; i < this.hero_list.length; ++i) {
					if (!this.hero_list[i]) {
						this.hero_list[i] = hero_id;
						hero_id = undefined;
					}
				};
				//触发监听
				this.hero_list.push(hero_id);
				if (hero_id) {
					this.hero_list.shift();
				} else {
					this.hero_list.pop();
				}

			},
			deleteAll() {
				this.hero_list && this.hero_list.fill();
				//触发监听
				this.addHero();
			},
			countHero(hero_id) {
				var rs = 0;
				_.forEach(this.hero_list, item => {
					item === hero_id && (++rs);
				});
				return rs;
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
		/* padding-top: 2vh; */
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


		width: 3vw;
		height: 3vw;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 2;
		background-color: rgba(0, 0, 0);
		text-align: center;
		line-height: 3vw;
		font-size: 2vw;
		color: #eeeeee;
		outline: 1px rgba(255, 255, 255, 0.75) solid;
	}
</style>
