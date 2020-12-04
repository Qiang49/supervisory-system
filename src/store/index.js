import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        // 未读消息
        noMessage: [{
                content: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护1",
                date: "2020-9-30 18:00",
                condition: "标为已读",
            },
            {
                content: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护2",
                date: "2020-9-30 18:00",
                condition: "标为已读",
            },
            {
                content: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护3",
                date: "2020-9-30 18:00",
                condition: "标为已读",
            },
        ],
        // 用户信息
        userInfo: {
            headSculpture: require('../assets/img/home/hei.jpg'),
            userName: 'admin',
            administrators: '超级管理员',
            loginTime: '2020-10-05',
            location: '成都',
            email: '1036811344@qq.com'
        },
        // 列表数据
        tableListdata: [{
            date: '2000-08-18 07:55',
            author: 'Jennlfer',
            importance: '★★★',
            type: 'success',
            statu: 'published',
            title: 'Hnrix Zwufvgu Kgknj Pclzfydme Wqfhovdf Eyxgqhyqx Cuqg Jkptrhccd Xanxsohuwb'
        }, {
            date: '2014-08-30 14:03',
            author: 'Jason',
            importance: '★★',
            type: 'success',
            statu: 'published',
            title: 'Ljeky Qiqcxuihj Cundifal Wmwtcduckp Gyujoc Nzqxohjm VIhpceys Cijxoxubx Wcpkwukk'
        }, {
            date: '1989-11-29 17:03',
            author: 'Bian',
            importance: '★★',
            type: 'info',
            statu: 'draft',
            title: 'Lippqge Wcuy Jelka Mlxtkj Tkjd Rqtzxcxyj Ceki Vghyfsj Kfomofx'
        }, ]
    },
    mutations: {
        changeLogin(state, user) {
            state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
        },
        // 修改用户头像
        holdPhoto(state, imageURL) {
            state.userInfo.headSculpture = imageURL
        },
        // 修改用户信息
        holdUserEdit(state, userinfo) {
            state.userInfo.userName = userinfo.name
            state.userInfo.email = userinfo.email
        },
        // 添加列表数据
        addTableListdata(state, tabledata) {
            state.tableListdata.push(tabledata)
        },
        // 修改列表数据
        editTableListdata(state, tabledata) {
            state.tableListdata[tabledata.index].author = tabledata.author
            state.tableListdata[tabledata.index].importance = tabledata.importance
            state.tableListdata[tabledata.index].title = tabledata.title
        },
    },
    actions: {},
    modules: {}
})