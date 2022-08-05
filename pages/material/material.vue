<template>
	<view>
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="zhanwei" :style="{'height':getHeight+'px'}">
			<!-- 把胶囊空出来 -->
		</view>
		<u-sticky :customNavHeight='0'>
			<view class="tabs">
				<u-tabs :list="tabsList" :current='cur' :scrollable='false' style="white-space: nowrap"
					@change="change">
				</u-tabs>
			</view>
		</u-sticky>
		<!-- 英雄 -->
		<view class="tab_hero" v-if="cur==0">
			<view>
				<uni-fab :popMenu="false" horizontal="right" vertical="bottom" @fabClick="pop_open"></uni-fab>
			</view>
			<!-- 弹出层 -->
			<view class="pop">
				<u-toast ref="uToast"></u-toast>
				<view class="">
					<u-popup :show="show" mode="right" closeOnClickOverlay @close="pop_close">
						<view class="popupRoot">
							<!-- :customStyle="{width:'90%',alignItems:'flex-end'}" -->
							<text class="title">种族 </text>
							<view class="race">
								<view class="u-page__tag-item" v-for="(item, index) in gettedData.raceList"
									:key="index">
									<u-tag :text="item.name" :plain="race[index]" type="primary" size="large"
										@click="tag_race_click(index,item.raceId)">
									</u-tag>
								</view>
							</view>
							<text class="title">职业</text>
							<view class="job">
								<view class="u-page__tag-item" v-for="(item, index) in gettedData.jobList" :key="index">
									<u-tag :text="item.name" :plain="job[index]" type="primary" size="large"
										@click="tag_job_click(index,item.jobId)">
									</u-tag>
								</view>
							</view>
							<text class="title">消耗</text>
							<view class="pay">
								<view v-for="(item,index) in payList" class="u-page__tag-item" :key="index">
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
			</view>

			<uni-list>
				<uni-list-item v-for="(item,index) in new_options.chessList" :title="item.title"
					:note="item.displayName" :key="item.TFTID" link
					:to="'../chessDetail/chessDetail?chessId='+item.chessId"
					:thumb="'https://game.gtimg.cn/images/lol/act/img/tft/champions/'+item.name" thumbSize="lg">
					{{item.title}}
				</uni-list-item>

			</uni-list>
		</view>
		<!-- 装备 -->
		<view class="tab_equip" v-if="cur==1">
			<view class="index-equipment-tab">
				<u-sticky>
					<view class="filter-base">
						<view class="base-equip" v-for="item in base_equipList" :key="item.equipId"
							:class="{selected:selected_base_equip==item.equipId}">
							<u--image class='img' :showLoading="true" :src="item.imagePath" width="8vw" height="8vw"
								@click="baseClick(item.equipId)">
							</u--image>
						</view>
					</view>
				</u-sticky>
				<view class="equipmentlist-ul-wrap">
					<view class="equipmentlist-ul">
						<view class="equipment-item" v-for="(item,index) in show_equipment_list" :key="item.equipId">
							<view class="item-top">
								<view class="pic" :style="'background-image:url('+item.imagePath+')'">
								</view>
								<view class="name">{{item.name}}</view>
							</view>
							<view class="item-effect">
								<view class="part-title">效果</view>
								<view class="equipment-effect">{{item.effect}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 羁绊 -->
		<view class="tab_fetters" v-if="cur==2">
			<u-sticky>
				<u-tabs :list="tab_list" :scrollable="false" @change="change2"> </u-tabs>
			</u-sticky>

			<uni-list v-if="cur2==0">
				<uni-list-item v-for="(item,index) in gettedData.raceList" :title="item.name" :note="item.displayName"
					link :key="item.TFTID" :to="'../fettersDetail/fettersDetail?race_id='+item.raceId"
					:thumb="'https://game.gtimg.cn/images/lol/act/img/tft/origins/'+item.alias" thumbSize="lg">
					{{item.name}}
				</uni-list-item>
			</uni-list>
			<uni-list v-if="cur2==1">
				<uni-list-item v-for="(item,index) in gettedData.jobList" :key="item.TFTID" :title="item.name"
					:note="item.displayName" link :to="'../fettersDetail/fettersDetail?job_id='+item.jobId"
					:thumb="item.imagePath" thumbSize="lg">
					{{item.name}}
				</uni-list-item>
			</uni-list>
		</view>

		<!-- 海克斯 -->
		<view class="tab_hex" v-if="cur==3">
			<u-sticky bgColor="#fff">
				<u-tabs class='head' :list="list" :current='cur3' @change="changeTab" :scrollable='false' :activeStyle="{
            color: '#303133',
            fontWeight: 'bold',
            transform: 'scale(1.05)'
        }"></u-tabs>
			</u-sticky>
			<view class="equipmentlist-ul-wrap" v-if="cur3==0&&first_hexList">
				<view class="equipmentlist-ul" v-for="(item,index) in first_hexList" :key="item.id">
					<view class="equipment-item">
						<view class="item-top">
							<view class="pic" :style="'background-image:url('+item.imgUrl+')'">
							</view>
							<view class="name">{{item.name}}</view>
						</view>
						<view class="item-effect">
							<view class="part-title">效果</view>
							<view class="equipment-effect">{{item.description}}</view>
						</view>
					</view>
				</view>
			</view>

			<view class="equipmentlist-ul-wrap" v-if="cur3==1&&second_hexList">
				<view class="equipmentlist-ul" v-for="(item,index) in second_hexList" :key="item.id">
					<view class="equipment-item">
						<view class="item-top">
							<view class="pic" :style="'background-image:url('+item.imgUrl+')'">
							</view>
							<view class="name">{{item.name}}</view>
						</view>
						<view class="item-effect">
							<view class="part-title">效果</view>
							<view class="equipment-effect">{{item.description}}</view>
						</view>
					</view>
				</view>
			</view>

			<view class="equipmentlist-ul-wrap" v-if="cur3==2&&third_hexList">
				<view class="equipmentlist-ul" v-for="(item,index) in third_hexList" :key="item.id">
					<view class="equipment-item">
						<view class="item-top">
							<view class="pic" :style="'background-image:url('+item.imgUrl+')'">
							</view>
							<view class="name">{{item.name}}</view>
						</view>
						<view class="item-effect">
							<view class="part-title">效果</view>
							<view class="equipment-effect">{{item.description}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 小小英雄 -->
		<view class="tab_littlehero" v-if="cur==4">
			<!-- 搜索 -->
			<view class="search-bar">
				<u-search margin="2vh 2vw" bgColor='#f0f3f7' v-model="search_input_value" shape='square'
					:showAction='false' @change="seach"></u-search>
			</view>
			<!--筛选tab-->
			<view class="sort-tab" ref="sortTab">
				<view class="sort-tab-item"
					:class="open_second_sort_container && show_second_sort_tab === 'race' && 'selected'"
					@click="clickFirstSort('race')">
					<a class="name">类型</a>
					<view class="triangle-icon"></view>
				</view>
				<view class="sort-tab-item"
					:class="open_second_sort_container && show_second_sort_tab === 'quality_number' && 'selected'"
					@click="clickFirstSort('quality_number')">
					<a class="name">品质</a>
					<view class="triangle-icon"></view>
				</view>
			</view>
			<!--筛选content-->
			<view class="sort-content" :class="open_second_sort_container && 'show'" ref="sortContent">
				<!--种族列表-->
				<view class="sort-content-ul" v-if="show_second_sort_tab === 'race'">
					<view class="sort-content-item" :class="checkSecondSortIsSelected('all','race') && 'selected'"
						@click="secondSortItemClick('all','race')">
						全部
					</view>
					<view class="sort-content-item" v-for="item in type_list"
						:class="checkSecondSortIsSelected(item,'race') && 'selected'"
						@click="secondSortItemClick(item,'race')">
						{{getFirstTypeName(item)}}
					</view>
				</view>
				<!--品质列表-->
				<view class="sort-content-ul" v-if="show_second_sort_tab === 'quality_number'">
					<view class="sort-content-item"
						:class="checkSecondSortIsSelected('all','quality_number') && 'selected'"
						@click="secondSortItemClick('all','quality_number')">
						全部
					</view>
					<view class="sort-content-item" v-for="item in quality_list"
						:class="checkSecondSortIsSelected(item.quality_number,'quality_number') && 'selected'"
						@click="secondSortItemClick(item.quality_number,'quality_number')">
						{{item.quality}}
					</view>
				</view>
			</view>
			<view class="xxhero-container">
				<view class="first-race-one" v-for="f_data in show_xxhero_array" :key="f_data.first_type_id">
					<view class='xxhero-list-h3'>{{getFirstTypeName(f_data.first_type_id)}}</view>
					<view class="xxhero-list">
						<view v-for="sc_data in f_data.second_type_list" :key="sc_data.second_type_id"
							class="xxhero-one">
							<view class="pic-list">
								<view v-for="hero in sc_data.xxhero_list" class="img-item">
									<view class="quality-xy" v-if="hero.quality === '稀有'"></view>
									<view class="quality-ss" v-else-if="hero.quality === '史诗'"></view>
									<view class="quality-cs" v-else-if="hero.quality === '传说'"></view>
									<muqian-lazyLoad class="img" height='25vw' width='25vw' :src="hero.imagePath"
										:showDistance="{ 'bottom':'200' }" borderRadius='1vw'>
									</muqian-lazyLoad>
									<view class="star" :class="'star-'+hero.star"></view>
								</view>
							</view>
							<view class="pic-list-name">
								{{getFirstAndSecondTypeName(f_data.first_type_id,sc_data.second_type_id)}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>




	</view>
</template>

<script>
	import {
		_http
	} from '@/utils/request.js'
	import _ from 'lodash'

	export default {
		data() {
			return {
				// 全部数据
				gettedData: {},
				tabsList: [{
						name: '英雄'
					},
					{
						name: '装备'
					},
					{
						name: '羁绊'
					},
					{
						name: '海克斯'
					},
					{
						name: '小小英雄'
					},
				],
				cur: 0,

				/* 英雄 */
				//筛选后显示的数据
				new_options: {},
				//popup显示标志
				show: false,
				//plain标志
				race: [],
				job: [],
				pay: [true, true, true, true, true, true, true],
				payList: [1, 2, 3, 4, 5, 8, 10],
				//记录点击了哪个tag
				race_id: undefined,
				job_id: undefined,
				pay_id: undefined,
				/* 英雄-end */

				/* 装备 */
				//装备列表
				equipList: [],
				//基础装备
				base_equipList: [],
				//当前被选中的合成件
				selected_base_equip: null,
				//显示列表
				show_equipment_list: [],
				/* 装备-end */
				/* 羁绊 */
				tab_list: [{
					name: '种族'
				}, {
					name: '职业',
				}, ],
				//tabs的当前索引
				cur2: 0,
				/* 羁绊-end */
				/* 海克斯 */
				list: [{
					name: '一级',
				}, {
					name: '二级',
				}, {
					name: '三级',
				}],
				cur3: 0,
				hexList: {},
				first_hexList: {},
				second_hexList: {},
				third_hexList: {},
				/* 海克斯-end */

				/* 小小英雄 */
				//搜索框内容
				search_input_value: '',
				//小小英雄列表数据(原始)
				orign_little_heroes_list: null,
				//小小英雄列表数据(当前)
				little_heroes_list: null,
				//
				first_sort: null,
				second_sort: null,
				//打开二级筛选分页容器
				open_second_sort_container: false,
				//显示哪个二级筛选分页
				show_second_sort_tab: false,
				show_xxhero_array: null
				/* 小小英雄-end */

			}
		},
		computed: {
			/* 小小英雄 */
			type_list: function() {
				if (!this.little_heroes_list) return;
				var rs = _.map(this.little_heroes_list, function(xxhero) {
					return xxhero.miniId;
				});
				rs = _.uniq(rs);
				return rs;
			},
			quality_list: function() {
				if (!this.little_heroes_list) return;
				var rs = {};
				_.forEach(this.little_heroes_list, function(xxhero) {
					rs[xxhero.quality_number] || (rs[xxhero.quality_number] = {
						quality_number: xxhero.quality_number,
						quality: xxhero.quality
					});
				});
				return _.orderBy(rs);
			},
			/* 小小英雄-end */


			/* 获取胶囊按钮的高度 */

			getHeight: function() {
				// #ifndef H5 || APP-PLUS || MP-ALIPAY
				return uni.getMenuButtonBoundingClientRect().bottom
				// #endif
			},
		},
		methods: {
			change(item) {
				this.cur = item.index
			},
			change2(item) {
				this.cur2 = item.index
			},
			changeTab(item) {
				this.cur3 = item.index
			},
			preventHandler() {
				return
			},



			navigateTo(url) {
				uni.navigateTo({
					url
				})
			},




			/* 英雄 */
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
				this.new_options.chessList = this.gettedData.chessList
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
					this.gettedData.chessList.forEach(item => {
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
						this.gettedData.chessList.forEach(item => {
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
						this.gettedData.chessList.forEach(item => {
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

			},

			/* 装备 */
			//根据id获取装备信息
			getEquip(id) {
				this.equipList.forEach((item, index) => {
					if (item.equipId == id) {}
				})
			},
			/**通过基础装备搜索装备 */
			filterEquipmentByFormula: function(formula, equip_list) {
				var rs;
				if (!formula) {
					rs = null;
				} else {
					rs = _.filter(equip_list, function(equipment) {
						return _.includes(equipment.formula, formula) || +equipment.equipId === +formula;
					});
				}
				rs = _.orderBy(rs, "type");
				return rs;
			},
			//单击基础装备筛选
			baseClick(id) {
				if (this.selected_base_equip == id) {
					this.selected_base_equip = null
					this.show_equipment_list = _.orderBy(this.equipList, "type")
					return
				}
				this.selected_base_equip = id
				this.show_equipment_list = this.filterEquipmentByFormula(id, this.equipList);
			},

			/* 小小英雄 */
			// 搜索功能
			seach() {
				//清理一二级筛选
				this.first_sort = null;
				this.second_sort = null;
				if (!this.search_input_value) {
					this.show_xxhero_array = this.orign_little_heroes_list
				}
				this.show_xxhero_array = this.filterxxHeroBySearch(this.search_input_value, this.little_heroes_list);
			},
			/** 根据某个字段的值,将json列表对象重新划分 start */
			groupBy(data, keyName) {
				var rs = {},
					rsTemp;
				_.forEach(data, function(value, key) {
					if (value.hasOwnProperty(keyName)) {
						rsTemp = rs[value[keyName]] || (rs[value[keyName]] = {});
						rsTemp[key] = value;
					}
				});
				return rs;
			},
			/** 根据某个字段的值,将json列表对象重新划分 end */
			sortLittleheroesData(little_heroes_list) {
				var rs = [];
				//把小小英雄按照一级大种族分类
				var temp_first_group = _.groupBy(little_heroes_list, "miniId");
				//再按二级同种族分类,转录分好类的数据到rs内
				_.forEach(temp_first_group, function(group, first_type_id) {
					//新建好数据结构
					var first_type_data = {
						first_type_id: first_type_id,
						second_type_list: []
					}
					//将数据再按二级种族分类
					var temp_second_group = _.groupBy(group, "typeId");
					//转录二级种族分类到first_type_data.second_type_list内
					_.forEach(temp_second_group, function(xxhero_list, second_type_id) {
						xxhero_list.sort(function(a, b) {
							return +a.star - +b.star;
						});
						first_type_data.second_type_list.push({
							second_type_id: second_type_id,
							xxhero_list: xxhero_list
						});
					});
					//按照品级排序
					first_type_data.second_type_list = _.orderBy(first_type_data.second_type_list, function(
						second_type_data) {
						return _.get(second_type_data, 'xxhero_list.[0].quality_number');
					});
					rs.push(first_type_data);
					temp_second_group = first_type_data = null;
				});
				temp_first_group = null;
				return rs;
			},
			/**
			 * 获取一级大类的名字
			 */
			getFirstTypeName(first_type_id) {
				var temp = _.find(this.little_heroes_list, {
					miniId: first_type_id
				});

				return _.get(temp, 'mini');
			},
			/**
			 * 获取一二级大类的名字
			 */
			getFirstAndSecondTypeName(first_type_id, second_type_id) {
				var temp = _.find(this.little_heroes_list, {
					miniId: first_type_id,
					typeId: second_type_id
				});
				return _.get(temp, 'type') + " " + _.get(temp, 'mini');
			},
			/**通过搜索筛选小小英雄 */
			filterxxHeroBySearch(search_string, little_heroes_list) {
				var rs;
				if (!search_string) {
					rs = little_heroes_list;
				} else {
					rs = _.filter(little_heroes_list, function(xxhero) {
						return xxhero.name.indexOf(search_string) !== -1 ||
							xxhero.mini.indexOf(search_string) !== -1 ||
							xxhero.type.indexOf(search_string) !== -1 ||
							xxhero.quality.indexOf(search_string) !== -1;
					});
				}
				return this.sortLittleheroesData(rs);
			},
			/**二级筛选英雄 */
			filterHeroBySecondSort(second_sort_name, first_sort_name, little_heroes_list) {
				var rs;
				//二级是all
				if (second_sort_name === "all") {
					rs = little_heroes_list;
				}
				//二级是细分值
				else {
					//按类型分
					if (first_sort_name === 'race') {
						rs = _.filter(little_heroes_list, {
							miniId: second_sort_name
						});
					}
					//按品级分
					else if (first_sort_name === 'quality_number') {
						rs = _.filter(little_heroes_list, {
							quality_number: second_sort_name
						});
					}
				}
				return this.sortLittleheroesData(rs);
			},
			/**响应二级筛选点击*/
			secondSortItemClick(second_sort_name, first_sort_name) {
				if (this.first_sort === first_sort_name && this.second_sort === second_sort_name) return;

				//关闭二级筛选容器
				this.open_second_sort_container = false;

				this.first_sort = first_sort_name;
				this.second_sort = second_sort_name;

				this.show_xxhero_array = this.filterHeroBySecondSort(second_sort_name, first_sort_name, this
					.little_heroes_list);

			},
			/**判断二级筛选的item是否被选中 */
			checkSecondSortIsSelected(second_sort_name, first_sort_name) {
				if (second_sort_name === 'all' && this.second_sort === second_sort_name) {
					return true;
				} else if (this.first_sort === first_sort_name && this.second_sort === second_sort_name) {
					return true;
				} else {
					return false;
				}
			},
			/**响应一级筛选tab点击*/
			clickFirstSort(first_sort_name) {
				//如果已经显示了这个swiper,则关闭
				if (this.show_second_sort_tab === first_sort_name && this.open_second_sort_container) {
					this.open_second_sort_container = false;
				}
				//记录需要显示哪个二级筛选的分页
				else {
					this.show_second_sort_tab = first_sort_name;
					this.open_second_sort_container = true;
				}
			},
			/* 小小英雄-end */











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

			/* 英雄 */
			this.new_options = _.cloneDeep(options)
			//初始化race的个数
			for (let i = 0; i < this.gettedData.raceList.length; i++) {
				this.race.push(true)
			}
			//初始化job的个数
			for (let i = 0; i < this.gettedData.jobList.length; i++) {
				this.job.push(true)
			}

			/* 装备 */
			this.equipList = _.cloneDeep(this.gettedData.equipList)
			//S7赛季的装备
			const s7_equip = [501, 502, 503, 504, 505, 506, 507, 508, 509, 519, 521, 523, 525, 529, 531, 535, 537, 539,
				541, 543, 545, 547, 551, 553, 555, 557, 559, 561, 565, 567, 569, 571, 573, 577, 579, 581, 583, 587,
				589, 591, 595, 597, 601, 603, 607, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 6022, 7001,
				7002,
				7003, 7004, 7005, 7006, 7007, 7008, 7009, 7010, 7011, 7012, 7013, 7014, 7015, 7016, 7017, 7018,
				7019,
				7020, 7031, 7032, 7022, 7023, 7024, 7025, 7026, 7027, 7028, 7030, 5001, 5002, 5003, 5004, 5005,
				5006,
				5007, 5008, 5009, 5010, 5011, 5012, 5013, 5014, 5015, 5016, 5017, 5018, 5019, 5020, 5021, 5022,
				5023,
				5024, 5025, 5026, 5027, 5028, 5029, 5030, 5031, 5032, 5033, 5034, 5035, 5036
			];
			//从所有装备中过滤出S7赛季的装备
			this.equipList = _.filter(this.equipList, function(item) {
				return _.indexOf(s7_equip, +item.equipId) !== -1;
			});
			//S7赛季的特殊装备（光明、转职、金鳞龙装备）
			const s7_spec = [412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 6022, 7001, 7002, 7003, 7004, 7005,
				7006,
				7007, 7008, 7009, 7010, 7011, 7012, 7013, 7014, 7015, 7016, 7017, 7018, 7019, 7020, 7031, 7032,
				7022,
				7023, 7024, 7025, 7026, 7027, 7028, 7030, 5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009,
				5010,
				5011, 5012, 5013, 5014, 5015, 5016, 5017, 5018, 5019, 5020, 5021, 5022, 5023, 5024, 5025, 5026,
				5027,
				5028, 5029, 5030, 5031, 5032, 5033, 5034, 5035, 5036
			];
			//将特殊装备设置type为3
			_.forEach(this.equipList, item => {
				if (_.indexOf(s7_spec, +item.equipId) !== -1) {
					item.type = 3;
				};
			});
			//基础装备
			_.forEach(this.equipList, item => {
				if (item.type == 1) {
					this.base_equipList.push(item)
				}
			})
			this.show_equipment_list = _.orderBy(this.equipList, "type")



			/* 海克斯 */
			this.hexList = _.cloneDeep(this.gettedData.hexList)
			_.forEach(this.hexList, (v, k) => {
				if (v['type'] == '1') {
					this.first_hexList[k] = v;
				} else if (v['type'] == '2') {
					this.second_hexList[k] = v;
				} else {
					this.third_hexList[k] = v
				}
			})
			/* 小小英雄 */
			//获取小小英雄数据
			_http('/img/tft/js/hero.js', 'GET').then(res => {
				this.little_heroes_list = res.data

			}).then(() => {
				// console.log(this.little_heroes_list);
				//按品级,处理排序
				var quality_array = ['', '稀有', '史诗', '传说'];
				_.forEach(this.little_heroes_list, function(xxhero) {
					xxhero.quality_number = quality_array.indexOf(xxhero.quality);
				});
				this.show_xxhero_array = this.filterxxHeroBySearch(null, this.little_heroes_list);
				this.orign_little_heroes_list = JSON.parse(JSON.stringify(this.show_xxhero_array))
			})
			/* 小小英雄-end */

		}
	}
</script>

<style lang="scss" scoped>
	.zhanwei {}

	.u-grid-item {
		margin: 10rpx 0;
		padding: 10rpx;
	}


	.fettersDetail {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.tabs {
		background-color: #fff;
		white-space: nowrap;
	}

	/* 英雄 */
	.tab_hero {


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

	/* 装备 */
	.tab_equip {
		.index-equipment-tab {
			.filter-base {
				display: flex;
				flex-direction: row;
				justify-content: center;
				background-color: #ffffff;
				padding: 2vh 0;
				border-bottom: 1px solid #eff2f2;

				.base-equip {
					margin-right: 2vw;
					border: 1px solid #83a2be;

				}

				.base-equip:last-child {
					margin: 0;
				}

				.selected {
					// border: 3px solid #27a9a2;
					outline: 2px solid #27a9a2;
				}
			}

			.equipmentlist-ul-wrap {
				// border-top: #eff2f2 1vh solid;
				background-color: #f0f3f7;

				.equipmentlist-ul {
					.equipment-item {
						margin-bottom: 4vw;
						background-color: #ffffff;
						padding: 2vh 2vw;

						.item-top {
							display: flex;
							flex-direction: row;
							align-items: center;

							.pic {
								background-repeat: no-repeat;
								background-size: contain;
								width: 10vw;
								height: 10vw;
								background-color: #1c1c1c;
								border-radius: 1vw;
								// 记录一下，给图片加内边框
								outline: 1px solid black;
								outline-offset: -1px;
								margin-left: 4vw;
							}

							.name {
								margin-left: 4vw;
								font-size: 4vw;
							}
						}

						.item-effect {
							margin-left: 18vw;

							.part-title {
								font-size: 3vw;
							}

							.equipment-effect {
								font-size: 3vw;
								color: #757e7f;
							}
						}
					}
				}
			}
		}

	}



	/* 海克斯 */
	.tab_hex {
		.head {
			border-bottom: 1px solid #eff2f2;
		}

		.equipmentlist-ul-wrap {
			background-color: #f0f3f7;

			.equipmentlist-ul {

				.equipment-item {
					margin-bottom: 4vw;
					background-color: #ffffff;
					padding: 2vh 2vw;

					.item-top {
						display: flex;
						flex-direction: row;
						align-items: center;


						.pic {
							background-repeat: no-repeat;
							background-size: contain;
							width: 10vw;
							height: 10vw;
							background-color: #1c1c1c;
							margin-left: 4vw;
							border-radius: 1vw;
						}

						.name {
							margin-left: 4vw;
							font-size: 4vw;
						}
					}

					.item-effect {
						margin-left: 18vw;

						.part-title {
							font-size: 3vw;
						}

						.equipment-effect {
							font-size: 3vw;
							color: #757e7f;
						}
					}
				}
			}
		}
	}

	/* 小小英雄 */
	.tab_littlehero {

		width: 100vw;
		position: relative;
		height: 93vh;
		overflow: hidden;

		.search-bar {
			position: relative;
			height: 5vh;
		}

		.sort-tab {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			border-top: #eff2f2 1px solid;
			border-bottom: #eff2f2 1px solid;
			position: relative;
			background-color: #ffffff;
			margin-top: 2vw;
			overflow: hidden;

			.sort-tab-item {
				height: 10vw;
				line-height: 10vw;
				width: 50vw;
				text-align: center;
				position: relative;

				/* 分类tab后面的小三角 */
				.triangle-icon {
					display: inline-block;
					vertical-align: middle;
					margin-left: 7px;
					width: 3vw;
					height: 2vw;
					vertical-align: middle;
					transition: transform 0.2s;
					transform: scaleY(1);
					background-image: url("//game.gtimg.cn/images/lol/act/a20200224tft/triangle-icon.png");
					background-size: contain;
					background-repeat: no-repeat;
				}
			}

			// 两个分类tab之间的竖线
			.sort-tab-item:first-of-type::after {
				content: "";
				position: absolute;
				width: 2px;
				height: 2vh;
				background-color: #eff2f2;
				top: 1vh;
				right: 0;
			}

			.sort-tab-item.selected {
				.triangle-icon {
					transform: scaleY(-1);
				}
			}

		}




		.sort-content {
			position: absolute;
			width: 100%;
			z-index: 10;
			overflow: hidden;

			height: 0%;
			background-color: rgba(0, 0, 0, 0.6);
			// transition: height 1s;

			.sort-content-ul {
				width: 100vw;
				height: auto;
				background-color: #ffffff;
				display: flex;
				flex-wrap: wrap;

				.sort-content-item {
					width: 29vw;
					height: 4vh;
					background-color: #f3f5f9;
					margin: 0.5vh 2vw;
					color: #757e7f;
					font-size: 1vw;
					line-height: 4vh;
					text-align: center;
					border-radius: 1vw;
					// transition: background-color 0.5s;
				}
			}
		}

		.sort-content.show {
			height: 100vh;
		}

		.xxhero-container {
			position: absolute;
			overflow: auto;
			height: 78vh;
			top: 28vw;
			bottom: 0;
			width: 100vw;

			.first-race-one {
				.xxhero-list-h3 {
					padding: 1vh 7.5vw;
					font-size: 4vw;
					background-color: #ffffff;
					z-index: 5;
					width: 100vw;
					letter-spacing: 1vw;
					position: sticky;
					top: -1vw;
					box-sizing: border-box;

				}

				.xxhero-list {
					width: 100vw;

					.hidden {
						display: none;
					}

					.xxhero-one {
						width: 85vw;
						padding-bottom: 1vh;
						margin: 0 auto;

						.pic-list {
							overflow: hidden;
							width: 90vw;
							// margin: 0 auto;



							.img-item {
								float: left;
								position: relative;
								margin: 0 5vw 0 0;

								.quality-xy {
									z-index: 1;
									width: 10vw;
									height: 10vw;
									position: absolute;
									background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/xxhero-quality-1-icon.png);
									background-size: contain;
									background-repeat: no-repeat;
								}

								.quality-ss {
									z-index: 1;
									width: 10vw;
									height: 10vw;
									position: absolute;
									background-size: contain;
									background-repeat: no-repeat;
									background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/xxhero-quality-2-icon.png);
								}

								.quality-cs {
									z-index: 1;
									width: 10vw;
									height: 10vw;
									position: absolute;
									background-size: contain;
									background-repeat: no-repeat;
									background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/xxhero-quality-3-icon.png);
								}

								.u-image,
								/deep/ .u-image__image,
									{
									border-radius: 1vw;
									background-size: contain;
									width: 25vw !important;
									height: 25vw !important;
									background-repeat: no-repeat;
								}

								.star {
									z-index: 1;
									position: absolute;
									right: 1vw;
									bottom: 1vh;
									filter: brightness(1.3);
								}

								.star-1 {
									width: 3vw;
									height: 3vw;
									background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/star-1.png);
									background-size: contain;
									background-repeat: no-repeat;
								}

								.star-2 {
									width: 6vw;
									height: 3vw;
									background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/star-2.png);
									background-size: contain;
									background-repeat: no-repeat;
								}

								.star-3 {
									width: 9vw;
									height: 3vw;
									background-image: url(//game.gtimg.cn/images/lol/act/a20200224tft/star-3.png);
									background-size: contain;
									background-repeat: no-repeat;
								}
							}
						}
					}

					.pic-list-name {
						// width: 100vw;
						text-align: center;
						// display: inline-block;
					}
				}
			}
		}
	}
</style>
