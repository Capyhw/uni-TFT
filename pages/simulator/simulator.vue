<template>
	<view>
		<view class="g-app">
		</view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="zhanwei" :style="{'height':getHeight+'px'}">
			<!-- 把胶囊空出来 -->
		</view>
		<view class="head">
			<u-tabs :list="tab0" :scrollable="false" :current='cur0' @change="(item)=>change(item,0)"> </u-tabs>
			<view class="simulator-cost" v-if="cur0==0">
				<u-tabs :list="tab1" :scrollable="false" :current='cur1' @change="(item)=>change(item,1)"> </u-tabs>
			</view>
			<view class="simulator-race" v-if="cur0==1">
				<u-tabs :list="tab2" :current='cur2' @change="(item)=>change(item,2)"> </u-tabs>
			</view>
			<view class="simulator-job" v-if="cur0==2">
				<u-tabs :list="tab3" :current='cur3' @change="(item)=>change(item,3)"> </u-tabs>
			</view>
		</view>
		<!-- 英雄显示 -->
		<view class="hero">
			<view class="hero-list">
				<template v-if="show_hero_list">
					<view class="hero-item" v-for="(item,index) in show_hero_list">
						<u--image :showLoading="true"
							:src="`https://game.gtimg.cn/images/lol/act/img/tft/champions/${item.name}`" width="15vw"
							height="15vw" @click="addHero(item)">
						</u--image>
						<view class="hero-name">
							{{item.displayName}}
						</view>
					</view>
				</template>
			</view>
		</view>
		<!-- 羁绊预览 -->
		<view class="fetter" v-if="current_contact">
			<uni-card :isFull="true">
				<text v-text="current_contact.introduce" class="uni-body"></text>
				<view v-for="(item2,index) in current_contact.level" class="part_column">
					<view class="part_row" v-if="item2">
						<view class="race_num">{{index}}</view>
						<view class="race_cur">
							{{item2}}
						</view>
					</view>
				</view>
			</uni-card>

		</view>
		<!-- 站位 -->
		<uni-section title="阵容站位" type="line" subTitle="拖拽调整站位，拖出棋盘删除">
			<uni-group mode="card" class="location">
				<view class="m-simulator-squad">
					<view class="simulator-squad-list" v-if="render_map_heroes_1">
						<template v-for="(i,index) in render_map_heroes_1">
							<view class="map-item">
								<view class="bg">
								</view>
								<template v-if="i">
									<view>
										<view class="hero " v-if="i.chessId"
											:style="{
									'background-image': 'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/'+getChess(i.chessId).name+')'	}">
										</view>
										<view class="border"></view>
										<view class="icon-carry" v-if="i.is_carry_hero"> </view>
										<view class="href-mask" @touchstart.self="touchStartOnMapSite($event,i)">

										</view>
									</view>

								</template>
							</view>
						</template>

					</view>
				</view>

				<view class="tip-text">
					点击英雄添加装备，装备"金铲铲冠冕"，可增加人口上限
				</view>
				<view class="simulator-squad-info">
					<view class="need-level">
						所需等级：{{levelNeed}}
					</view>
					<view class="need-zrzl" v-if="zrzl_number">
						金铲铲冠冕：{{}}
					</view>
				</view>
			</uni-group>
		</uni-section>

		<!-- 羁绊效果 -->
		<uni-section title="羁绊效果" type="line" v-if="render_map_heroes_1[0]">
			<uni-group mode="card" class="fetters">
				<view class="" v-for="(item,index2) in fetters">
					<!-- 羁绊图标和数量 -->
					<view class="fettersDetail">
						<view class="raceTitle" :class="'effect-level'+item.cur_level+'-box'">
							<image :src="item.imagePath" mode=""></image>
						</view>
						<view :class="'effect-level'+item.cur_level+'-bg'" class="title">
							{{item.num+'/'+item.next_num+item.name}}
						</view>
					</view>

				</view>
			</uni-group>
		</uni-section>

		<!-- 强化符文 -->
		<uni-section title="强化符文" type="line">
			<uni-group mode="card" class="hex">
				<AdjustHexListDialog ref="AdjustHexListDialog"></AdjustHexListDialog>
				<view class="main-hex">
					<view class="hex-list" @click="adjustHexMain">
						<view class="title">
							优选
						</view>
						<view class="hex-item" v-for="item in hex_main_list">
							<view class="hex" v-if="item" :style="{'background-image':'url('+getHex(item).imgUrl+')'}">

							</view>
						</view>

					</view>
					<view class="hex-list" @click="adjustHexBackup">
						<view class="title">
							备选
						</view>
						<view class="hex-item" v-for="item in hex_replace_list">
							<view class="hex" v-if="item" :style="{'background-image':'url('+getHex(item).imgUrl+')'}">

							</view>
						</view>
					</view>
				</view>
			</uni-group>
		</uni-section>


		<!-- 抢装顺序 -->
		<uni-section title="抢装顺序" type="line">
			<uni-group mode="card" class="equip-order">
				<adjust-order-dialog ref="AdjustOrderDialog" :catchtouchmove="true"></adjust-order-dialog>
				<view class="equip-list" @click="openOrderAdjustDialog">
					<template v-for="item in equip_order_list">
						<view class="equip-item">
							<view class="equip" v-if="item"
								:style=" {'background-image':'url('+getEquip(item).imagePath+')'}">

							</view>
						</view>
						<view class="arrow">

						</view>
					</template>

				</view>
			</uni-group>
		</uni-section>

		<!-- 主C装备 -->
		<uni-section title="主C装备" type="line">
			<uni-group mode="card" class="carry-equip">
				<select-carry-dialog ref="SelectCarryDialog" :mapList='hero_location' :carryMain='carry_main'
					@setFinalMapMainCarry='setFinalMapMainCarry'></select-carry-dialog>
				<adjust-equip-list-dialog ref="AdjustEquipListDialog"></adjust-equip-list-dialog>
				<view class="main-carry">
					<view class="main-hero" @click="selectMainHero">
						<template v-if="carry_main">
							<view class="avatar"
								:style="{'background-image':'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/'+carry_main.name+')'}">
							</view>
							<view class="icon-mainhero"></view>
							<!-- <view v-if="carry_main.catch.isLevel3Hero" class="icon-level3hero"></view> -->
						</template>
					</view>
					<view class="equip-list-wrap">
						<view class="equip-list" @click="adjustMainBase">
							<view class="title">
								必备
							</view>
							<view class="equip-item" v-for="item in this.carry_hero_base_equip">
								<view v-if="item" class="equip"
									:style="{'background-image':'url('+getEquip(item).imagePath+')'}"></view>
							</view>

						</view>
						<view class="equip-list" @click="adjustMainReplace">
							<view class="title">
								替代
							</view>
							<view class="equip-item" v-for="item in this.carry_hero_equip_replace">
								<view v-if="item" class="equip"
									:style="{'background-image':'url('+getEquip(item).imagePath+')'}"></view>
							</view>
						</view>
					</view>
				</view>
			</uni-group>
		</uni-section>



		<!-- 优先三星 -->
		<uni-section title="优先三星" type="line" subTitle="可同时选择多个英雄">
			<uni-group mode="card" class="three-star">
				<adjust-hero-list-dialog ref="AdjustHeroListDialog" :mapList='hero_location'></adjust-hero-list-dialog>
				<view class="hero-list-wrap" @click="adjustList">
					<template v-for="item in render_heros">
						<view class="hero-list-item">
							<view class="avatar" v-if="item"
								:style="{'background-image':'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/'+getChess(item).name+')'}">
							</view>

						</view>
					</template>

				</view>
			</uni-group>
		</uni-section>

	</view>

