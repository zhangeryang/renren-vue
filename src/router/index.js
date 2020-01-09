import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import store from "../store";
import axios from "axios";

Vue.use(VueRouter);

const routes = [{
		path: "/",
		name: "login",
		component: Login
		}
// 	},
// 	// {
// 	// 	path: "/home",
// 	// 	name: "home",
// 	// 	redirect: '/home'
// 	// },
// 	{
// 		path: "/home",
// 		name: "home",
// 		// meta: {
// 		// 	required: true
// 		// },
// 		component: () => import("../views/Home.vue"),
// 		children: [{
// 				path: "/index",
// 				name: "index",
// 				meta: {
// 					required: true
// 				},
// 				component: () => import("../views/index.vue")
// 			},
// 			{
// 				path: "/sys/sys/echarts",
// 				name: "echarts",
// 				meta: {
// 					required: true
// 				},
// 				component: () => import("../views/echarts.vue")
// 			},
// 			{
// 				path: "/ueditor",
// 				name: "ueditor",
// 				meta: {
// 					required: true
// 				},
// 				component: () => import("../views/ueditor.vue")
// 			}
// 		]
// 	}
// 
];

const router = new VueRouter({
	routes
});



// 
// router.beforeEach((to, from, next) => {
// 	// console.log(1)
// 	store.commit('setToken', window.localStorage.getItem('rrtoken'));
// 	debugger
// 	if (to.meta.required) {
// 		if (store.state.token) {
// 			if (to.path === '/home' || to.path === '/index') {
// 				addDynamicMenuAndRoutes(to, from)
// 			}
// 			next();
// 		} else {
// 			next("/login")
// 			// next({
// 			// 	path: '/login'
// 			// 	// query: {
// 			// 	// 	redirect: to.fullPath
// 			// 	// }
// 			// })
// 		}
// 	} else {
// 		next()
// 	}
// 
// })
// 
// 
// function addDynamicMenuAndRoutes(to, from) {
// 	debugger
// 	// 处理IFrame嵌套页面
// 	// handleIFrameUrl(to.path)
// 	//获取动态菜单
// 
// 	axios.get('http://182.61.35.138:8090/renren-fast/sys/menu/nav').then(result => {
// 		if (result && result.data.code == 0) {
// 	
// 			const menuList = result.data.menuList;
// 			let dynamicRoutes = fnAddDynamicMenuRoutes(menuList);
// 			// // 处理静态组件绑定路由
// 			// debugger
// 			// // handleStaticComponent(router, dynamicRoutes)
// 			// router.addRoutes(dynamicRoutes)
// 			// console.log(router)
// 		}
// 	});
// 
// 	// // 保存加载状态
// 	// store.commit('menuRouteLoaded', true)
// 	// // 保存菜单树
// 	// store.commit('setNavTree', res.data)
// 
// }
// 
// function getMenuNav() {
// 
// 
// }
// 
// function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
// 	var temp = []
// 	for (var i = 0; i < menuList.length; i++) {
// 	  if (menuList[i].list && menuList[i].list.length >= 1) {
// 	    temp = temp.concat(menuList[i].list)
// 	  } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
// 	    menuList[i].url = menuList[i].url.replace(/^\//, '')
// 	    var route = {
// 	      path: menuList[i].url.replace('/', '-'),
// 	      component: null,
// 	      name: menuList[i].url.replace('/', '-'),
// 	      meta: {
// 	        menuId: menuList[i].menuId,
// 	        title: menuList[i].name,
// 	        isDynamic: true,
// 	        isTab: true,
// 	        iframeUrl: ''
// 	      }
// 	    }
// 	    // url以http[s]://开头, 通过iframe展示
// 	    // if (isURL(menuList[i].url)) {
// 	    //   route['path'] = `i-${menuList[i].menuId}`
// 	    //   route['name'] = `i-${menuList[i].menuId}`
// 	    //   route['meta']['iframeUrl'] = menuList[i].url
// 	    // } else {
// 	    //   try {
// 	    //     route['component'] = _import(`modules/${menuList[i].url}`) || null
// 	    //   } catch (e) {}
// 	    // }
// 	    routes.push(route)
// 	  }
// 	}
// 	if (temp.length >= 1) {
// 	  fnAddDynamicMenuRoutes(temp, routes)
// 	} else {
// 	  mainRoutes.name = 'main-dynamic'
// 	  mainRoutes.children = routes
// 	  router.addRoutes([
// 	    mainRoutes,
// 	    { path: '*', redirect: { name: '404' } }
// 	  ])
// 	  sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
// 	  console.log('\n')
// 	  console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
// 	  console.log(mainRoutes.children)
// 	  console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
// 	}
// }
// 


export default router;