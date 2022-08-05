<template>

	<view class="root">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="head">
			<view class="title">
				<u--image width='6vw' height='6vw' class='title-img'
					src="https://game.gtimg.cn/images/lol/act/a20200224tft/tab-index-logo.png">
				</u--image>
				<view class="title-name">
					英雄联盟云顶之奕
				</view>
			</view>
			<view class="list">
				<view class="list-item" @click="navTo('../simulator/simulator')">
					<u--image width='12vw' height='12vw'
						src="https://game.gtimg.cn/images/lol/act/img/tft/recopepos/icon-mnq.png"></u--image>
					<view class="">
						模拟器
					</view>
				</view>
				<view class="list-item" @click="navTo('../ranking/ranking')">
					<u--image width='12vw' height='12vw'
						src="https://game.gtimg.cn/images/lol/act/img/tft/recopepos/icon-phb.png"></u--image>
					<view class="">
						段位排行
					</view>
				</view>
				<view class="list-item" @click="navTo('../material/material')">
					<u--image width='12vw' height='12vw'
						src="https://game.gtimg.cn/images/lol/act/img/tft/recopepos/icon-mnq.png"></u--image>
					<view class="">
						资料库
					</view>
				</view>

			</view>
		</view>
		<view class="swiper">
			<u-swiper :list="list1" indicatorMode="line" indicator radius="4px" circular imgMode="heightFix"></u-swiper>
		</view>
		<view class="sub">
			<u-subsection :list="list2" :current="cur" mode="subsection" :bold="false" @change="sub_change">
			</u-subsection>
		</view>
		<view class="list-head" v-if="version">
			版本号{{version}}
		</view>
		<view v-if="cur===0" class="list-1">
			<uni-list>
				<uni-list-item v-for="(item,index) in eachList" :key="item.id" direction="column" :showArrow="false"
					:to="`../lineupDetail/lineupDetail?lineId=${item.id}&tag=${JSON.stringify(getTag(detail[index].line_tag))}&feature=${JSON.stringify(getFeature(detail[index].line_feature))}`">
					<!-- 自定义 header -->
					<template v-slot:header>
						<view class="slot-box-head">
							<view class="leval">
								<u--text align="center" :text="item.quality"></u--text>
							</view>
							<u--text :text="detail[index].line_name"> </u--text>
							<u-icon name="arrow-right"></u-icon>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view class="slot-box-body">
							<view v-for="(item2,index2) in heroList[index]" :key="index2">
								<view class="hero_img">
									<u--image v-if="item2" width="36px" height="36px" showError
										:src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/'+item2.name">
									</u--image>
								</view>
							</view>
						</view>
					</template>
					<!-- 自定义 footer-->
					<template v-slot:footer>
						<view class="slot-box-footer">
							<u--image :src="item.lineupauthor_data.imgUrl" width="24px" height="24px" radius="50%">
							</u--image>
							<view>
								<u--text size="24rpx" :text="item.lineupauthor_data.name" margin="0  1rem "></u--text>
							</view>
							<view class="lineup_tag">
								<u--text align="center" :text="getTag(detail[index].line_tag).title"></u--text>
							</view>
							<view class="lineup_feature">
								<u--text align="center" :text="getFeature(detail[index].line_feature).title"></u--text>
							</view>

						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<u-loadmore :status="status" loadingIcon="semicircle" iconColor="#00aaff" loadingText="正在努力加载•᷄ࡇ•᷅" />
		</view>
		<!-- 双人模式 -->
		<view v-if="cur===1" class="list-1">
			<uni-list>
				<uni-list-item v-for="(item,index) in dou_eachList" :key="item.id" direction="column" :showArrow="false"
					:to="`../lineupDetail/lineupDetail?lineId=${item.id}&tag=${JSON.stringify(getTag(detail[index].line_tag))}&feature=${JSON.stringify(getFeature(detail[index].line_feature))}`">
					<!-- 自定义 header -->
					<template v-slot:header>
						<view class="slot-box-head">
							<view class="leval">
								<u--text align="center" :text="item.quality"></u--text>
							</view>
							<u--text :text="dou_detail[index].line_name"> </u--text>
							<u-icon name="arrow-right"></u-icon>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view class="slot-box-body" v-if="dou_heroList">
							<u--image class="hero_img" v-for="(item2,index2) in dou_heroList[index]" :key="item2.TFTID"
								width="36px" height="36px" showError
								:src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/'+item2.name">
							</u--image>
						</view>
					</template>
					<!-- 自定义 footer-->
					<template v-slot:footer>
						<view class="slot-box-footer">
							<u--image :src="item.lineupauthor_data.imgUrl" width="24px" height="24px" radius="50%">
							</u--image>
							<u--text :text="item.lineupauthor_data.name" margin="0  1rem "></u--text>
							<u--text class="lineup_tag" align="center" :text="getTag(dou_detail[index].line_tag).title">
							</u--text>
							<view>
								<u--text class="lineup_feature" align="center"
									:text="getFeature(dou_detail[index].line_feature).title" size="15"></u--text>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<u-loadmore :status="status2" loadingIcon="semicircle" iconColor="#00aaff" loadingText="正在努力加载•᷄ࡇ•᷅" />
		</view>
	</view>

