//路由鉴权，项目当中路由能不能被访问的权限的设置(某个路由什么条件下可以被访问，什么条件下不能被访问)
import router from '@/router/index'
import setting from './setting';
import nprogress from 'nprogress'
//引入进度条样式
import '../node_modules/nprogress/nprogress.css'
nprogress.configure({ showSpinner: false });//加载时右侧的小圆球不要
//获取用户相关的小仓库内部的token,判断用户是否登陆成功
import useUserStore from './store/modules/user'
import pinia from './store' //在组件外部用仓库得引入大仓库
let userStore = useUserStore(pinia)
//全局守卫：项目中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to, from, next) => {
    document.title = `${setting.title}-${to.meta.title}`//上面的标题
    //访问某个路由之前的守卫
    //to:将要访问哪个路由
    //from:从哪个路由而来
    //next：路由的放行函数
    nprogress.start()
    //获取token,判断用户登陆还是未登录
    let token = userStore.token
    //获取用户的名字
    let username = userStore.username
    if (token) {
        //用户登录成功,访问login不能访问，指向首页
        if (to.path == '/logon') {
            next({ path: '/' })
        } else {
            //登陆成功其余六个路由(登录排除)
            //有用户信息放行
            if (username) {
                next()
            } else {
                //没有用户信息，在守卫发请求获取用户信息再放行
                try {
                    //获取用户信息
                    await userStore.userInfo()
                    next()
                } catch (error) {
                    //token过期：获取不到用户信息
                    //用户手动修改本地存储token
                    //退出登录->把用户相关的信息数据清空
                    await userStore.Logout()
                    next({ path: '/', query: { redirect: to.path } })//过期后保留页面，下次登录可直接到本页面
                }
            }
        }
    } else {
        //用户未登录
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })//想访问却没访问的用query带上
        }
    }
})
//全局后置守卫
router.afterEach((to, from) => {
    nprogress.done()
})




//第一个问题：任意路由切换实现进度条---nprogress
//第二个问题：路由鉴权(路由组件访问权限的设置)
//全部路由组件：登录|404|任意组件|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)

//用户未登录：可访问login,其余六个不能访问(指向login)
//用户登录成功：不可访问login[指向首页],其余路由可以访问