<template>


	<view class="root">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="head">
			<view class="head_img"> </view>
			<view class="touxiang">
				<u-image :src="lineupauthor.imgUrl" width="108rpx" height="108rpx" radius="50%">
				</u-image>
			</view>

			<u-text :text="lineupauthor.name" align="center" class="author_name" size="30rpx"></u-text>
		</view>
		<view class="second">
			<u--text :text="detail.line_name" size="30rpx"></u--text>
			<view class="lineup_tag" v-if="tag.title">
				<u--text align="center" :text="tag.title"></u--text>
			</view>
		</view>
		<view class="third">
			<view v-for="(item,index) in heroList" class="chess" :key="index">
				<view class="chessImg" v-if="item">
					<u--image width="12vw" height="12vw"
						:src="`https://game.gtimg.cn/images/lol/act/img/tft/champions/${item.name}`">
					</u--image>
				</view>
				<view class="carry">
					<u--image v-if="carry[index]" width="27rpx" height="30rpx"
						src="https://game.gtimg.cn/images/lol/act/a20200224tft/icon-carry.png">
					</u--image>
				</view>
			</view>
		</view>
		<view class="forth">
			<!-- 羁绊小方块 -->
			<view class="raceJob">
				<view v-for="(i,index) in fetters" :key="index" class="champion_race_job">
					<view class="fetterIcon">
						<image :src="raceOrJob[index].imagePath" mode=""></image>
					</view>
					<view class="fetterText">
						<u--text :text="i.num+' '+raceOrJob[index].name" color="#fff" size="15rpx" block></u--text>
					</view>
				</view>
			</view>
			<!-- 羁绊详情折叠组件 -->
			<u-collapse align="center" @open="open" @close="close">
				<u-collapse-item :title="collTitle1" name="fettersDetail" :clickable="false">
					<view class="" v-for="(item,index2) in fetters" :key="index2">
						<!-- 羁绊图标和数量 -->
						<view class="fettersDetail">
							<view class="raceTitle" :class="'effect-level'+fetters[index2].color+'-box'">
								<image :src="raceOrJob[index2].imagePath" mode=""></image>
							</view>
							<view :class="'effect-level'+fetters[index2].color+'-bg'" class="title">
								<u--text :text="item.num+' '+raceOrJob[index2].name" size='14px'></u--text>
							</view>
						</view>
						<!-- 羁绊介绍 -->
						<view class="raceJobIntroduce">
							<u--text :text="raceOrJob[index2].introduce.trim()" align="left" size='12px'></u--text>
						</view>
					</view>
				</u-collapse-item>
			</u-collapse>
			<!-- 稳运营 -->
			<uni-section :title="feature.title" type="line">
				<uni-group mode="card">
					<view :style="{'font-size':'12px'}"> {{feature.remark}} </view>
				</uni-group>
			</uni-section>
			<!-- 海克斯科技 -->
			<uni-section title="海克斯科技" type="line">
				<!-- 优选 -->
				<uni-group mode="card">
					<view class="recommCard">
						<view class="recomm" v-for="item in hexInfo">
							<view class="union">
								<view class="hexImg">
									<u--image :src="item.imgUrl" width="12vw" height="12vw"> </u--image>
								</view>
								<u--text align="center" :text="item.name" size="12px" :lines="1"></u--text>
							</view>
						</view>
					</view>
					<view class="hexTagMain"> 优选 </view>
				</uni-group>
				<!-- 备选 -->
				<uni-group mode="card">
					<view class="recommCard">
						<view class="recomm" v-for="item in hexInfo2">
							<view class="union">
								<view class="hexImg">
									<u--image :src="item.imgUrl" width="12vw" height="12vw"> </u--image>
								</view>
								<u--text align="center" :text="item.name" size="12" :lines="1"></u--text>
							</view>
						</view>
					</view>
					<view class="hexTagReplace"> 备选 </view>
				</uni-group>
			</uni-section>
			<!-- 海克斯分析折叠组件 -->
			<u-collapse align="center" @open="open" @close="close">
				<u-collapse-item :title="collTitle2" name="hexDetail" :clickable="false">
					<view class="hexInfo">
						<u-text :text="detail.hex_info" size='12px'> </u-text>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="fifth" v-if="gettedData">
			<!-- 抢装顺序 -->
			<uni-section title="抢装顺序" type="line">
				<uni-group mode="card" class="equipOrderRoot">
					<template v-for="(item,index) in (detail.equipment_order||'').split(',')">
						<view class="equipImg">
							<u-image width="12vw" height="12vw" :src="getEquip(item).imagePath"></u-image>
						</view>
						<view class="equipArrow">

						</view>
					</template>
				</uni-group>
			</uni-section>
			<!-- 主C装备 -->
			<uni-section title="主C装备" type="line">
				<uni-group mode="card" class="carryEquip">
					<view>
						<view class="carryHero">
							<!-- C位头像 -->
							<view class="carryImg">
								<u--image v-if="carryHero" width="12vw" height="12vw"
									:src="`https://game.gtimg.cn/images/lol/act/img/tft/champions/${carryHero.name}`">
								</u--image>
								<view class="carry2">
									<u--image width="27rpx" height="30rpx"
										src="https://game.gtimg.cn/images/lol/act/a20200224tft/icon-carry.png">
									</u--image>
								</view>
							</view>
							<!-- main装备 -->
							<view class="bibei">
								<u--text text="必备"></u--text>
							</view>
							<template v-for="(item,index) in carryMain">
								<view class="equipImg">
									<u-image width="12vw" height="12vw" :src="getEquip(item).imagePath"></u-image>
								</view>
								<view class="equipArrow">

								</view>
							</template>

						</view>
						<!-- backup装备 -->
						<view class='secCarryHero'>
							<view class="bibei">
								<u--text text="备用"></u--text>
							</view>
							<template v-for="(item,index) in carryBack">
								<view class="equipImg">
									<u-image width="12vw" height="12vw" :src="getEquip(item).imagePath">
									</u-image>
								</view>
								<view class="equipArrow">

								</view>
							</template>
						</view>
					</view>
				</uni-group>
			</uni-section>
			<!-- 其他英雄装备 -->
			<uni-section title="其他英雄装备" type="line">
				<uni-group mode="card" class="otherHeroEquip">
					<template v-for="(i,index) in otherEquipHeroList">
						<view class="oneRow">
							<view class="otherHeroImg">
								<u--image v-if="i.hero_id" width="12vw" height="12vw"
									:src="`https://game.gtimg.cn/images/lol/act/img/tft/champions/${getChess(i.hero_id).name}`">
								</u--image>
							</view>
							<view v-for="(i3,index3) in i.equipment_id.split(',').map(ii=>getEquip(ii))"
								class="oneEquip">
								<view class="main">
									<u--image width="60rpx" height="60rpx" :src="i3.imagePath">
									</u--image>
								</view>
								<view class="part" v-for="(i2,index2) in i3.formula.split(',').map(i=>getEquip(i))">
									<u--image width="40rpx" height="40rpx" :src="i2.imagePath">
									</u--image>
								</view>
							</view>
						</view>
						<u-divider></u-divider>
					</template>
				</uni-group>
			</uni-section>
			<!-- 装备分析折叠组件 -->
			<u-collapse align="center" @open="open" @close="close">
				<u-collapse-item :title="collTitle3" name="equipDetail" :clickable="false">
					<view class="EquipInfo">
						<u-text :text="detail.equipment_info" size='12px'> </u-text>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="sixth">
			<!-- 站位 -->
			<uni-section title="站位一" type="line">
				<uni-group mode="card" class="location">
					<view class="simulator-squad-list" v-if="render_map_heroes_1">
						<view class="map-item" v-for="(i,index) in render_map_heroes_1">
							<view class="bg"></view>
							<template v-if="i">
								<view class="hero" v-if="i.hero_id"
									:style="{'background-image': 'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/'+getChess(i.hero_id).name+')'}">
								</view>
								<view class="hero" v-else-if="i.chess_id=='frog'"
									:style="{'background-image': 'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/759.png)'}">
								</view>
								<view class="hero" v-else-if="i.chess_id=='jadestatue'"
									:style="{'background-image': 'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/760.png)'}">
								</view>
								<view class="border"></view>
								<view class="icon-carry" v-if="i.is_carry_hero"> </view>
							</template>
						</view>
					</view>
				</uni-group>
			</uni-section>
			<!--折叠组件 -->
			<u-collapse align="center" @open="open" @close="close">
				<u-collapse-item :title="collTitle4" name="locationDetail" :clickable="false">
					<view class="locationInfo">
						<u-text :text="detail.location_info" size='12px'> </u-text>
					</view>
				</u-collapse-item>
			</u-collapse>
			<!-- 前期阵容 -->
			<uni-section title="前期阵容" type="line" v-if="early_map_heroes">
				<uni-group mode="card" class="location">
					<view class="simulator-squad-list">
						<view class="map-item" v-for="(i,index) in early_map_heroes">
							<view class="bg"></view>
							<template v-if="i">
								<view class="hero" v-if="i.hero_id"
									:style="{'background-image': 'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/'+getChess(i.hero_id).name+')'}">
								</view>
								<view class="hero" v-else-if="i.chess_id=='frog'"
									:style="{'background-image': 'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/759.png)'}">
								</view>
								<view class="hero" v-else-if="i.chess_id=='jadestatue'"
									:style="{'background-image': 'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/760.png)'}">
								</view>
								<view class="border"></view>
								<view class="icon-carry" v-if="i.is_carry_hero"> </view>
							</template>
						</view>
					</view>
				</uni-group>
			</uni-section>
			<!-- 羁绊小方块 -->
			<view class="raceJob" v-if="detail">
				<view v-for="(i,index) in detail.y21_early_heros_contact" :key="index" class="champion_race_job">
					<view class="fetterIcon">
						<image :src="getEarlyRace[index].imagePath" mode=""></image>
					</view>
					<view class="fetterText">
						<u--text :text="i.num+' '+getEarlyRace[index].name" color="#fff" size="15rpx" block>
						</u--text>
					</view>
				</view>
			</view>
			<!-- 前期过渡折叠组件 -->
			<u-collapse align="center" @open="open" @close="close">
				<u-collapse-item :title="collTitle5" name="earlyLocationDetail" :clickable="false">
					<view class="locationInfo">
						<u-text :text="detail.early_info" size='12px'> </u-text>
					</view>
				</u-collapse-item>
			</u-collapse>
			<!-- 中期阵容 -->
			<uni-section title="中期阵容" type="line" v-if="meta_map_heroes">
				<uni-group mode="card" class="location">
					<view class="simulator-squad-list">
						<view class="map-item" v-for="(i,index) in meta_map_heroes">
							<view class="bg"></view>
							<template v-if="i">
								<view class="hero" v-if="i.hero_id"
									:style="{'background-image': 'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/'+getChess(i.hero_id).name+')'}">
								</view>
								<view class="hero" v-else-if="i.chess_id=='frog'"
									:style="{'background-image': 'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/759.png)'}">
								</view>
								<view class="hero" v-else-if="i.chess_id=='jadestatue'"
									:style="{'background-image': 'url(https://game.gtimg.cn/images/lol/act/img/tft/champions/760.png)'}">
								</view>
								<view class="border"></view>
								<view class="icon-carry" v-if="i.is_carry_hero"> </view>
							</template>
						</view>
					</view>
				</uni-group>
			</uni-section>
			<!-- 羁绊小方块 -->
			<view class="raceJob" v-if="detail">
				<view v-for="(i,index) in detail.y21_metaphase_heros_contact" :key="index" class="champion_race_job">
					<view class="fetterIcon">
						<image :src="getMetaRace[index].imagePath" mode=""></image>
					</view>
					<view class="fetterText">
						<u--text :text="i.num+' '+getMetaRace[index].name" color="#fff" size="15rpx" block>
						</u--text>
					</view>
				</view>
			</view>
			<!-- 搜牌节奏 -->
			<uni-section title="搜牌节奏" type="line" v-if="detail">
				<uni-group mode="card" class="d_time">
					<view :style="{'font-size':'12px'}">
						{{detail.d_time}}
					</view>
				</uni-group>
			</uni-section>
			<!-- 克制分析 -->
			<uni-section title="克制分析" type="line" v-if="detail">
				<uni-group mode="card" class="d_time">
					<view :style="{'font-size':'12px'}">
						{{detail.enemy_info}}
					</view>
				</uni-group>
			</uni-section>
		</view>
	</view>
