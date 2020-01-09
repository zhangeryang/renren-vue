import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = new Vuex.Store({
	state: {
		token: "",
		userName:"",
		menuList:[]
	},
	mutations: {
		setToken(state, token) {
			state.token = token
		},
		setUserName(state,userName){
			state.userName = userName
		},
		setMenuList(state,menuList){
			state.menuList = menuList
		},
		addMenuRouter(state,routes){
			let currnentMenu =[{
				path: "/home",
				name: "home",
				meta: {
					required: true
				},
				component: () => import("../views/Home.vue"),
				children: [{
						path: "/index",
						name: "index",
						meta: {
							required: true
						},
						component: () => import("../views/index.vue")
					},
					{
						path: "/echarts",
						name: "echarts",
						meta: {
							required: true
						},
						component: () => import("../views/echarts.vue")
					},
					{
						path: "/ueditor",
						name: "ueditor",
						meta: {
							required: true
						},
						component: () => import("../views/ueditor.vue")
					}
				]
			}]
			// console.log(state.menuList);
			let menuList =JSON.parse( window.localStorage.getItem('menuList'))
			// debugger
			menuList.forEach(item =>{
				if(item.list){
					item.list = item.list.map(mapItem=>{
						if(mapItem.url.startsWith('http')){
							let ii = {
								path: "/sql",
								name: "sql",
								meta: {
									required: true
								},
								component: () => import("../views/sqlMonitor.vue")
							}
							return ii;
						}else{
							let i =  {
								path: `${mapItem.url.startsWith('/')?mapItem.url:'/'+mapItem.url}`,
								name: `${mapItem.url.replace('/','-')}`,
								meta: {
									required: true
								},
								component: () => import(`../views/${mapItem.url}.vue`)
							}
							return i;
						}
						
					})
					currnentMenu[0].children.push(...item.list)
				}else{
					let aa = {
						path: `${item.url.startsWith('/')?item.url:'/'+item.url}`,
						name: `${item.url.replace('/','-')}`,
						meta: {
							required: true
						},
						component: () => import(`../views/${item.url.substring(1)}.vue`)
					}
					currnentMenu[0].children.push(aa)
				}
				
			})
			
			
			console.log(currnentMenu,'cur')
			
			routes.addRoutes(currnentMenu)
			
			
		}
	},
	actions: {},
	modules: {}
});


export default store
