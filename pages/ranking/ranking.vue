<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="head">
			<uni-data-select v-model="area_id" :clear="false" :localdata="opt" @change="changeArea">

			</uni-data-select>
			<view class="duanwei">
				段位
			</view>
			<view class="shengdian">
				胜点
			</view>
		</view>
		<view>
			<uni-list>
				<uni-list-item v-for="(item,index) in rankList"
					:to="'../fettersDetail/fettersDetail?job_id='+item.jobId" :showArrow="false">
					<!-- 自定义 header -->
					<template v-slot:header>
						<view class="slot-box-head">
							<view>
							</view>
							<u--text :text="item.ranking" margin="0 0 0 -1rem" block align="center" size="24"></u--text>
							<u--image showError :src="item.icon" width="3rem" height="3rem" radius="50%"
								errorIcon="https://ossweb-img.qq.com/images/lol/act/a20200224tft/leaderboard-avatar.png">
							</u--image>
						</view>
					</template>
					<!-- 自定义 body -->
					<template v-slot:body>
						<view class="slot-box-body">
							<u--text :text="item.name" size="14"></u--text>
						</view>
					</template>
					<!-- 自定义 footer-->
					<template v-slot:footer>
						<view class="slot-box-footer">
							<u--text :text="item.tier_title" align="center" size="14"></u--text>
							<u--text :text="item.league_points" align="center" size="14"></u--text>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<u-loadmore :status="status" loadingIcon="semicircle" iconColor="#00aaff" loadingText="正在努力加载•᷄ࡇ•᷅" />
		</view>
	</view>
</template>

<script>
	import {
		getSign
	} from '@/utils/getSign.js'
	import {
		_http
	} from "@/utils/request.js"
	export default {
		data() {
			return {
				area_id: '1',
				rankList: [],
				offset: 0,
				status: 'loadmore',
				opt: [{
						text: "艾欧尼亚  电信",
						value: '1',
					},
					{
						text: "比尔吉沃特  网通",
						value: "2",
					},
					{
						text: "祖安 电信",
						value: "3",
					},
					{
						text: "诺克萨斯  电信",
						value: "4",
					},
					{
						text: "德玛西亚 网通",
						value: "6",
					},
					{
						text: "班德尔城 电信",
						value: "5",
					},
					{
						text: "皮尔特沃夫 电信",
						value: "7",
					},
					{
						text: "战争学院 电信",
						value: "8",
					},
					{
						text: "弗雷尔卓德 网通",
						value: "9",
					},
					{
						text: "巨神峰 电信",
						value: "10",
					},
					{
						text: "雷瑟守备 电信",
						value: "11",
					},
					{
						text: "无畏先锋 网通",
						value: "12",
					},
					{
						text: "裁决之地 电信",
						value: "13",
					},
					{
						text: "黑色玫瑰 电信",
						value: "14",
					},
					{
						text: "暗影岛 电信",
						value: "15",
					},
					{
						text: "钢铁烈阳 电信",
						value: "17",
					},
					{
						text: "恕瑞玛 网通",
						value: "16",
					},
					{
						text: "水晶之痕 电信",
						value: "18",
					},
					{
						text: "教育网专区",
						value: "21",
					},
					{
						text: "影流 电信",
						value: "22",
					},
					{
						text: "守望之海 电信",
						value: "23",
					},
					{
						text: "扭曲丛林 网通",
						value: "20",
					},
					{
						text: "征服之海 电信",
						value: "24",
					},
					{
						text: "卡拉曼达 电信",
						value: "25",
					},
					{
						text: "皮城警备 电信",
						value: "27",
					},
					{
						text: "巨龙之巢 网通",
						value: "26",
					},
					{
						text: "男爵领域 全网络",
						value: "30",
					},
					{
						text: "均衡教派",
						value: "19",
					}
				]
			}
		},
		methods: {
			getRankList: function(area_id, offset) {
				//获取sign
				const sign = getSign(area_id, offset)
				let url =
					`/get_total_tier_rank_list?area_id=${area_id}&offset=${offset}&sign=${sign}`
				_http(url, 'POST', '/lua/mlol_battle_info').then(res => {
					this.offset = res.data.next_offset
					this.rankList = this.rankList.concat(res.data.player_list)
				})
			},
			changeArea: function() {
				this.$nextTick(() => {
					this.rankList = []
					this.offset = 0
					// console.log(this.area_id);
					this.getRankList(this.area_id, this.offset)
				})

			}
		},
		computed: {

		},
		onLoad() {
			this.getRankList(this.area_id, this.offset)

		},
		onReachBottom() {
			this.status = 'loading'
			this.page++
			this.getRankList(this.area_id, this.offset)
			this.status = 'loadmore'
		}
	}
</script>

<style lang="scss" scoped>
	page {
		margin: 0;
		padding: 0;
	}

	.head {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #f0f3f7;
		color: #757e7f;

		.duanwei {
			position: absolute;
			right: 26vw;
		}

		.shengdian {
			position: absolute;
			right: 8vw;
		}
	}

	.uni-stat__select {

		/deep/ .uni-stat__actived {
			outline: 0;
			width: 40vw;
			margin-left: 10vw;

			.uni-select {
				border: 0;
			}
		}
	}

	/deep/ .uni-list-item__container {
		align-items: center;
	}

	.slot-box-head {
		.u-text {
			width: 4rem;
			margin-left: -2rem;
		}

		/deep/ .u-image {
			border: solid 2px #b99b79;

			//配置加载失败图片的样式
			.u-icon__img {
				border-radius: 50%;
			}
		}


		display: flex;
		flex-direction: row;
	}

	.slot-box-body {
		width: 400rpx;
		// height: 2rem;
		// line-height: 2rem;
		margin-left: 1rem;
	}

	.slot-box-footer {
		.u-text {
			width: 4rem;
			margin-left: auto;
		}

		margin-left: auto;
		display: flex;
		flex-direction: row;
	}
</style>