</template>



<script>
	import {
		_http
	} from "@/utils/request.js"
	import _ from 'lodash'
	import AdjustHexListDialog from '@/components/AdjustHexListDialog.vue'
	import AdjustOrderDialog from '@/components/AdjustOrderDialog.vue'
	import SelectCarryDialog from '@/components/SelectCarryDialog.vue'
	import AdjustHeroListDialog from '@/components/AdjustHeroListDialog.vue'
	import AdjustEquipListDialog from '@/components/AdjustEquipListDialog.vue'
	export default {
		components: {
			'adjust-order-dialog': AdjustOrderDialog,
			AdjustHexListDialog,
			'select-carry-dialog': SelectCarryDialog,
			'adjust-hero-list-dialog': AdjustHeroListDialog,
			'adjust-equip-list-dialog': AdjustEquipListDialog,
		},
		data() {
			return {
				//最上边的tab
				tab0: [{
						name: '消耗'
					},
					{
						name: '种族',
					}, {
						name: '职业',
					},
				],
				cur0: 0,
				//消耗的tab
				tab1: [{
						name: '0'
					}, {
						name: '1'
					}, {
						name: '2'
					}, {
						name: '3'
					}, {
						name: '4'
					}, {
						name: '5'
					}, {
						name: '8'
					}, {
						name: '10'
					},


				],
				cur1: 0,
				//种族的tab
				tab2: [{
						name: '星界龙'
					},
					{
						name: '冒险家'
					},
					{
						name: '玉龙'
					},
					{
						name: '幻镜龙'
					},
					{
						name: '怒翼龙'
					},
					{
						name: '神龙烈焰'
					},
					{
						name: '屠龙勇士'
					},
					{
						name: '金鳞龙'
					},
					{
						name: '风暴龙'
					},
					{
						name: '驯龙大师'
					},
					{
						name: '幽影龙'
					},
				],
				cur2: 0,
				//职业的tab
				tab3: [{
						name: '刺客'
					},
					{
						name: '吟游诗人'
					},
					{
						name: '格斗家'
					},
					{
						name: '强袭炮手'
					},
					{
						name: '重骑兵'
					},
					{
						name: '神龙尊者'
					},
					{
						name: '魔导师'
					},
					{
						name: '护卫'
					},
					{
						name: '传奇半神'
					},
					{
						name: '法师'
					},
					{
						name: '秘术师'
					}, {
						name: '换形师'
					}, {
						name: '迅捷射手'
					}, {
						name: '狂刃战士'
					}, {
						name: '龙神'
					}, {
						name: '窃法巧手'
					}, {
						name: '唤星者'
					}, {
						name: '召唤物'
					},
				],
				cur3: 0,

				//全部数据
				gettedData: {},
				//站位
				hero_location: [],


				//自然之力
				zrzl_number: 0,
				//种族/职业
				raceOrJob: [],
				//抢装顺序
				equip_order_list: new Array(5),
				//优选海克斯
				hex_main_list: new Array(3),
				//备选海克斯
				hex_replace_list: new Array(3),
				//主C英雄
				carry_main: {},
				//主C英雄必备装备
				render_base: new Array(2),
				carry_hero_base_equip: new Array(2),
				//主C英雄备选装备
				render_replace: new Array(3),
				carry_hero_equip_replace: new Array(3),
				// 优先三星
				render_heros: new Array(5),


			};
		},
		methods: {
			change(item, cur) {
				if (cur == 0) this.cur0 = item.index
				//消耗的tab
				if (cur == 1) {
					this.cur1 = item.index
				}
				//种族的tab
				if (cur == 2) this.cur2 = item.index
				//职业的tab
				if (cur == 3) this.cur3 = item.index
			},
			//获取棋子信息
			getChess(chessId) {
				if (!this.gettedData) return
				for (let item of this.gettedData.chessList) {
					if (item.chessId == chessId) {
						return item
					}
				}
			},

			//获取装备信息
			getEquip(id) {
				let res = {}
				this.gettedData.equipList.forEach((item, index) => {
					if (item.equipId == id) {
						res = item
					}
				})
				return res
			},
			getHex(id) {
				let res = {}
				_.forEach(this.gettedData.hexList, item => {
					if (item.id == id) {
						res = item
					}
				})
				return res
			},
			//向阵容中添加英雄
			addHero(item) {
				this.hero_location.push(item)
			},



			//抢装顺序组件弹窗
			openOrderAdjustDialog() {
				this.$refs.AdjustOrderDialog.open(this.equip_order_list);
			},
			//海克斯组件弹窗
			adjustHexMain() {
				this.$refs.AdjustHexListDialog.open(this.hex_main_list);
			},
			adjustHexBackup() {
				this.$refs.AdjustHexListDialog.open(this.hex_replace_list);
			},
			/** 选择主c英雄 */
			selectMainHero() {
				this.$refs.SelectCarryDialog.open();
			},
			//主c英雄的必备装备
			adjustMainBase() {
				this.$refs.AdjustEquipListDialog.open(this.carry_hero_base_equip);
			},
			//主c英雄的替换装备
			adjustMainReplace() {
				this.$refs.AdjustEquipListDialog.open(this.carry_hero_equip_replace, true);
			},
			//子传父
			setFinalMapMainCarry(data) {
				this.carry_main = data
			},
			// 优选三星弹窗
			adjustList() {
				this.$refs.AdjustHeroListDialog.open(this.render_heros);
			},





		},
		computed: {
			/** 显示英雄列表 */
			show_hero_list: function() {
				var rs;
				const first_tab = this.cur0;
				const hero_data_all = this.gettedData.chessList;

				if (first_tab == 1) {
					const race_tab = this.tab2[this.cur2]
					rs = _.filter(hero_data_all, function(hero_data) {
						return hero_data.races.indexOf(race_tab.name) !== -1;
					});
				} else if (first_tab == 2) {
					const job_tab = this.tab3[this.cur3]
					rs = _.filter(hero_data_all, function(hero_data) {
						return hero_data.jobs.indexOf(job_tab.name) !== -1;
					});
				} else if (first_tab == 0) {
					let price_tab;
					if (this.cur1 < 6) {
						price_tab = this.cur1;
					} else if (this.cur1 == 6) {
						price_tab = 8;
					} else {
						price_tab = 10
					}
					rs = _.filter(hero_data_all, {
						price: price_tab + ''
					});
				};
				return rs;
			},
			/** 羁绊预览 */
			current_contact: function() {
				var rs;
				if (this.cur0 == 1) {
					rs = _.find(this.gettedData.raceList, {
						name: this.tab2[this.cur2].name
					});
				} else if (this.cur0 == 2) {
					rs = _.find(this.gettedData.jobList, {
						name: this.tab3[this.cur3].name
					});
				}
				console.log(rs);
				return rs;
			},
			//最终阵容棋子站位
			render_map_heroes_1: function() {
				let render_map_heroes = new Array(28)
				this.hero_location.forEach((item, index) => {
					// let position = item.location.split(',')
					// if (position.length !== 2) return;
					// let mapIndex = (+position[0] - 1) * 7 + +position[1] - 1;
					// if (mapIndex < 0 || mapIndex >= render_map_heroes.length) return;
					render_map_heroes[index] = item;
				})
				return render_map_heroes;
			},
			//所需等级
			levelNeed: function() {
				let res = this.render_map_heroes_1.filter(i => i != '').length - this.zrzl_number
				if (res < 1) res = 1
				return res
			},
			//计算羁绊
			fetters: function() {
				//对象去重
				function uniqueArray(arr, key) {
					var result = [];
					var obj = {};
					for (let i = 0; i < arr.length; i++) {
						if (!obj[arr[i][key]]) {
							result.push(arr[i]);
							obj[arr[i][key]] = true;
						}
					}
					return result;
				}
				let tmp = this.render_map_heroes_1.filter(i => i != '')
				if (!tmp[0]) return
				tmp = uniqueArray(tmp, 'chessId')
				// console.log(tmp);


				let res = _.groupBy(tmp, function(item) {
					return item.raceIds
				})

				res = _.assign(res, _.groupBy(tmp, function(item) {
					return item.jobIds
				}))

				// console.log('res:', res); //这里拿到了种族/职业的id：{数量}

				//对多职业或者多种族处理
				let newRes = {}
				Object.keys(res).forEach((key) => {
					//多职业
					if (key.indexOf(',') !== -1) {
						//当newRes中存在此字段
						if (newRes[key.split(',')[0]]) {
							newRes[key.split(',')[0]] = res[key].concat(newRes[key.split(',')[0]])
						} else {
							newRes[key.split(',')[0]] = res[key]
						}
						if (newRes[key.split(',')[1]]) {
							newRes[key.split(',')[1]] = res[key].concat(newRes[key.split(',')[1]])
						} else {
							newRes[key.split(',')[1]] = res[key]
						}

					} else {
						newRes[key] = res[key]
					}
				})
				// console.log('newRes', newRes);



				//下面根据raceId和jobId查询到种族/职业详情
				this.raceOrJob = []
				_.forEach(Object.keys(newRes), (i) => {
					for (let item in this.gettedData.raceList) {
						if (this.gettedData.raceList[item].raceId == i) {
							let tmp = _.cloneDeep(this.gettedData.raceList[item])
							tmp['num'] = newRes[i].length
							this.raceOrJob.push(tmp)
						}
					}
					for (let item in this.gettedData.jobList) {
						if (this.gettedData.jobList[item].jobId == i) {
							let tmp = _.cloneDeep(this.gettedData.jobList[item])
							tmp['num'] = newRes[i].length
							this.raceOrJob.push(tmp)
						}
					}


				})

				//处理羁绊
				for (let i = 0; i < this.raceOrJob.length; i++) {
					let race_level = [],
						job_level = [];

					//对种族处理
					if (this.raceOrJob[i].raceId) {
						//将color_list处理成对象，数量：羁绊等级
						let race_list = {};
						this.raceOrJob[i].race_color_list.split(',').forEach((item2, index2) => {
							race_list[item2.split(':')[0]] = item2.split(':')[1]
						})

						for (let key in race_list) {
							if (!race_level) {
								race_level = []
							}
							race_level.push(race_list[key])
							//选出还未达到的num
							if (this.raceOrJob[i].num <= key) {
								//恰好达到此级羁绊
								if (this.raceOrJob[i].num == key) {
									this.raceOrJob[i].cur_level = race_level[race_level.length - 1]
								}
								//达到二级羁绊及以上的，cur_level要取前一级的
								else if (race_level.length > 1) {
									this.raceOrJob[i].cur_level = race_level[race_level.length - 2]
								} else {
									this.raceOrJob[i].cur_level = 0
								}
								this.raceOrJob[i].next_num = key
								break
							}
							//当超过最大num 把next_num定为最大的可达到单个羁绊数量，当前羁绊等级为顶级4
							else if (race_list[key] == 4) {
								this.raceOrJob[i].next_num = key
								this.raceOrJob[i].cur_level = 4;
							}
						}
					}
					//对职业处理
					else if (this.raceOrJob[i].jobId) {
						//将color_list处理成对象，数量：羁绊等级
						let job_list = {};
						this.raceOrJob[i].job_color_list.split(',').forEach((item2, index2) => {
							if (!job_list) job_list = {}
							job_list[item2.split(':')[0]] = item2.split(':')[1]
						})

						for (let key in job_list) {
							if (!job_level) {
								job_level = []
							}
							job_level.push(job_list[key])
							//选出还未达到的num
							if (this.raceOrJob[i].num <= key) {
								//恰好达到此级羁绊
								if (this.raceOrJob[i].num == key) {
									this.raceOrJob[i].cur_level = job_level[job_level.length - 1]
								}
								//达到二级羁绊及以上的，cur_level要取前一级的
								else if (job_level.length > 1) {
									this.raceOrJob[i].cur_level = job_level[job_level.length - 2]
								} else {
									this.raceOrJob[i].cur_level = 0
								}
								this.raceOrJob[i].next_num = key
								break
							}
							//当超过最大num 把next_num定为最大的可达到单个羁绊数量，当前羁绊等级为顶级4
							else if (job_list[key] == 4) {
								this.raceOrJob[i].next_num = key
								this.raceOrJob[i].cur_level = 4;
							}
						}

					}


				}

				// console.log(this.raceOrJob);
				return this.raceOrJob
			},

			//对render_map 中相同英雄去重


			//获取棋牌上的英雄作为主C英雄的选择
			main_carry_hero: function() {
				return this.hero_location
			},
			getHeight: function() {
				// #ifndef H5 || APP-PLUS || MP-ALIPAY
				return uni.getMenuButtonBoundingClientRect().bottom
				// #endif
			},

		},

		async onLoad() {

			const options = {
				chessList: [],
				jobList: [],
				raceList: [],
				hexList: {},
				equipList: [],
				rankList: [],
			}
			//等待options返回
			await Promise.all([
				_http('/img/tft/js/chess.js', 'GET').then(res => {
					options.chessList = res.data
				}),
				_http('/img/tft/js/race.js', 'GET').then(res => {
					options.raceList = res.data
				}),
				_http('/img/tft/js/job.js', 'GET').then(res => {
					options.jobList = res.data
				}),
				_http('/img/tft/js/hex.js', 'GET').then(res => {
					options.hexList = res
				}),
				_http('/img/tft/js/equip.js', 'GET').then(res => {
					options.equipList = res.data
				}),
			])

			this.gettedData = _.cloneDeep(options)








			this.gettedData = _.cloneDeep(options)
			// console.log(this.gettedData);
		}
	}