</template>

<script>
	import {
		options
	} from '@/common/options.js'
	import {
		_http
	} from '@/utils/request.js'
	import _ from 'lodash'
	export default {
		data() {
			return {
				gettedData: {},
				lineId: '',
				detail: {},
				detail2: {},
				lineupauthor: {},
				//阵容tag
				tag: {},
				//阵容特性
				feature: {},
				//英雄列表
				heroList: [],
				//是否carry
				carry: [],
				//棋子装备
				equipList: [],
				//替换英雄
				replaceList: [],
				//羁绊
				fetters: [],
				//race/job的详细信息
				raceOrJob: [],
				//折叠组件的title
				collTitle1: '羁绊详情',
				collTitle2: '海克斯详情',
				collTitle3: '装备详情',
				collTitle4: '站位详情',
				collTitle5: '前期过渡',
				//海克斯详情
				hexInfo: [],
				hexInfo2: [],
				//carry英雄
				carryHero: {},
				//carry英雄的装备



			};
		},
		computed: {
			//c位英雄的必备装备
			carryMain: function() {
				return this.detail.carry_hero_equip_replace?.main.split(',')
			},
			//c位英雄的备选装备
			carryBack: function() {
				return this.detail.carry_hero_equip_replace?.backup.split(',')
			},
			//其他带装备的英雄
			otherEquipHeroList: function() {
				if (!this.detail.hero_location) return []
				return this.detail.hero_location.filter(i => i.equipment_id !== '' && !i.is_carry_hero)
			},
			//最终阵容棋子站位
			render_map_heroes_1: function() {
				if (!this.detail.hero_location) return
				let render_map_heroes = new Array(28)
				this.detail.hero_location.forEach((item, index) => {
					let position = item.location.split(',')
					if (position.length !== 2) return;
					let mapIndex = (+position[0] - 1) * 7 + +position[1] - 1;
					if (mapIndex < 0 || mapIndex >= render_map_heroes.length) return;
					render_map_heroes[mapIndex] = item;
				})
				return render_map_heroes;
			},
			//前期阵容
			early_map_heroes: function() {
				if (!this.detail.y21_early_heros) return
				let early_map_heroes = new Array(28)
				this.detail.y21_early_heros.forEach((item, index) => {
					let position = item.location.split(',')
					if (position.length !== 2) return;
					let mapIndex = (+position[0] - 1) * 7 + +position[1] - 1;
					if (mapIndex < 0 || mapIndex >= early_map_heroes.length) return;
					early_map_heroes[mapIndex] = item;
				})
				return early_map_heroes;
			},
			//前期阵容羁绊
			getEarlyRace: function() {
				let res = []
				this.detail.y21_early_heros_contact.forEach((item, index) => {
					for (let i in this.gettedData.raceList) {
						if (this.gettedData.raceList[i].TFTID === item.id) {
							res.push(this.gettedData.raceList[i])
						}
					}
					for (let i in this.gettedData.jobList) {
						if (this.gettedData.jobList[i].TFTID === item.id) {
							res.push(this.gettedData.jobList[i])
						}
					}
				})
				return res
			},
			//中期阵容
			meta_map_heroes: function() {
				if (!this.detail.y21_metaphase_heros) return
				let meta_map_heroes = new Array(28)
				this.detail.y21_metaphase_heros.forEach((item, index) => {
					let position = item.location.split(',')
					if (position.length !== 2) return;
					let mapIndex = (+position[0] - 1) * 7 + +position[1] - 1;
					if (mapIndex < 0 || mapIndex >= meta_map_heroes.length) return;
					meta_map_heroes[mapIndex] = item;
				})
				return meta_map_heroes;
			},
			//中期阵容羁绊
			getMetaRace: function() {
				let res = []
				this.detail.y21_metaphase_heros_contact.forEach((item, index) => {
					for (let i in this.gettedData.raceList) {
						if (this.gettedData.raceList[i].TFTID === item.id) {
							res.push(this.gettedData.raceList[i])
						}
					}
					for (let i in this.gettedData.jobList) {
						if (this.gettedData.jobList[i].TFTID === item.id) {
							res.push(this.gettedData.jobList[i])
						}
					}
				})
				return res
			},
		},
		methods: {
			//根据id获取棋子
			getChess(chessId) {
				for (let item of this.gettedData.chessList) {
					if (item.chessId === chessId) {
						return item
					}
				}
			},
			//根据id获取种族和羁绊
			getRaceOrJob(Id, type) {
				if (type == 'race') {
					for (let item in this.gettedData.raceList) {
						if (this.gettedData.raceList[item].raceId === Id) {
							this.raceOrJob.push(this.gettedData.raceList[item])
						}
					}
				} else if (type === 'job') {
					for (let item in this.gettedData.jobList) {
						if (this.gettedData.jobList[item].jobId === Id) {
							this.raceOrJob.push(this.gettedData.jobList[item])
						}
					}
				}
			},
			//获取海克斯
			getHex(Id, flag) {
				if (flag == 0) {
					Id.split(',').forEach((item, index) => {
						Object.keys(this.gettedData.hexList).forEach((item2, index2) => {
							if (this.gettedData.hexList[item2].hexId == item) {
								this.hexInfo.push(this.gettedData.hexList[item2])
							}
						})
					})
				} else {
					Id.split(',').forEach((item, index) => {
						Object.keys(this.gettedData.hexList).forEach((item2, index2) => {
							if (this.gettedData.hexList[item2].hexId == item) {
								this.hexInfo2.push(this.gettedData.hexList[item2])
							}
						})
					})
				}
			},
			//根据id获得装备
			getEquip(Id) {
				let res = {};
				if (this.gettedData.equipList) {
					this.gettedData.equipList.forEach(item => {
						if (item.equipId == Id) {
							res = item
						}
					})
				}
				return res
			},
			open(x) {
				if (x == 'fettersDetail') {
					this.collTitle1 = '收起'
				} else if (x == 'hexDetail') {
					this.collTitle2 = '收起'
				} else if (x == 'equipDetail') {
					this.collTitle3 = '收起'
				} else if (x == 'locationDetail') {
					this.collTitle4 = '收起'
				} else if (x == 'earlyLocationDetail') {
					this.collTitle5 = '收起'
				}
			},
			close(x) {
				if (x == 'fettersDetail') {
					this.collTitle1 = '羁绊详情'
				} else if (x == 'hexDetail') {
					this.collTitle2 = '海克斯详情'
				} else if (x == 'equipDetail') {
					this.collTitle3 = '装备详情'
				} else if (x == 'locationDetail') {
					this.collTitle4 = '站位详情'
				} else if (x == 'earlyLocationDetail') {
					this.collTitle5 = '前期过渡'
				}
			},
			//获取阵容特性
			getFeature(lineup_feature) {
				let title = ''
				this.feature.forEach(item => {
					if (lineup_feature == item.id) {
						title = item.title
					}
				})
				return title
			},


		},
		async onLoad(option) {
			const options = {
				chessList: [],
				jobList: [],
				raceList: [],
				hexList: {},
				equipList: [],
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
			// console.log('this.gettedData', this.gettedData);
			this.lineId = option.lineId
			this.tag = JSON.parse(option.tag)
			this.feature = JSON.parse(option.feature)
			this._http(`/tftzlkauto/json/lineupJson/total/${this.lineId}.json`, 'GET').then(res => {
				this.detail = JSON.parse(res.detail.replace(/\s*/g, ''))
				if (res.detail2) {
					this.detail2 = JSON.parse(res.detail2.replace(/\s*/g, ''))
				}
				this.lineupauthor = res.lineupauthor_data

				this.detail.hero_location.forEach(item => {
					//英雄列表
					this.heroList.push(this.getChess(item.hero_id))
					//是否carry
					this.carry.push(item.is_carry_hero)
					if (item.is_carry_hero) {
						this.carryHero = this.getChess(item.hero_id)

					}
					//棋子装备
					if (item.equipment_id !== '') {
						item.equipment_id.split(',').forEach(item2 => {
							this.equipList.push(this.getEquip(item2))

						})
					}
				})
				//可替换英雄
				this.replaceList = this.detail.hero_replace
				//羁绊
				this.fetters = this.detail.contact
				//种族职业详细信息
				this.fetters.forEach(item => {
					this.getRaceOrJob(item.id, item.type)
				})
				//海克斯选择
				this.getHex(this.detail.hexbuff.recomm, 0)
				this.getHex(this.detail.hexbuff.replace, 1)
			})
			// //阵容标签
			// this._http('/tftzlkauto/json/tagJson/tag.json', 'GET').then(res => {
			// 	Object.keys(res).forEach(item => {
			// 		if (item == this.detail.line_tag) {
			// 			this.tag = res[item]
			// 		}
			// 	})
			// })
			// //阵容特性
			// this._http('/tftzlkauto/json/specialityJson/speciality.json', 'GET').then(res => {
			// 	Object.keys(res).forEach(item => {
			// 		if (item == this.detail.line_feature) {
			// 			this.feature = res[item]
			// 		}
			// 	})
			// })
		}
	}
</script>

<style lang="scss" scoped>
	page {
		margin: 0;
		padding: 0;
		background-size: cover;
		background-color: #fff;
		background-repeat: no-repeat;
	}



	.head {
		position: relative;

		.head_img {
			width: 750rpx;
			height: 236rpx;
			background-image: url(https://game.gtimg.cn/images/lol/act/a20200224tft/lineup-detail-top2-s7.jpg);
			background-position: center top;
			background-size: contain;
		}

		.touxiang {
			position: absolute;
			border: solid 4rpx #d7a75f;
			border-radius: 50%;
			top: 85rpx;
			left: 50%;
			transform: translateX(-50%);



		}

		.author_name {
			position: absolute;
			top: 200rpx;
			background-color: #fff;
		}
	}

	.second {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;

		.lineup_tag {
			margin-right: 1rem !important;
			width: 5rem;
			background-color: $u-warning-disabled;
			border-radius: 10rpx;
			flex: 0 0 auto;
		}
	}

	.third {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0 20rpx;

		.chess {
			margin-top: 10rpx;
			position: relative;

			.chessImg {
				margin: 0 10rpx;
				overflow: hidden;
				border: solid 4rpx #d7a75f;

				/deep/ .u-image {
					transform: scale(1.18);
				}

			}

			.carry {
				position: absolute;
				right: 0rpx;
				bottom: 0rpx;

			}
		}

	}

	.forth {
		.raceJob {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			padding: 20rpx;

			.champion_race_job {
				display: flex;
				flex-direction: row;
				margin-top: 0.5rem;
				margin-right: 20rpx;
				padding: 0 10rpx;
				background-color: #1c1c1c;
				border-radius: 4rpx;
				align-items: center;

				.fetterIcon {
					display: flex;
					flex-direction: row;
					align-items: center;

					image {
						width: 2vh;
						height: 2vh;
						filter: invert(100%);
					}
				}





				.fetterText {
					// margin-left: 10rpx;
					// line-height: 36rpx;
				}
			}
		}

		//折叠组件-羁绊详情
		.u-collapse-item {

			//羁绊介绍文字
			.raceJobIntroduce {
				text-align: left;
			}

			//海克斯分析文字
			.hexInfo {
				text-align: left;
			}

			.fettersDetail {
				display: flex;
				flex-direction: row;
				align-items: center;

				.raceTitle {
					z-index: 10;

					image {
						width: 38rpx;
						height: 46rpx;
						vertical-align: middle;
					}
				}

				.title {
					margin-left: -10rpx;
					height: 30rpx;
					line-height: 30rpx;
					padding: 0 24rpx 0 24rpx;
				}

				/* 不同羁绊等级的颜色 start */
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


		/deep/ .uni-group__content {
			position: relative;

			.recommCard {
				display: flex;
				flex-direction: row;

				.recomm,
				.replace {
					margin-right: 10vw;
					display: flex;
					flex-direction: row;
					justify-content: flex-start;

					.union {
						width: 16vw;

						.hexImg {
							width: 12vw;
							height: 12vw;
							overflow: hidden;
							margin: 0 auto;

							.u-image {
								background-color: #000 !important;
								transform: scale(1.18);
							}
						}
					}

				}
			}

			.hexTagMain,
			.hexTagReplace {
				position: absolute;
				top: 72rpx;
				right: 0;
				background: center center no-repeat;
				background-size: cover;
				background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/bg-tag-main.png);
				width: 128rpx;
				height: 50rpx;
				font-size: 16px;
				text-align: center;
				line-height: 50rpx;
				color: #ffffff;
			}

			.hexTagReplace {
				filter: grayscale(0.8);
			}
		}


	}

	.fifth {
		.equipOrderRoot {
			/deep/ .uni-group__content {
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			.equipImg {
				// margin-right: 20rpx;
			}

			.equipArrow {
				width: 10vw;
				height: 2vw;
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

			.equipArrow:last-of-type {
				display: none;
			}

		}

		//主C装备
		.carryEquip {
			display: flex;
			flex-direction: column;

			.carryHero {
				margin-bottom: 2vh;
			}

			.secCarryHero {
				margin-left: 6vw;
			}

			.carryHero,
			.secCarryHero {
				display: flex;
				flex-direction: row;
				align-items: center;

				.carryImg {
					position: relative;
					width: 12vw;
					height: 12vw;
					overflow: hidden;
					border: solid 4rpx #d7a75f;

					/deep/ .u-image {
						transform: scale(1.18);
					}

					.carry2 {
						position: absolute;
						right: 0rpx;
						bottom: 0rpx;
					}
				}

				.bibei {
					margin: 0 10rpx;
				}

				.equipImg {}

				.equipArrow {
					width: 10vw;
					height: 2vw;
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

				.equipArrow:last-of-type {
					display: none;
				}


			}

			.secCarryHero {
				// margin-left: 84rpx;
				justify-content: center;
			}



		}

		.otherHeroEquip {
			/deep/ .uni-group__content {
				.u-divider:last-child {
					display: none;
				}
			}

			.oneRow {
				display: flex;

				.otherHeroImg {
					width: 12vw;
					height: 12vw;
					overflow: hidden;
					border: solid 4rpx #d7a75f;
					margin-right: 20rpx;

					/deep/ .u-image {
						transform: scale(1.18);
					}
				}

				.oneEquip {
					display: flex;
					align-items: flex-end;
					flex-wrap: nowrap;
					margin-right: 6rpx;

					.main {
						margin-right: 10rpx;
					}

					.part {
						margin-right: 10rpx;
					}
				}
			}
		}



	}

	.sixth {
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
		}

		.raceJob {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			padding: 1vh;

			.champion_race_job {
				display: flex;
				flex-direction: row;
				margin-right: 20rpx;
				padding: 0 2vw;
				background-color: #1c1c1c;
				border-radius: 4rpx;
				height: 3vh;
				margin-bottom: 1vh;
				align-items: center;

				.fetterIcon {
					display: flex;
					flex-direction: row;
					align-items: center;

					image {
						width: 2vh;
						height: 2vh;
						filter: invert(100%);
					}
				}


				.fetterText {
					margin-left: 10rpx;
					// line-height: 36rpx;
				}
			}
		}

	}
</style>
