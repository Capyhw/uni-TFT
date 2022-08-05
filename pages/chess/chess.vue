<template>
	<view class="root">
		<view>
			<uni-fab :popMenu="false" horizontal="right" vertical="bottom" @fabClick="pop_open"></uni-fab>
		</view>
		<!-- 弹出层 -->
		<view class="pop">
			<u-toast ref="uToast"></u-toast>
			<u-popup :show="show" mode="right" closeOnClickOverlay @close="pop_close" @touchmove="test">
				<view class="popupRoot">
					<!-- :customStyle="{width:'90%',alignItems:'flex-end'}" -->
					<text class="title">种族 </text>
					<view class="race">
						<view class="u-page__tag-item" v-for="(item, index) in options.raceList" :key="index">
							<u-tag :text="item.name" :plain="race[index]" type="primary" size="large"
								@click="tag_race_click(index,item.raceId)">
							</u-tag>
						</view>
					</view>
					<text class="title">职业</text>
					<view class="job">
						<view class="u-page__tag-item" v-for="(item, index) in options.jobList" :key="index">
							<u-tag :text="item.name" :plain="job[index]" type="primary" size="large"
								@click="tag_job_click(index,item.jobId)">
							</u-tag>
						</view>
					</view>
					<text class="title">消耗</text>
					<view class="pay">
						<view v-for="(item,index) in 5" class="u-page__tag-item" :key="index">
							<u-tag :text="item" :plain="pay[index]" type="primary" size="large"
								@click="tag_pay_click(index,item)"></u-tag>
						</view>
					</view>
					<view class="btn">
						<button type="default" @click="pop_init">重置</button>
						<button type="default" @click="commit">确定</button>
					</view>
				</view>

			</u-popup>
		</view>

		<uni-list>
			<uni-list-item v-for="(item,index) in new_options.chessList" :title="item.title" :note="item.displayName"
				:key="item.TFTID" link :to="'../chessDetail/chessDetail?chessId='+item.chessId"
				:thumb="'https://game.gtimg.cn/images/lol/act/img/tft/champions/'+item.name" thumbSize="lg">
				{{item.title}}
			</uni-list-item>

		</uni-list>
	</view>


</template>

<script>
	import {
		options
	} from '@/common/options.js'
	export default {
		data() {
			return {
				//原始数据
				options: {},
				//筛选后显示的数据
				new_options: {},
				//popup显示标志
				show: false,
				//plain标志
				race: [],
				job: [],
				pay: [true, true, true, true, true],
				//记录点击了哪个tag
				race_id: undefined,
				job_id: undefined,
				pay_id: undefined,

			}
		},
		methods: {

	tag_race_click(index, id) {
		this.race.forEach((item, i) => {
			this.$set(this.race, i, true)
			if (index === i) {
				this.$set(this.race, i, false)
				this.race_id = id
			}
		})
	},
	tag_job_click(index, id) {
		this.job.forEach((item, i) => {
			this.$set(this.job, i, true)
			if (index === i) {
				this.$set(this.job, i, false)
				this.job_id = id
			}
		})
	},
	tag_pay_click(index, id) {
		this.pay.forEach((item, i) => {
			this.$set(this.pay, i, true)
			if (index === i) {
				this.$set(this.pay, i, false)
				this.pay_id = id.toString()
			}
		})
	},
	pop_open() {
		this.show = true
	},
	pop_close() {
		this.show = false
	},
	//重置
	pop_init() {
		this.new_options.chessList = this.options.chessList
		for (let i = 0; i < this.race.length; i++) {
			this.$set(this.race, i, true)
		}
		for (let i = 0; i < this.job.length; i++) {
			this.$set(this.job, i, true)
		}
		for (let i = 0; i < this.pay.length; i++) {
			this.$set(this.pay, i, true)
		}
		this.race_id = undefined
		this.job_id = undefined
		this.pay_id = undefined
		this.pop_close()
	},
	//确定筛选按钮
	commit() {
		//对res去重
		function uniqueFunc(arr, uniId) {
			const res = new Map();
			return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
		}
		let res = []
		if (this.race_id !== undefined) {
			//选择了种族tag
			this.options.chessList.forEach(item => {
				if (item.raceIds.split(',').indexOf(this.race_id) !== -1) {
					res.push(item)
				}
			})
		}
		if (this.job_id !== undefined) {
			//选择了职业tag
			if (res.length) {
				//如果上面选择了种族tag，就在上面的结果列表里遍历
				res = res.filter((cur, index) => {
					return cur.jobIds.split(',').indexOf(this.job_id) !== -1
				}, this)
			} else {
				//如果没有，则在完整列表里遍历
				this.options.chessList.forEach(item => {
					if (item.jobIds.split(',').indexOf(this.job_id) !== -1) {
						res.push(item)
					}
				})
			}
		}
		if (this.pay_id !== undefined) {
			//选择了价格tag
			if (res.length) {
				//如果之前选择过tag，就在res里遍历
				res = res.filter((cur, index) => {
					return cur.price.split(',').indexOf(this.pay_id) !== -1
				}, this)
			} else {
				//如果上面的tag都没选，就在完整列表里遍历
				this.options.chessList.forEach(item => {
					if (item.price === this.pay_id) {
						res.push(item)
					}
				})
			}
		}
		if (res.length) {
			this.new_options.chessList = uniqueFunc(res, 'TFTID')
			this.pop_close()
		} else {
			//啥都没选或者是选了但没有符合的
			this.$refs.uToast.show({
				type: 'error',
				message: '没有符合的',
	
			})
			this.pop_init()
		}
	
	}
			
		
		
		},
		onLoad() {
			function deepClone(obj) {
				let copy = obj instanceof Array ? [] : {}
				for (let key in obj) {
					if (obj.hasOwnProperty(key)) {
						copy[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
					}
				}
				return copy
			}
			this.options = deepClone(options)
			this.new_options = deepClone(options)
			
			
			//初始化race的个数
			for (let i = 0; i < this.options.raceList.length; i++) {
				this.race.push(true)
			}
			//初始化job的个数
			for (let i = 0; i < this.options.jobList.length; i++) {
				this.job.push(true)
			}
		},
	}
</script>

<style scoped lang="scss">
	.root {

		/deep/.uni-fab__circle {
			.uni-icons {
				font-size: 10rpx !important;
			}

			.uni-icons:before {
				content: '筛选';
				color: black;
				font-size: 16px;
				vertical-align: middle;
			}
		}

		.u-popup ::v-deep .u-transition {
			align-items: flex-end;
			width: 80%;
		}

		.popupRoot {
			display: flex;
			flex-direction: column;
			height: 100vh;

			.title,
			.race,
			.job,
			.pay {
				margin-left: 1rem;
				margin-top: 1rem;
			}

			.race,
			.job,
			.pay {
				display: flex;
				flex-wrap: wrap;
				margin-top: 1rem;

				.u-transition {
					flex-direction: row;
				}

				.u-page__tag-item {
					margin: 0.2rem;
				}
			}

			.btn {
				display: flex;
				justify-content: space-between;

				button {
					margin: 1rem 1rem 0 1rem;
					flex-grow: 0.4;
				}
			}
		}
	}
</style>
