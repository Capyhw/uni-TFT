(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ranking/ranking"],{"3cd5":function(t,e,n){},"4e97":function(t,e,n){"use strict";var u=n("3cd5"),a=n.n(u);a.a},"7e94":function(t,e,n){"use strict";n.r(e);var u=n("fe1b"),a=n("8d97");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("4e97");var o,l=n("f0c5"),s=Object(l["a"])(a["default"],u["b"],u["c"],!1,null,"4ad96222",null,!1,u["a"],o);e["default"]=s.exports},"8d97":function(t,e,n){"use strict";n.r(e);var u=n("f5e5"),a=n.n(u);for(var i in u)"default"!==i&&function(t){n.d(e,t,(function(){return u[t]}))}(i);e["default"]=a.a},be06:function(t,e,n){"use strict";(function(t){n("bbd9");u(n("66fd"));var e=u(n("7e94"));function u(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},f5e5:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=n("2b17"),a=n("5c3e"),i={data:function(){return{area_id:"1",rankList:[],offset:0,status:"loadmore",opt:[{text:"艾欧尼亚  电信",value:"1"},{text:"比尔吉沃特  网通",value:"2"},{text:"祖安 电信",value:"3"},{text:"诺克萨斯  电信",value:"4"},{text:"德玛西亚 网通",value:"6"},{text:"班德尔城 电信",value:"5"},{text:"皮尔特沃夫 电信",value:"7"},{text:"战争学院 电信",value:"8"},{text:"弗雷尔卓德 网通",value:"9"},{text:"巨神峰 电信",value:"10"},{text:"雷瑟守备 电信",value:"11"},{text:"无畏先锋 网通",value:"12"},{text:"裁决之地 电信",value:"13"},{text:"黑色玫瑰 电信",value:"14"},{text:"暗影岛 电信",value:"15"},{text:"钢铁烈阳 电信",value:"17"},{text:"恕瑞玛 网通",value:"16"},{text:"水晶之痕 电信",value:"18"},{text:"教育网专区",value:"21"},{text:"影流 电信",value:"22"},{text:"守望之海 电信",value:"23"},{text:"扭曲丛林 网通",value:"20"},{text:"征服之海 电信",value:"24"},{text:"卡拉曼达 电信",value:"25"},{text:"皮城警备 电信",value:"27"},{text:"巨龙之巢 网通",value:"26"},{text:"男爵领域 全网络",value:"30"},{text:"均衡教派",value:"19"}]}},methods:{getRankList:function(t,e){var n=this,i=(0,u.getSign)(t,e),o="/get_total_tier_rank_list?area_id=".concat(t,"&offset=").concat(e,"&sign=").concat(i);(0,a._http)(o,"POST","/lua/mlol_battle_info").then((function(t){n.offset=t.data.next_offset,n.rankList=n.rankList.concat(t.data.player_list)}))},changeArea:function(){var t=this;this.$nextTick((function(){t.rankList=[],t.offset=0,t.getRankList(t.area_id,t.offset)}))}},computed:{},onLoad:function(){this.getRankList(this.area_id,this.offset)},onReachBottom:function(){this.status="loading",this.page++,this.getRankList(this.area_id,this.offset),this.status="loadmore"}};e.default=i},fe1b:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return u}));var u={uniDataSelect:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-data-select/components/uni-data-select/uni-data-select")]).then(n.bind(null,"52d7"))},uniList:function(){return n.e("uni_modules/uni-list/components/uni-list/uni-list").then(n.bind(null,"71cc"))},uniListItem:function(){return n.e("uni_modules/uni-list/components/uni-list-item/uni-list-item").then(n.bind(null,"e865"))},"u-Text":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--text/u--text")]).then(n.bind(null,"c3c2"))},"u-Image":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--image/u--image")]).then(n.bind(null,"d62e"))},uLoadmore:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-loadmore/u-loadmore")]).then(n.bind(null,"5923"))}},a=function(){var t=this,e=t.$createElement;t._self._c},i=[]}},[["be06","common/runtime","common/vendor"]]]);