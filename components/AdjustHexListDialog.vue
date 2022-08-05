<template>
	<tft-comm-dialog ref="wrap">
		<view class="dialog-container dialog-select-equipment dialog-select-hex" v-if="hex_list">
			<view class="index-tab-title">
				<view class="title-item" :class="select_class === '1' && 'selected'" @click="selectClass('1')">
					<view class="inner">
						<view>一级</view>
					</view>
				</view>
				<view class="title-item" :class="select_class === '2' && 'selected'" @click="selectClass('2')">
					<view class="inner">
						<view>二级</view>
					</view>
				</view>
				<view class="title-item" :class="select_class === '3' && 'selected'" @click="selectClass('3')">
					<view class="inner">
						<view>三级</view>
					</view>
				</view>
			</view>
			<view class="list" ref="list">
				<template v-for="hex in render_hex_list">
					<view :key="hex.hex_id" class="item" :style="{'background-image':'url('+hex.icon+')'}"
						:class="hex.amount && 'selected'" @click="addHex(hex.hex_id)">
						<view class="equal-number">{{hex.amount}}</view>
						<view class="item-name">{{hex.name}}</view>
					</view>
				</template>
			</view>
			<view class="tip">点击添加强化符文</view>
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
	import _ from 'lodash'
	export default {
		name: "AdjustHexListDialog",
		components: {
			'tft-comm-dialog': TFTCommDialog,
		},
		data() {
			return {
				//海克斯数据
				hex_data_all: [],
				hex_list: null,
				select_class: '1'
			}
		},
		watch: {
			render_hex_list(n, o) {
				if (n.length !== o.length) {
					this.$refs.list && (this.$refs.list.scrollTop = 0);
				}
			}
		},
		computed: {
			render_hex_list() {
				const hex_list = [];
				const select_class = this.select_class;
				const this_hex_list = this.hex_list;
				const nt = Date.now();
				_.forEach(this.hex_data_all, hex_item => {
					if (hex_item.type !== select_class) return;
					//备选去掉优选羁绊
					// if (this_hex_list === hex_replace_list && hex_main_list.indexOf(hex_item.id) !== -1) {
					// 	return;
					// };
					const rs = {
						amount: 0,
						name: hex_item.name,
						icon: hex_item.imgUrl,
						hex_id: hex_item.id
					};
					hex_list.push(rs);
					if (this_hex_list && this_hex_list.indexOf(rs.hex_id) !== -1) {
						rs.amount = this.countHex(hex_item.id);
					};
				});

				return hex_list;
			}
		},
		methods: {
			open(hex_list) {
				if (!hex_list) return;
				this.hex_list = hex_list;
				this.$refs.wrap.open();
			},
			close() {
				this.$refs.wrap.close(() => {
					this.hex_list = null;
				});
			},
			selectClass(hex_type) {
				this.select_class = hex_type;
			},
			addHex(hex_id) {
				//从左向右放
				for (var i = 0; i < this.hex_list.length; ++i) {
					if (!this.hex_list[i]) {
						this.hex_list[i] = hex_id;
						hex_id = undefined;
					}
				};
				//触发监听
				this.hex_list.push(hex_id);
				if (hex_id) {
					this.hex_list.shift();
				} else {
					this.hex_list.pop();
				}
			},
			deleteAll() {
				this.hex_list && this.hex_list.fill();
				//触发监听
				this.addHex();
			},
			countHex(hex_id) {
				var rs = 0;
				_.forEach(this.hex_list, item => {
					item === hex_id && (++rs);
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
			this.hex_data_all = deepClone(options.hexList)
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
		margin: 0 4vw 6vh 0;
		filter: brightness(0.92);
		outline: 0.8vw transparent solid;
		background-size: contain;
		background-repeat: no-repeat;
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


	.m-hex {
		margin-top: 48px;
	}

	.m-hex .equip-item {
		margin-right: 87px !important;
	}

	.dialog-select-hex .list {
		height: 70vh !important;
		margin-bottom: 0 !important;
		padding-right: 0 !important;
	}

	.dialog-select-hex .item {
		/* width: 129px !important; */
		/* height: 129px !important; */
		/* margin-right: 2vw !important; */
		/* margin-bottom: 2vw !important; */
		/* background-size: 129px 129px; */
		background-color: #edf0f0 !important;
	}

	.dialog-select-hex .item-name {
		display: block;
		margin-top: 10vw;
		font-size: 12px;
		color: #1C1C1C;
		width: 100%;
		height: 2vh;
		letter-spacing: -0.5px;
		text-align: center;
	}



	.dialog-select-hex .item:nth-of-type(6n) {
		margin-right: 0 !important;
	}

	/* 	.dialog-callveigar .tip {
		font-size: 36px !important;
		line-height: 1.5;
		padding: 0 24px 12px 24px;
	} */
</style>