</template>

<script>
	import _ from 'lodash'
	import {
		_http
	} from "@/utils/request.js"
	export default {
		data() {
			return {
				//轮播图列表
				list1: [
					"https://game.gtimg.cn/images/lol/act/img/tft/recopepos/xiaoxiaoyasuo.jpg",
					"https://game.gtimg.cn/images/lol/act/img/tft/recopepos/3zhounianzmhaoshi.jpg",
					"https://game.gtimg.cn/images/lol/act/img/tft/recopepos/3zhounianzhuzhan.jpg",
					"https://game.gtimg.cn/images/lol/act/img/tft/recopepos/3zhounianxuyuan.jpg"
				],
				//选择器
				list2: ['常规阵容', '双人模式'],
				cur: 0,
				//options传过来的数据
				gettedData: {},
				//单人阵容总列表
				lineupList: [],
				//分页列表[(page-1)*size,page*size]
				eachList: [],
				//每一个阵容的detail
				detail: [],
				//当前页码
				page: 1,
				//每页数据量
				size: 10,
				//loadmore
				status: 'loadmore',
				//阵容所有英雄
				heroList: [],
				//阵容tag
				tag: [],
				//阵容特性
				feature: [],
				//双人loadmore
				status2: 'loadmore',
				//双人阵容总列表
				dou_lineupList: [],
				//分页列表[(page-1)*size,page*size]
				dou_eachList: [],
				//每一个阵容的detail
				dou_detail: [],
				//当前页码
				dou_page: 1,
				//每页数据量
				dou_size: 10,
				//loadmore
				dou_status: 'loadmore',
				//阵容所有英雄
				dou_heroList: [],
				//阵容tag
				dou_tag: [],
				//阵容特性
				dou_feature: [],

			}
		},
		computed: {
			version: function() {
				return this.lineupList[0]?.simulator_edition
			}
		},
		watch: {


		},
		methods: {
			//更改轮播图index
			sub_change(index) {
				this.cur = index
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
			getRace(raceId) {
				for (let item of this.gettedData.raceList) {
					if (item.raceId === raceId) {
						this.race.push(item)
					}
				}
			},
			getJob(jobId) {
				this.gettedData.jobList.forEach(item => {
					if (item.jobId === jobId) {
						this.job.push(item)
					}
				})
			},
			//获取阵容标签
			getTag(lineup_tag) {
				let tag = {}
				this.tag.forEach(item => {
					if (lineup_tag == item.id) {
						tag = item
					}
				})
				return tag
			},
			//获取阵容特性
			getFeature(lineup_feature) {
				let feature = {}
				this.feature.forEach(item => {
					if (lineup_feature == item.id) {
						feature = item
					}
				})
				return feature
			},
			//更新updateDetail
			updateDetail(flag) {
				if (flag === 0) {
					let b = this.eachList.length >= this.page * this.size ? this.page * this.size : this.eachList.length
					this.eachList.slice((this.page - 1) * this.size, b).forEach((item, index) => {
						item = item.detail.replace(/\s*/g, '')
						//每一个阵容的detail
						let temp = JSON.parse(item)
						this.detail.push(temp)
						this.heroList[(this.page - 1) * this.size + index] = []
						temp.hero_location.forEach((item2, i) => {
							let hero = this.getChess(item2.hero_id)
							if (hero) {
								this.heroList[(this.page - 1) * this.size + index].push(hero)
							}
						})
					})
				} else {
					let b = this.dou_eachList.length >= this.dou_page * this.dou_size ? this.dou_page * this.dou_size :
						this.dou_eachList.length
					this.dou_eachList.slice((this.dou_page - 1) * this.dou_size, b).forEach((item, index) => {
						item = item.detail.replace(/\s*/g, '')
						//每一个阵容的detail
						let temp = JSON.parse(item)
						this.dou_detail.push(temp)
						this.dou_heroList[(this.dou_page - 1) * this.dou_size + index] = []
						temp.hero_location.forEach((item2, i) => {
							let hero = this.getChess(item2.hero_id + '')
							if (hero) {
								this.dou_heroList[(this.dou_page - 1) * this.dou_size + index].push(hero)
							}
						})
					})
				}

			},
			//页面跳转
			navTo(url) {
				uni.navigateTo({
					url
				})
			},


		},

		async onLoad(option) {

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
			//单人阵容
			this._http('/tftzlkauto/json/lineupJson/s7/6/lineup_detail_total.json', 'GET').then(res => {
				this.lineupList = res.lineup_list
				//判断够不够一整页
				let b = this.lineupList.length >= this.page * this.size ? this.page * this.size : this
					.lineupList
					.length
				this.eachList = this.lineupList.slice((this.page - 1) * this.size, b)
				this.updateDetail(0)
			})
			//双人阵容
			this._http('/tftzlkauto/json/doubleLineupJson/s7/6/doubleLineup_detail_total.json', 'GET').then(res => {
				this.dou_lineupList = res.lineup_list
				//判断够不够一整页
				if (!this.dou_lineupList) return
				let b = this.dou_lineupList.length >= this.dou_page * this.dou_size ?
					this.dou_page * this.dou_size :
					this.dou_lineupList.length
				this.dou_eachList = this.dou_lineupList.slice((this.dou_page - 1) * this.dou_size, b)
				this.updateDetail(1)
			})
			//阵容标签
			this._http('/tftzlkauto/json/tagJson/tag.json', 'GET').then(res => {
				Object.keys(res).forEach(item => {
					this.tag.push(res[item])
				})
			})
			//阵容特性
			this._http('/tftzlkauto/json/specialityJson/speciality.json', 'GET').then(res => {
				Object.keys(res).forEach(item => {
					this.feature.push(res[item])
				})
			})

			//操作item
			// //操作race
			// this.item.raceIds.split(',').forEach((item, index) => {
			// 	this.getRace(item)
			// })
			// //操作job
			// this.item.jobIds.split(',').forEach((item, index) => {
			// 	this.getJob(item)
			// })
		},
		//触底加载
		onReachBottom() {
			if (this.cur === 0) {
				if (this.page * this.size < this.lineupList.length) {
					this.page++
					this.status = 'loading'
					//判断够不够一整页
					let b = this.lineupList.length >= this.page * this.size ? this.page * this.size : this.lineupList
						.length
					this.eachList = this.eachList.concat(this.lineupList.slice((this.page - 1) * this.size, b))
					this.updateDetail(0)
				} else {
					this.status = 'nomore'
				}
			} else {
				//判断够不够一整页
				if (this.dou_page * this.dou_size < this.dou_lineupList.length) {
					this.dou_page++
					this.status2 = 'loading'
					let b = this.dou_lineupList.length >= this.dou_page * this.dou_size ? this.dou_page * this.dou_size :
						this.dou_lineupList.length
					this.dou_eachList = this.dou_eachList.concat(this.dou_lineupList.slice((this.dou_page - 1) * this
						.dou_size, b))
					this.updateDetail(1)
				} else {
					this.status2 = 'nomore'
				}
			}


		}
	}
</script>

<style lang="scss" scoped>
	.root {


		.head {

			background-color: #fff;
			border-radius: 1vw;
			box-shadow: 0 1px 10px 0vh #0003;
			margin: 2vh auto;
			width: 90vw;
			padding-bottom: 2vh;

			.title {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 2vh 4vw;

				.title-name {
					margin-left: 2vw;
				}
			}

			.list {
				display: flex;
				flex-direction: row;
				justify-content: space-around;

				.list-item {
					display: flex;
					flex-direction: column;
					align-items: center;
				}
			}
		}

		.swiper {
			width: 90vw;
			height: 130px;
			margin: 0 auto;
		}

		.sub {
			$sub-item-width: 6rem;
			width: 2*$sub-item-width;
			margin: 2vh auto;


			.u-subsection__bar {
				width: $sub-item-width;
			}
		}

		.list-head {
			background-color: #f0f3f7;
			padding-left: 4vw;
		}

		.list-1 {
			.uni-list-item {
				border-bottom: 1vh #f0f3f7 solid;
			}

			.slot-box-head {
				display: flex;
				flex-direction: row;

				.leval {
					width: 1.5rem;
					height: 1.5rem;
					background-color: $u-error-dark;
					flex: 0 0 auto;
					border-radius: 10%;
				}
			}

			.slot-box-body {
				margin-top: 0.8rem;
				display: flex;
				flex-direction: row;

				.hero_img {
					margin-right: 6rpx;
				}
			}

			.slot-box-footer {
				margin-top: 0.4rem;
				display: flex;
				flex-direction: row;
				align-items: center;

				.lineup_tag {
					margin-right: 1rem !important;
					width: 5rem;
					background-color: $u-warning-disabled;
					border-radius: 10rpx;
					flex: 0 0 auto;
				}

				.lineup_feature {
					width: 5rem;
					background-color: $u-warning-disabled;
					border-radius: 10rpx;
					flex: 0 0 auto;
				}
			}
		}

	}
</style>
