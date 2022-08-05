<template>
	<tft-comm-dialog ref="wrap">
		<view class="dialog-container dialog-select-equipment" v-if="equip_list">
			<view class="index-tab-title">
				<view class="title-item selected">
					<view class="inner">
						<view>基础装备</view>
					</view>
				</view>
			</view>
			<view class="list">
				<template v-for="equip in render_equip_list">
					<view :key="equip.equip_id" class="item" :style="{'background-image':'url('+equip.data.imagePath+')'}"
						:class="equip.amount && 'selected'" @touchstart="addEquip(equip.equip_id)">
						<view class="equal-number">{{equip.amount}}</view>
					</view>
				</template>
			</view>
			<view class="tip">点击添加装备</view>
			<view class="btn">
				<view class="delete" @click="deleteAll">全部移除</view>
				<view class="ok" @click="close">确定</view>
			</view>
		</view>
	</tft-comm-dialog>
</template>

<script>
	import TFTCommDialog from '@/components/TFTCommDialog.vue'
	import {
		options
	} from '@/common/options.js'
	import {
		_http
	} from '@/utils/request.js'
	import _ from 'lodash'
	export default {
		name: "AdjustOrderDialog",
		components: {
			'tft-comm-dialog': TFTCommDialog,
		},
		data() {
			return {
				//装备数据
				equip_data_all: [],
				//抢装
				equip_list: null,
			};
		},
		computed: {
			render_equip_list: function() {
				const formula_list = [];
				_.forEach(this.equip_data_all, equip => {
					if (equip.formula || (+equip.jobId || +equip.raceId) || equip.type === 3) return;
					const item = {
						amount: 0,
						data: equip,
						equip_id: equip.equipId
					};
					formula_list.push(item);
				});
				_.forEach(this.equip_list, equip_id => {
					if (!equip_id) return;
					const _data = _.find(formula_list, {
						equip_id: equip_id
					});
					if (!_data) return;
					_data.amount = this.countEquip(equip_id);
				});
				return formula_list;
			}
		},
		methods: {
			open(equip_list) {
				if (!equip_list) return;
				this.equip_list = equip_list;
				this.$refs.wrap.open();

			},
			close() {
				this.$refs.wrap.close(() => {
					this.equip_list = null;
				});
			},
			addEquip(equip_id) {
				//从左向右放
				for (let i = 0; i < this.equip_list.length; i++) {
					if (!this.equip_list[i]) {
						this.equip_list[i] = equip_id;
						equip_id = undefined;
					}
				};
				//触发监听
				this.equip_list.push(equip_id);
				if (equip_id) {
					this.equip_list.shift();
				} else {
					this.equip_list.pop();
				}

			},
			deleteAll() {
				this.equip_list && this.equip_list.fill();
				//触发监听
				this.addEquip();
			},
			countEquip(equip_id) {
				var rs = 0;
				_.forEach(this.equip_list, item => {
					item === equip_id && (++rs);
				});
				return rs;
			}
		},
		created() {
			//深拷贝
			function deepClone(obj) {
				let copy = obj instanceof Array ? [] : {}
				for (let key in obj) {
					if (obj.hasOwnProperty(key)) {
						copy[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
					}
				}
				return copy
			}
			this.equip_data_all = deepClone(options.equipList)
			//S7赛季的装备
			const s7_equip = [501, 502, 503, 504, 505, 506, 507, 508, 509, 519, 521, 523, 525, 529, 531, 535, 537, 539,
				541, 543, 545, 547, 551, 553, 555, 557, 559, 561, 565, 567, 569, 571, 573, 577, 579, 581, 583, 587,
				589, 591, 595, 597, 601, 603, 607, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 6022, 7001, 7002,
				7003, 7004, 7005, 7006, 7007, 7008, 7009, 7010, 7011, 7012, 7013, 7014, 7015, 7016, 7017, 7018, 7019,
				7020, 7031, 7032, 7022, 7023, 7024, 7025, 7026, 7027, 7028, 7030, 5001, 5002, 5003, 5004, 5005, 5006,
				5007, 5008, 5009, 5010, 5011, 5012, 5013, 5014, 5015, 5016, 5017, 5018, 5019, 5020, 5021, 5022, 5023,
				5024, 5025, 5026, 5027, 5028, 5029, 5030, 5031, 5032, 5033, 5034, 5035, 5036
			];
			//从所有装备中过滤出S7赛季的装备
			this.equip_data_all = _.filter(this.equip_data_all, function(item) {
				return _.indexOf(s7_equip, +item.equipId) !== -1;
			});
			//S7赛季的特殊装备（光明、转职、金鳞龙装备）
			const s7_spec = [412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 6022, 7001, 7002, 7003, 7004, 7005, 7006,
				7007, 7008, 7009, 7010, 7011, 7012, 7013, 7014, 7015, 7016, 7017, 7018, 7019, 7020, 7031, 7032, 7022,
				7023, 7024, 7025, 7026, 7027, 7028, 7030, 5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010,
				5011, 5012, 5013, 5014, 5015, 5016, 5017, 5018, 5019, 5020, 5021, 5022, 5023, 5024, 5025, 5026, 5027,
				5028, 5029, 5030, 5031, 5032, 5033, 5034, 5035, 5036
			];
			//将特殊装备设置type为3
			_.forEach(this.equip_data_all, item => {
				if (_.indexOf(s7_spec, +item.equipId) !== -1) {
					item.type = 3;
				};
			});

			this.equip_data_all = _.orderBy(this.equip_data_all, "type")

		}
	}
</script>

<style>
	.dialog-select-equipment {
		width: 90vw;
		height: auto;
		background-color: #FFFFFF;
		border-radius: 2vw;
		overflow: hidden;
	}

	.dialog-select-equipment .index-tab-title {
		width: 100%;
		height: 6vh;
		overflow: hidden;
		background-color: #ffffff;
		display: flex;
		padding: 0 0px;
		justify-content: space-around;
		border-bottom: 2px #f2f3f7 solid;
	}

	.dialog-select-equipment .index-tab-title>.title-item {
		width: auto;
		height: 6vh;
		text-align: center;
		padding-top: 0px;
	}

	.dialog-select-equipment .index-tab-title>.title-item>.inner {
		display: inline-block;
	}

	.dialog-select-equipment .index-tab-title>.title-item>.inner>view {
		transition: font-size 0.2s, color 0.2s;
		font-size: 2vw;
		height: 6vh;
		letter-spacing: 2px;
		line-height: 6vh;
		color: #747d7f;
	}



	.dialog-select-equipment .index-tab-title>.title-item.selected>.inner>view {
		font-size: 4vw;
		color: #1c1c1c;
	}





	.dialog-select-equipment>.btn {
		border-top: 1px solid #E6E6E6;
		width: 100%;
		height: 6vh;
		overflow: hidden;
	}

	.dialog-select-equipment>.btn>view {
		float: left;
		width: 49%;
		height: 10vh;
		font-size: 4vw;
		color: #1C1C1C;
		line-height: 6vh;
		text-align: center;
	}

	.dialog-select-equipment>.btn>view.delete {
		color: #E9634E;
	}

	.dialog-select-equipment>.btn>view.cancel {
		color: #A0ACB5;
	}

	.dialog-select-equipment>.btn>view:last-of-type {
		border-left: 1px solid #E6E6E6;
	}

	.dialog-select-equipment .tip {
		font-size: 3vw;
		color: #A0ACB5;
		text-align: center;
	}

	.dialog-select-equipment .list {
		width: auto;
		height: auto;
		overflow: auto;
		display: flex;
		flex-wrap: wrap;
		padding: 2vw 4vw;
		align-content: flex-start;

	}

	.dialog-select-equipment .list.max-height {
		margin-bottom: 0;
	}

	.dialog-select-equipment .item {
		width: 10vw;
		height: 10vw;
		margin: 0 2vw 2vw 0;

		outline: 0.8vw transparent solid;
		background-size: contain;
		background-repeat: no-repeat;
	}

	.dialog-select-equipment .item:nth-of-type(7n) {
		margin-right: 0;
	}

	.dialog-select-equipment .item.selected {
		outline-color: #37a8b3;
		border-radius: 0;
		filter: brightness(1.08);
		border-color: #eeeeee;
	}

	.dialog-select-equipment .item.selected>.equal-number {
		display: block;
	}

	.dialog-select-equipment .item>.equal-number {
		display: none;
		width: 3vw;
		height: 3vw;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.75);
		text-align: center;
		line-height: 3vw;
		font-size: 2vw;
		color: #eeeeee;
		outline: 1px rgba(255, 255, 255, 0.75) solid;
	}
</style>
