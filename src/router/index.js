import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/Login'
import Home from '../views/home/Home'
// 首页
import Users from '../views/home/user/Users'
// tab选项卡
import TabControl from '../views/tabControl/TabControl'
// 创建文章
import CreateArticles from '../views/articleManagement/CreateArticles'
// 文章列表
import ArticleList from '../views/articleManagement/ArticleList'
// 表格管理
import Table from '../views/table/Table'
// 错误处理401
import Unauthorized from '../views/errorHandling/Unauthorized'
// 错误处理404
import NotFound from '../views/errorHandling/NotFound'
// 个人信息
import ProsonalInformation from '../views/Prosonal/ProsonalInformation'
// 退出登录
import LogOff from '../views/Prosonal/LogOff'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        redirect: '/Users',
        children: [
            // 首页
            {
                path: '/Users',
                component: Users,
                name: '首页',
            },
            // tab选项卡
            {
                path: '/TabControl',
                component: TabControl,
                name: 'tab选项卡',
            },
            // 表格管理
            {
                path: '/Table',
                component: Table,
                name: '表格管理',
            },
            // 创建文章
            {
                path: '/CreateArticles',
                component: CreateArticles,
                name: '创建文章',
            },
            // 文章列表
            {
                path: '/ArticleList',
                component: ArticleList,
                name: '文章列表',
            },
            // 401页面
            {
                path: '/Unauthorized',
                component: Unauthorized,
                name: '401页面',
            },
            // 404页面
            {
                path: '/NotFound',
                component: NotFound,
                name: '404页面',
            },
            //个人信息
            {
                path: '/ProsonalInformation',
                component: ProsonalInformation,
                name: '个人信息',
            },
            // 退出登录
            {
                path: '/LogOff',
                component: LogOff,
                name: '退出登录',
            }

        ]
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('Authorization')

        if (!token) {
            next('/login');
        } else {
            next();
        }
    }
});

export default router