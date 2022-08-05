<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view v-if="race_id" class="race_root">
			<uni-section class="race" :title="item.name" type="line">
				<uni-card :title="item.name" :isFull="true" :thumbnail="item.imagePath">
					<text v-text="item.introduce" class="uni-body"></text>
					<view v-for="(item2,index) in item.level" :key="index">
						<view class="race_num">{{index}}</view>{{item2}}
					</view>
				</uni-card>
			</uni-section>
			<uni-card v-for="(i,index) in chess" :key="index" @click="card_click(index)">
				<template v-slot:title>
					<view class="card_head">
						<u-image width="48px" height="48px" radius="4px"
							:src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/'+i.name">
						</u-image>
						<text class="name">{{ i.displayName }}</text>
						<!-- 金币图和价格 -->
						<view class="card_title">
							<image style="" mode="">
							</image>
							<text class="price">{{ i.price }}</text>
						</view>
					</view>
				</template>
				<view class="uni-body">
					<u-image :src="i.skillImage" class="skill_image" mode="aspectFill" width="32" height="32"
						radius="4px"></u-image>
					<u--text :text="`[${i.skillName}]: ${i.skillIntroduce}`" margin=" 0 0 0 20px"></u--text>
				</view>
			</uni-card>
		</view>
		<view v-if="job_id" class="job_root">
			<uni-section class="job" :title="item.name" type="line">
				<uni-card :title="item.name" :isFull="true" :thumbnail="item.imagePath">
					<text v-text="item.introduce" class="uni-body"></text>
					<view v-for="(item3,index) in item.level" :key="index">
						<view class="job_num">{{index}}</view>{{item3}}
					</view>
				</uni-card>
			</uni-section>
			<uni-card v-for="(i,index) in chess" :key="index" @click="card_click(index)">
				<template v-slot:title>
					<view class="card_head">
						<u-image width="48px" height="48px"
							:src="'https://game.gtimg.cn/images/lol/act/img/tft/champions/'+i.name">
						</u-image>
						<text class="name">{{ i.displayName }}</text>
						<view class="card_title">
							<image style="" mode="">
							</image>
							<text class="price">{{ i.price }}</text>
						</view>
					</view>
				</template>
				<view class="uni-body">
					<u-image :src="i.skillImage" class="skill_image" mode="aspectFill" width="32" height="32"></u-image>
					<u--text :text="`[${i.skillName}]: ${i.skillIntroduce}`" margin=" 0 0 0 20px"></u--text>
				</view>
			</uni-card>
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
				race_id: '',
				job_id: '',
				options: {},
				item: {},
				chess: [],
			};
		},
		methods: {
			getChess(chessId) {
				for (let item of this.options.chessList) {
					if (item.chessId === chessId) {
						return item
					}
				}
			},
			getRace(raceId) {
				for (let item of this.options.raceList) {
					if (item.raceId === raceId) {
						return item
					}
				}
			},
			getJob(jobId) {
				for (let item of this.options.jobList) {
					if (item.jobId === jobId) {
						return item
					}
				}
			},
			card_click(index) {
				uni.navigateTo({
					url: '../chessDetail/chessDetail?chessId=' + this.chess[index].chessId
				})
			}
		},
		async onLoad(o) {
			//接收跳转参数
			this.race_id = o.race_id
			this.job_id = o.job_id
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
			this.options = _.cloneDeep(options)
			if (this.race_id) {
				//操作race
				this.item = this.getRace(this.race_id)
				this.options.chessList.forEach(item => {
					item.raceIds.split(',').forEach(item2 => {
						if (item2 === this.race_id) {
							this.chess.push(item)
						}
					})
				})
			} else {
				//操作job
				this.item = this.getJob(this.job_id)
				this.options.chessList.forEach(item => {
					item.jobIds.split(',').forEach(item2 => {
						if (item2 === this.job_id) {
							this.chess.push(item)
						}
					})
				})
			}
			//设置导航栏名字
			uni.setNavigationBarTitle({
				title: this.item.name
			})

		}
	}
</script>

<style lang="scss" scoped>
	.uni-body {
		display: flex;
	}

	.card_head {
		margin-top: 1rem;
		display: flex;

		.name {
			margin: 1rem;
		}
	}

	.card_title {
		position: absolute;
		top: 2rem;
		right: 2.5rem;

		image {
			display: inline-block;
			vertical-align: middle;
			background: url(//game.gtimg.cn/images/lol/tft/content-site/sprite-img.png?v=1646623320296);
			background-repeat: no-repeat;
			background-position: -154px -266px;
			width: 18px;
			height: 16px;
		}

		.price {
			margin-left: 0.5rem;

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
</style>