</script>

<style lang="scss">
	.g-app {
		overflow: auto;
		overflow-x: hidden;
	}

	.head {}


	.hero {
		.hero-list {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			padding: 2vw 0 2vw 4vw;

			.hero-item {
				margin-right: 2vw;
				width: 15vw;
				height: 22vw;

				.hero-name {
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 12px;
				}
			}
		}
	}

	.fetter {
		.uni-body {
			display: flex;
			color: #1C1C1C;
		}

		.part_column {
			display: flex;
			flex-direction: column;

			.part_row {
				display: flex;
				flex-direction: row;
				align-items: center;

				.race_num {
					display: inline-block;
					background-color: #000;
					color: #eaeaea;
					width: 5vw;
					height: 1rem;
					text-align: center;
					line-height: 1rem;
					margin-right: 20rpx;
				}

				.race_cur {
					color: #6C7983;
					font-size: 24rpx;
				}
			}

		}

	}

	.uni-group {}

	/* 站位 */
	.location {
		.simulator-squad-list {
			// padding: 20rpx 0 20rpx 60rpx;
			font-size: 0;

			.map-item {
				width: 76rpx;
				height: 76rpx;
				display: inline-block;
				vertical-align: middle;
				margin: 0rpx 14rpx -4rpx -4rpx;
				position: relative;

				.bg {
					position: absolute;
					left: 0;
					top: 0;
					width: 76rpx;
					height: 90rpx;
					background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft//squad-pol2.png);
					// background-size: 60rpx 70rpx;
					background-size: contain;
					background-repeat: no-repeat;
				}

				.hero {
					position: absolute;
					left: 4rpx;
					top: 6rpx;
					width: 68rpx;
					height: 68rpx;
					overflow: hidden;
					border-radius: 44%;
					transition: transform 0.2s;
					background-size: contain;
					background-repeat: no-repeat;
				}

				.border {
					position: absolute;
					left: -5rpx;
					top: -4rpx;
					width: 82rpx;
					height: 92rpx;
					overflow: hidden;
					background-repeat: no-repeat;
					background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/squad-pol-border.png);
					background-size: contain;
					border-radius: 26%;
					transition: transform 0.2s;

				}

				.icon-carry {
					position: absolute;
					width: 28rpx;
					height: 28rpx;
					background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/icon-carry.png);
					left: 4rpx;
					bottom: 10rpx;
					z-index: 2;
					background-size: contain;
					background-repeat: no-repeat;
				}

				.href-mask {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}
			}

			.map-item:nth-of-type(14n-6) {
				margin-left: 38rpx;
			}
		}

		.tip-text {
			margin-top: 4vh;
			color: #A0ACB5;
			font-size: 12px;
		}

		.simulator-squad-info {
			text-align: center;
		}
	}

	/* 羁绊 */
	.fetters {
		/deep/ .uni-group__content {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}

		.fettersDetail {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: 0 2vw 2vw 0;

			.raceTitle {
				z-index: 10;
				width: 6vw;
				height: 6vw;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 4vw;
					height: 4vw;
					vertical-align: middle;
					background-size: contain;
					background-position: center;
				}
			}

			.title {
				margin-left: -10rpx;
				height: 30rpx;
				line-height: 30rpx;
				padding: 0 24rpx 0 24rpx;
				font-size: 12px;
			}

			/* 不同羁绊等级的颜色 start */
			.effect-level0-box,
			.effect-level1-box,
			.effect-level2-box,
			.effect-level3-box,
			.effect-level4-box,
			.effect-level5-box {
				max-width: 48rpx;
				max-height: 54rpx;
				background-repeat: no-repeat;
				background-position: center;
				background-size: contain;
			}

			.effect-level0-box {
				background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/icon-sisangle-1.png);
				opacity: 0.5;
			}

			.effect-level1-box {
				background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/icon-sisangle-1.png);
			}

			.effect-level2-box {
				background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/icon-sisangle-2.png);
			}

			.effect-level3-box {
				background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/icon-sisangle-3.png);
			}

			.effect-level4-box,
			.effect-level5-box {
				background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/icon-sisangle-4.png);
			}

			.effect-level0-bg {
				background-color: #edd3c5;
				opacity: 0.5;
			}

			.effect-level1-bg {
				background-color: #edd3c5;
			}

			.effect-level2-bg {
				background-color: #dae0e0;
			}

			.effect-level3-bg {
				background-color: #f8e9c3;
			}

			.effect-level4-bg,
			.effect-level5-bg {
				background-color: #ffdeef;
			}

			/* 不同羁绊等级的颜色 end */
		}
	}

	/* 海克斯（强化符文） */
	.hex {
		.main-hex {
			.hex-list {
				.title {
					display: inline-block;
				}

				.hex-item {
					display: inline-block;
					width: 10vw;
					height: 10vw;
					background-image: url(https://game.gtimg.cn/images/lol/act/a20200224tft/squad-pol.png);
					background-color: #edf0f0;
					background-size: cover;
					background-repeat: no-repeat;
					vertical-align: middle;
					margin: 2vw 3vw 2vw 3vw;
					background-position: center;

					.hex {

						width: 10vw;
						height: 10vw;
						background-size: cover;
						background-repeat: no-repeat;

					}
				}


			}

		}
	}

	/* 抢装顺序 */
	.equip-order {
		.equip-list {
			display: flex;

			.equip-item {
				display: inline-block;
				width: 10vw;
				height: 10vw;
				background-image: url(https://game.gtimg.cn/images/lol/act/a20200224tft/squad-pol.png);
				background-color: #edf0f0;
				background-size: cover;
				background-repeat: no-repeat;
				vertical-align: middle;
				margin: 2vw 0vw 2vw 0vw;
				background-position: center;


				.equip {
					width: 10vw;
					height: 10vw;
					background-size: cover;
					background-repeat: no-repeat;
				}
			}



			.arrow {
				width: 10vw;
				height: 10vw;
				background-image: url(https://game.gtimg.cn/images/lol/act/a20200224tft/triangle-icon.png);
				background-size: contain;
				background-position: center;
				background-repeat: no-repeat;
				background-size: 3vw 2vw;
				display: inline-block;
				transform: rotateZ(-90deg);
				vertical-align: middle;
				margin: 2vw 0vw 2vw 0vw;
			}

			.arrow:last-of-type {
				display: none;
			}
		}
	}

	/* 主C装备 */
	.carry-equip {
		.main-carry {
			display: flex;
			flex-direction: row;

			.main-hero {
				flex-shrink: 0;
				display: inline-block;
				width: 10vw;
				height: 10vw;
				background-image: url(https://game.gtimg.cn/images/lol/act/a20200224tft/squad-pol.png);
				background-color: #edf0f0;
				background-size: cover;
				background-repeat: no-repeat;
				vertical-align: middle;
				margin: 2vw 4vw 2vw 1vw;
				background-position: center;

				.avatar {
					width: 10vw;
					height: 10vw;
					background-size: cover;
					background-repeat: no-repeat;
				}
			}

			.equip-list-wrap {
				.equip-list {
					display: inline-block;

					.title {
						display: inline-block;
					}

					.equip-item {
						display: inline-block;
						width: 10vw;
						height: 10vw;
						background-image: url(https://game.gtimg.cn/images/lol/act/a20200224tft/squad-pol.png);
						background-color: #edf0f0;
						background-size: cover;
						background-repeat: no-repeat;
						vertical-align: middle;
						margin: 2vw 3vw 2vw 3vw;
						background-position: center;

						.equip {
							width: 10vw;
							height: 10vw;
							background-size: cover;
							background-repeat: no-repeat;
						}
					}

					.arrow {
						width: 10vw;
						height: 10vw;
						background-image: url(https://game.gtimg.cn/images/lol/act/a20200224tft/triangle-icon.png);
						background-size: contain;
						background-size: 3vw 2vw;
						background-position: center;
						background-repeat: no-repeat;
						display: inline-block;
						transform: rotateZ(-90deg);
						vertical-align: middle;
						margin: 2vw -5vw 2vw -5vw;
					}


				}
			}

		}
	}

	/* 优先三星 */
	.three-star {
		.hero-list-wrap {
			display: flex;
			flex-direction: row;

			.hero-list-item {
				display: inline-block;
				width: 10vw;
				height: 10vw;
				background-image: url(https://game.gtimg.cn/images/lol/act/a20200224tft/squad-pol.png);
				background-color: #edf0f0;
				background-size: cover;
				background-repeat: no-repeat;
				vertical-align: middle;
				margin: 2vw 3vw 2vw 3vw;
				background-position: center;

				.avatar {
					width: 10vw;
					height: 10vw;
					background-size: cover;
					background-repeat: no-repeat;
				}
			}
		}
	}
</style>
