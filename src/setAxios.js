import axios from 'axios'
import store from './store'


export default function setAxios(){
	axios.interceptors.request.use(config=>{
		if(store.state.token){
			console.log(1);
			config.headers.token = store.state.token
		}else{
			config.headers.token = window.localStorage.getItem('rrtoken')
			store.commit('setToken',window.localStorage.getItem('rrtoken'))
		}
		return config
	})
}
