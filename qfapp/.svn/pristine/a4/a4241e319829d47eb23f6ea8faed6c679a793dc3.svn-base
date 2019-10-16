import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    //全局的状态
    is_weixin: "", //是否是微信内置浏览器
    is_android: "", //是否是安卓手机
    scroll_Obj: {}, //滚动的参数对象
    backTopNum: 100, //返回顶部的减少参数
    baseUrl: "http://mobile.520cai.cn",
    detail_id: "", //内容详情页的id
    game_detail_id: "", //游戏详情页id
    mdVal: "XU5OENFJXU2RTM4JXU2MjBGJXU2NTcwJXU2MzZFJ",
    footNavData: [{ //底部nav的数据;
            src: require("../imgs/index.png"),
            srcSelect: require("../imgs/indexSelect.png"),
            tit: "首页",
            href: "/index",
            className: "active"
        },
        {
            src: require("../imgs/game.png"),
            srcSelect: require("../imgs/gameSelect.png"),
            tit: "游戏",
            href: "/game",
            className: ""
        },
        {
            src: require("../imgs/news.png"),
            srcSelect: require("../imgs/newsSelect.png"),
            tit: "资讯",
            href: "/news",
            className: ""
        },
        {
            src: require("../imgs/mine.png"),
            srcSelect: require("../imgs/mineSelect.png"),
            tit: "个人",
            href: "/mine",
            className: ''
        }
    ],
    searchIptVal: "", //搜索框搜索的文字
    isLoginShow: true,
};
const getters = { //实时监听state值的变化(最新状态)
    is_weixin(state) {
        return state.is_weixin;
    },
    is_android(state) {
        return state.is_android;
    },
    footNavData(state) {
        return state.footNavData;
    },
    scroll_Obj(state) {
        return state.scroll_Obj;
    },
    back_top(state) {
        return state.scroll_Obj.scrollTop;
    },
    backTopNum(state) {
        return state.backTopNum;
    },
    baseUrl(state) {
        return state.baseUrl;
    },
    mdVal(state) {
        return state.mdVal;
    },
    detail_id(state) {
        return state.detail_id;
    },
    game_detail_id(state) {
        return state.game_detail_id;
    },
    searchIptVal(state) {
        return state.searchIptVal;
    },
    isLoginShow(state) {
        return state.isLoginShow;
    }
};
const mutations = {
    clearScrollType(state) { //
        state.scroll_Obj.scrollTop = 101;
    },
    loginSuccess(state) { //
        state.isLoginShow = false;
    },
    quiteLogin(state) { //
        state.isLoginShow = true;
    },
    is_weixin(state, type) { //
        state.is_weixin = type;
    },
    is_android(state, type) { //
        state.is_android = type;
    },
    scroll_Obj(state, scroll_Obj) { //
        state.scroll_Obj = scroll_Obj;
    },
    back_top(state, back_top) { //
        state.scroll_Obj.scrollTop = back_top;
    },
    detail_id(state, id) { //
        state.detail_id = id;
    },
    game_detail_id(state, id) { //
        state.game_detail_id = id;
    },
    searchIptVal(state, searchIptVal) { //
        state.searchIptVal = searchIptVal;
    },
    navActive(state, page) { //
        var foot_NavData = state.footNavData;
        // console.log(foot_NavData, page);
        for(let i = 0; i < foot_NavData.length; i++) {
            if(foot_NavData[i].href == page) {
                foot_NavData[i].className = 'active';
            } else {
                foot_NavData[i].className = '';
            }
        }
        // console.log(foot_NavData);
        state.footNavData = foot_NavData;
    },
};
const actions = {
    clearScrollType(context) { //
        context.commit('clearScrollType');
    },
    is_weixin(context, type) { //
        context.commit('is_weixin', type);
    },
    is_android(context, type) { //
        context.commit('is_android', type);
    },
    scroll_Obj(context, scroll_Obj) { //
        context.commit('scroll_Obj', scroll_Obj);
    },
    back_top(context, back_top) { //
        context.commit('back_top', back_top);
    },
    navActive(context, page) { //底部nav导航栏点击样式更改;
        context.commit('navActive', page);
    },
    detail_id(context, id) { //
        context.commit('detail_id', id);
    },
    game_detail_id(context, id) { //
        context.commit('game_detail_id', id);
    },
    searchIptVal(context, searchIptVal) {
        context.commit('searchIptVal', searchIptVal);
    },
    loginSuccess(context) {
        context.commit('loginSuccess');
    },
    quiteLogin(context) {
        context.commit('quiteLogin');
    }
};
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});