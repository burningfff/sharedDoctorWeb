import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'

const Register = resolve => require(['../components/Register/register.vue'], resolve)
const HelloWorld = resolve => require(['../components/HelloWorld.vue'], resolve)
const Login = resolve => require(['../components/Login/login.vue'], resolve)
const SuperUser = resolve => require(['../components/SuperUser/index.vue'], resolve)


Vue.use(Router)
Vue.use(Vuex)

const routes = [
  {
    path: '/',
    component: HelloWorld,
    name: 'HelloWorld'
  },
  {
    path: '/register',
    component: Register,
    name: 'register'
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  // {
  //   path: '/student/index',
  //   component: studentIndex,
  //   name: 'studentIndex'
  // },
  // {
  //   path: '/student/infopage',
  //   component: studentInfo,
  //   name: 'studentInfo'
  // },
  // {
  //   path: '/teacher/index',
  //   component: teacherIndex,
  //   name: 'teacherIndex'
  // },
  // {
  //   path: '/teacher/addOrder',
  //   component: addOrder,
  //   name: 'addOrder'
  // },
  // {
  //   path: '/student/info',
  //   component: changeSInfo,
  //   name: 'SInfo'
  // },
  // {
  //   path: '/teacher/info',
  //   component: changeTInfo,
  //   name: 'TInfo'
  // },
  {
    path: '/SuperUser/index',
    component: SuperUser,
    name: 'SuperUser'
  }

]

const router = new Router({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.fullPath === '/login') {
//     next()
//   }
//   else if(from.fullPath==='/login'){
//     next()
//   }
//   else if (LOCWIN.Cache.get('userName')) {
//     console.log(LOCWIN.Cache.get('userName'))
//     next()
//   } else {
//     next('/login')
//   }
// })

// router.afterEach(transition => {
//   setRouterParams(transition);
//   NProgress.done();
// });

export default router
