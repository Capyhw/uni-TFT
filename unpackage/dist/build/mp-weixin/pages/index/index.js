(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0139":function(t,e,i){},1460:function(t,e,i){"use strict";i.r(e);var n=i("23f7"),u=i("da10");for(var o in u)"default"!==o&&function(t){i.d(e,t,(function(){return u[t]}))}(o);i("d694");var s,a=i("f0c5"),r=Object(a["a"])(u["default"],n["b"],n["c"],!1,null,"7a5675d2",null,!1,n["a"],s);e["default"]=r.exports},"23f7":function(t,e,i){"use strict";i.d(e,"b",(function(){return u})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={"u-Image":function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u--image/u--image")]).then(i.bind(null,"d62e"))},uSwiper:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-swiper/u-swiper")]).then(i.bind(null,"5839"))},uSubsection:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-subsection/u-subsection")]).then(i.bind(null,"4e22"))},uniList:function(){return i.e("uni_modules/uni-list/components/uni-list/uni-list").then(i.bind(null,"71cc"))},uniListItem:function(){return i.e("uni_modules/uni-list/components/uni-list-item/uni-list-item").then(i.bind(null,"e865"))},"u-Text":function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u--text/u--text")]).then(i.bind(null,"c3c2"))},uIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(i.bind(null,"eb7d"))},uLoadmore:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-loadmore/u-loadmore")]).then(i.bind(null,"5923"))}},u=function(){var t=this,e=t.$createElement,i=(t._self._c,0===t.cur?t.__map(t.eachList,(function(e,i){var n=t.__get_orig(e),u=JSON.stringify(t.getTag(t.detail[i].line_tag)),o=JSON.stringify(t.getFeature(t.detail[i].line_feature)),s=t.getTag(t.detail[i].line_tag),a=t.getFeature(t.detail[i].line_feature);return{$orig:n,g0:u,g1:o,m0:s,m1:a}})):null),n=1===t.cur?t.__map(t.dou_eachList,(function(e,i){var n=t.__get_orig(e),u=JSON.stringify(t.getTag(t.detail[i].line_tag)),o=JSON.stringify(t.getFeature(t.detail[i].line_feature)),s=t.getTag(t.dou_detail[i].line_tag),a=t.getFeature(t.dou_detail[i].line_feature);return{$orig:n,g2:u,g3:o,m2:s,m3:a}})):null;t.$mp.data=Object.assign({},{$root:{l0:i,l1:n}})},o=[]},a33c:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(i("a34a")),u=s(i("2ef0")),o=i("5c3e");function s(t){return t&&t.__esModule?t:{default:t}}function a(t,e,i,n,u,o,s){try{var a=t[o](s),r=a.value}catch(l){return void i(l)}a.done?e(r):Promise.resolve(r).then(n,u)}function r(t){return function(){var e=this,i=arguments;return new Promise((function(n,u){var o=t.apply(e,i);function s(t){a(o,n,u,s,r,"next",t)}function r(t){a(o,n,u,s,r,"throw",t)}s(void 0)}))}}function l(t,e){var i;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=c(t))||e&&t&&"number"===typeof t.length){i&&(t=i);var n=0,u=function(){};return{s:u,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:u}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,a=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return s=t.done,t},e:function(t){a=!0,o=t},f:function(){try{s||null==i.return||i.return()}finally{if(a)throw o}}}}function c(t,e){if(t){if("string"===typeof t)return h(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?h(t,e):void 0}}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var d={data:function(){return{list1:["https://game.gtimg.cn/images/lol/act/img/tft/recopepos/xiaoxiaoyasuo.jpg","https://game.gtimg.cn/images/lol/act/img/tft/recopepos/3zhounianzmhaoshi.jpg","https://game.gtimg.cn/images/lol/act/img/tft/recopepos/3zhounianzhuzhan.jpg","https://game.gtimg.cn/images/lol/act/img/tft/recopepos/3zhounianxuyuan.jpg"],list2:["常规阵容","双人模式"],cur:0,gettedData:{},lineupList:[],eachList:[],detail:[],page:1,size:10,status:"loadmore",heroList:[],tag:[],feature:[],status2:"loadmore",dou_lineupList:[],dou_eachList:[],dou_detail:[],dou_page:1,dou_size:10,dou_status:"loadmore",dou_heroList:[],dou_tag:[],dou_feature:[]}},computed:{version:function(){var t;return null===(t=this.lineupList[0])||void 0===t?void 0:t.simulator_edition}},watch:{},methods:{sub_change:function(t){this.cur=t},getChess:function(t){if(this.gettedData){var e,i=l(this.gettedData.chessList);try{for(i.s();!(e=i.n()).done;){var n=e.value;if(n.chessId==t)return n}}catch(u){i.e(u)}finally{i.f()}}},getRace:function(t){var e,i=l(this.gettedData.raceList);try{for(i.s();!(e=i.n()).done;){var n=e.value;n.raceId===t&&this.race.push(n)}}catch(u){i.e(u)}finally{i.f()}},getJob:function(t){var e=this;this.gettedData.jobList.forEach((function(i){i.jobId===t&&e.job.push(i)}))},getTag:function(t){var e={};return this.tag.forEach((function(i){t==i.id&&(e=i)})),e},getFeature:function(t){var e={};return this.feature.forEach((function(i){t==i.id&&(e=i)})),e},updateDetail:function(t){var e=this;if(0===t){var i=this.eachList.length>=this.page*this.size?this.page*this.size:this.eachList.length;this.eachList.slice((this.page-1)*this.size,i).forEach((function(t,i){t=t.detail.replace(/\s*/g,"");var n=JSON.parse(t);e.detail.push(n),e.heroList[(e.page-1)*e.size+i]=[],n.hero_location.forEach((function(t,n){var u=e.getChess(t.hero_id);u&&e.heroList[(e.page-1)*e.size+i].push(u)}))}))}else{var n=this.dou_eachList.length>=this.dou_page*this.dou_size?this.dou_page*this.dou_size:this.dou_eachList.length;this.dou_eachList.slice((this.dou_page-1)*this.dou_size,n).forEach((function(t,i){t=t.detail.replace(/\s*/g,"");var n=JSON.parse(t);e.dou_detail.push(n),e.dou_heroList[(e.dou_page-1)*e.dou_size+i]=[],n.hero_location.forEach((function(t,n){var u=e.getChess(t.hero_id+"");u&&e.dou_heroList[(e.dou_page-1)*e.dou_size+i].push(u)}))}))}},navTo:function(e){t.navigateTo({url:e})}},onLoad:function(t){var e=this;return r(n.default.mark((function t(){var i;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i={chessList:[],jobList:[],raceList:[],hexList:{},equipList:[],rankList:[]},t.next=3,Promise.all([(0,o._http)("/img/tft/js/chess.js","GET").then((function(t){i.chessList=t.data})),(0,o._http)("/img/tft/js/race.js","GET").then((function(t){i.raceList=t.data})),(0,o._http)("/img/tft/js/job.js","GET").then((function(t){i.jobList=t.data})),(0,o._http)("/img/tft/js/hex.js","GET").then((function(t){i.hexList=t})),(0,o._http)("/img/tft/js/equip.js","GET").then((function(t){i.equipList=t.data}))]);case 3:e.gettedData=u.default.cloneDeep(i),e._http("/tftzlkauto/json/lineupJson/s7/6/lineup_detail_total.json","GET").then((function(t){e.lineupList=t.lineup_list;var i=e.lineupList.length>=e.page*e.size?e.page*e.size:e.lineupList.length;e.eachList=e.lineupList.slice((e.page-1)*e.size,i),e.updateDetail(0)})),e._http("/tftzlkauto/json/doubleLineupJson/s7/6/doubleLineup_detail_total.json","GET").then((function(t){if(e.dou_lineupList=t.lineup_list,e.dou_lineupList){var i=e.dou_lineupList.length>=e.dou_page*e.dou_size?e.dou_page*e.dou_size:e.dou_lineupList.length;e.dou_eachList=e.dou_lineupList.slice((e.dou_page-1)*e.dou_size,i),e.updateDetail(1)}})),e._http("/tftzlkauto/json/tagJson/tag.json","GET").then((function(t){Object.keys(t).forEach((function(i){e.tag.push(t[i])}))})),e._http("/tftzlkauto/json/specialityJson/speciality.json","GET").then((function(t){Object.keys(t).forEach((function(i){e.feature.push(t[i])}))}));case 8:case"end":return t.stop()}}),t)})))()},onReachBottom:function(){if(0===this.cur)if(this.page*this.size<this.lineupList.length){this.page++,this.status="loading";var t=this.lineupList.length>=this.page*this.size?this.page*this.size:this.lineupList.length;this.eachList=this.eachList.concat(this.lineupList.slice((this.page-1)*this.size,t)),this.updateDetail(0)}else this.status="nomore";else if(this.dou_page*this.dou_size<this.dou_lineupList.length){this.dou_page++,this.status2="loading";var e=this.dou_lineupList.length>=this.dou_page*this.dou_size?this.dou_page*this.dou_size:this.dou_lineupList.length;this.dou_eachList=this.dou_eachList.concat(this.dou_lineupList.slice((this.dou_page-1)*this.dou_size,e)),this.updateDetail(1)}else this.status2="nomore"}};e.default=d}).call(this,i("543d")["default"])},d694:function(t,e,i){"use strict";var n=i("0139"),u=i.n(n);u.a},d9be:function(t,e,i){"use strict";(function(t){i("bbd9");n(i("66fd"));var e=n(i("1460"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(e.default)}).call(this,i("543d")["createPage"])},da10:function(t,e,i){"use strict";i.r(e);var n=i("a33c"),u=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=u.a}},[["d9be","common/runtime","common/vendor"]]]);