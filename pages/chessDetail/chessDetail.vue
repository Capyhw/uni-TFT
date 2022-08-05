<template>
	<view>
		<view class="head" v-if="item.TFTID">
			<!-- 头部背景图 -->
			<image :src="'https://game.gtimg.cn/images/lol/tft/cham-icons/624x318/'+item.TFTID+'.jpg'" mode="widthFix">
			</image>
			<view class="champion ">
				<!-- 圆形头像 -->
				<view class="pic">
					<image :src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/'+item.name" mode="">
					</image>
				</view>
				<view class="price">{{item.price}}</view>
				<!-- 头部信息 -->
				<view class="message">
					<view class="name">
						{{item.title+'——'+item.displayName}}
					</view>
					<view class="champion_race_job">
						<view>
							<view class="champion_race" v-for="(i,index) in race" :key="index">
								<image :src="i.imagePath" mode=""></image>
								<text>{{i.name}}</text>
							</view>
						</view>
						<view v-for="(i,index) in job" class="champion_job" :key="index">
							<image :src="i.imagePath" mode=""></image>
							<text>{{i.name}}</text>
						</view>
					</view>
				</view>

			</view>
			<uni-table v-if="item.lifeData" class="table" border emptyText="">
				<uni-tr>
					<uni-th align="center" class="thead1"></uni-th>
					<uni-th align="center" class="thead2">⭐</uni-th>
					<uni-th align="center" class="thead3">⭐⭐</uni-th>
					<uni-th align="center" class="thead4">⭐⭐⭐</uni-th>
				</uni-tr>
				<uni-tr>
					<uni-td align="center">生命</uni-td>
					<uni-td align="center">{{item.lifeData.split('/')[0]}}</uni-td>
					<uni-td align="center">{{item.lifeData.split('/')[1]}}</uni-td>
					<uni-td align="center">{{item.lifeData.split('/')[2]}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td align="center">护甲</uni-td>
					<uni-td align="center" class="row_union">{{item.armor}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td align="center">魔抗</uni-td>
					<uni-td align="center" class="row_union">{{item.spellBlock}}</uni-td>

				</uni-tr>
				<uni-tr>
					<uni-td align="center">物攻</uni-td>
					<uni-td align="center">{{item.attackData.split('/')[0]}}</uni-td>
					<uni-td align="center">{{item.attackData.split('/')[1]}}</uni-td>
					<uni-td align="center">{{item.attackData.split('/')[2]}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td align="center">攻速</uni-td>
					<uni-td align="center" class="row_union">0.65 </uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td align="center">暴击率 </uni-td>
					<uni-td align="center" class="row_union">25% </uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td align="center">攻击距离 </uni-td>
					<uni-td align="center" class="row_union">{{item.attackRange}} </uni-td>
				</uni-tr>

			</uni-table>
			<!-- 技能 -->
			<uni-section title="技能" type="line">
				<uni-card :title="item.skillName" :isFull="true" :sub-title="item.skillType"
					:extra="'💧'+item.startMagic+'/'+item.magic" :thumbnail="item.skillImage">
					<text class="uni-body">{{item.skillIntroduce}}</text>
				</uni-card>
			</uni-section>
			<!-- 种族 -->
			<uni-section class="race" title="种族" type="line">
				<uni-card v-for="(i,index) in race" :key="index" :title="i.name" :isFull="true"
					:thumbnail="i.imagePath">
					<text v-text="i.introduce" class="uni-body"></text>
					<view v-for="(item,index) in i.level" :key="index">
						<view class="race_num">{{index}}</view>{{item}}
					</view>
				</uni-card>
			</uni-section>
			<!-- 职业 -->
			<uni-section class="job" title="职业" type="line">
				<uni-card v-for="(i,index) in job" :key="index" :title="i.name" :isFull="true" :thumbnail="i.imagePath">
					<text v-text="i.introduce" class="uni-body"></text>
					<view v-for="(item2,index) in i.level" :key="index">
						<view class="job_num">{{index}}</view>{{item2}}
					</view>
				</uni-card>
			</uni-section>
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
				gettedData: {},
				chessId: '',
				item: {},
				race: [],
				job: []
			}
		},
		computed: {

		},
		methods: {
			getChess(chessId) {
				this.gettedData.chessList.forEach(item => {
					if (item.chessId === chessId) {
						this.item = item
					}
				})
			},
			getRace(raceId) {
				this.gettedData.raceList.forEach((item) => {
					if (item.raceId === raceId) {
						this.race.push(item)
					}
				})
			},
			getJob(jobId) {
				this.gettedData.jobList.forEach(item => {
					if (item.jobId === jobId) {
						this.job.push(item)
					}
				})
			}
		},
		async onLoad(option) {
			const options = {
				chessList: [],
				jobList: [],
				raceList: [],
				hexList: {},
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

			])

			this.gettedData = _.cloneDeep(options)
			//操作item
			this.getChess(option.chessId)
			//操作race
			this.item.raceIds.split(',').forEach((i, index) => {
				this.getRace(i)
			})
			//操作job
			this.item.jobIds.split(',').forEach((i, index) => {
				this.getJob(i)
			})
			//设置导航栏名字
			uni.setNavigationBarTitle({
				title: this.item.displayName
			})

		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.head {
		display: flex;
		flex-direction: column;

		>image {
			width: 100%;
		}

		.champion {
			display: flex;
			position: relative;
			width: 100%;
			height: 100%;
			margin-top: -7rem;
			margin-bottom: 2rem;

			.pic {
				width: 3.8rem;
				height: 3.8rem;
				margin-left: 1rem;
				overflow: hidden;
				border: 2px solid #cca329;
				border-collapse: collapse;
				border-radius: 50%;

				image {
					width: 4rem;
					height: 4rem;
					transform: scale(1.24);
				}

			}

			.price {
				position: absolute;
				background-color: #cca329;
				width: 1.2rem;
				height: 1.2rem;
				text-align: center;
				line-height: 1.2rem;
				border-radius: 50%;
				bottom: 0rem;
				left: 4rem;
			}



			.message {
				display: flex;
				flex-direction: column;
				margin-left: 1rem;

				.name {
					$text-size: 1.5rem;
					height: $text-size;
					line-height: $text-size;
					color: #fff;
					font-size: 1rem;
					font-weight: 700;

				}

				.champion_race_job {
					display: flex;
					color: #fff;
					font-size: 0.8rem;
					font-weight: 400;
					vertical-align: middle;
					margin-top: 0.5rem;

					image {
						width: 48rpx;
						height: 54rpx;
						filter: invert(100%);
					}

					text {
						line-height: 54rpx;
					}

					.champion_race {
						display: flex;
						background-color: rgba($color: #000000, $alpha: 0.65);
						padding: 0 10rpx 0 0;
						border-radius: 4rpx;
					}

					.champion_job {
						display: flex;
						margin-left: 0.3rem;
						background-color: rgba($color: #000000, $alpha: 0.65);
						padding: 0 10rpx 0 0;
						border-radius: 4rpx;
					}

				}

			}




		}

		.table {
			overflow: hidden;
			display: flex;
			border: 0px;

			/deep/ .uni-table {
				min-width: 375px !important;
			}

			.uni-table-tr {
				width: 100vw;
			}

			.thead1 {
				width: 30vw;
			}

			.thead2 {
				width: 10vw;
			}

			.thead3 {
				width: 30vw;
			}

			.thead4 {
				width: 30vw;
			}

			.row_union {
				position: absolute;
				width: calc(100% - 28vw);
			}
		}


		.race {

			.race_num {
				display: inline-block;
				background-color: #000;
				color: #eaeaea;
				width: 1rem;
				height: 1rem;
				text-align: center;
				line-height: 1rem;
				margin-right: 20rpx;
			}
		}

		.job {

			.job_num {
				display: inline-block;
				background-color: #000;
				color: #eaeaea;
				width: 1rem;
				height: 1rem;
				text-align: center;
				line-height: 1rem;
				margin-right: 20rpx;
			}

		}

	}
</style>
