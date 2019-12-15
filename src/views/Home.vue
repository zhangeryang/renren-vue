<template>
	<div class="home">
		<el-container style="height: 760px; border: 1px solid #eee">
			<el-aside :width="asideW">
				<div class="sys-name">人人快速开发平台</div>
				<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="iscollapse">
					<el-menu-item index="1">
						<i class="el-icon-s-home"></i>
						<span slot="title">首页</span>
					</el-menu-item>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-star-off"></i>
							<span slot="title">demo</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="2-1"><i class="el-icon-s-data"></i>echarts</el-menu-item>
							<el-menu-item index="2-2"><i class="el-icon-edit"></i>ueditor</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-setting"></i>
							<span slot="title">系统管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="3-1"><i class="el-icon-user-solid"></i>管理员列表</el-menu-item>
							<el-menu-item index="3-2"><i class="el-icon-time"></i>角色管理</el-menu-item>
							<el-menu-item index="3-3"><i class="el-icon-time"></i>菜单管理</el-menu-item>
							<el-menu-item index="3-4"><i class="el-icon-time"></i>SQL监控</el-menu-item>
							<el-menu-item index="3-5"><i class="el-icon-time"></i>定时任务</el-menu-item>
							<el-menu-item index="3-6"><i class="el-icon-time"></i>参数管理</el-menu-item>
							<el-menu-item index="3-7"><i class="el-icon-upload"></i>文件上传</el-menu-item>
							<el-menu-item index="3-8"><i class="el-icon-time"></i>系统日志</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-container>
				<el-header style="text-align: right; font-size: 12px">
					<span class="switch">
						<i class="el-icon-menu" @click="collapse"></i>
					</span>
					<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
						<el-menu-item index="1">设置</el-menu-item>
						<el-menu-item index="2">官方社区</el-menu-item>
						<el-submenu index="3">
							<template slot="title">Git源码</template>
							<el-menu-item index="2-1">前端</el-menu-item>
							<el-menu-item index="2-2">后台</el-menu-item>
							<el-menu-item index="2-3">代码生成器</el-menu-item>
						</el-submenu>
						<el-menu-item index="4">
							<el-dropdown @command="handleCommand">
								<div class="el-dropdown-link">
									<el-avatar :src="photoImg"></el-avatar>
									<span>{{userName}}</span>
								</div>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
									<el-dropdown-item command="logout">退出</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</el-menu-item>
					</el-menu>
				</el-header>

				<el-main>
				</el-main>

			</el-container>
		</el-container>
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible">
			<el-form ref="formPwd" :model="formPwd" :rules="rules">
				<el-form-item label="账号" :label-width="formLabelWidth">{{userName}}</el-form-item>
				<el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPwd">
					<el-input v-model="formPwd.oldPwd" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码" :label-width="formLabelWidth" prop="newPwd">
					<el-input v-model="formPwd.newPwd" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmPwd">
					<el-input v-model="formPwd.confirmPwd" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userName:'',
				photoImg: require('../assets/img/headImg.jpg'),
				iscollapse: false,
				asideW: '230px',
				dialogFormVisible: false,
				formLabelWidth: '100px',
				formPwd: {
					oldPwd: "",
					newPwd: "",
					confirmPwd: "" 
				},
				rules: {
					oldPwd: [{
							required: true,
							message: "请输入原密码！",
							trigger: "blur"
						},
						{
							min: 5,
							max: 10,
							message: "长度在 5 到 10 个字符",
							trigger: "blur"
						}
					],
					newPwd: [{
							required: true,
							message: "请输入新密码！",
							trigger: "blur"
						},
						{
							min: 5,
							max: 10,
							message: "长度在 5 到 10 个字符",
							trigger: "blur"
						}
					],
					confirmPwd: [{
							required: true,
							message: "请确认密码！",
							trigger: "blur"
						},
						{
							equalTo: "newPwd"
						}
					]
				}
			}
		},
		methods: {
			collapse() {
				this.iscollapse = !this.iscollapse
				if (!this.iscollapse) {
					this.asideW = "230px"
				} else {
					this.asideW = "80px"
				}
			},
			handleCommand(command){ 
				if(command == "updatePwd"){
					this.dialogFormVisible = true 
				}else if(command == "logout"){
					this.$router.replace({path:'/'})
					this.$store.commit("setToken","")
					window.localStorage.removeItem("rrtoken")
				}
				
			},
			async getUserInfo(){ 
				debugger
				const token =  this.$store.state.token;
				console.log(token);
				const result = await this.$http.get('http://182.61.35.138:8090/renren-fast/sys/user/info',{params:{token:token}})
				if(result){
					console.log(result);
					this.userName = result.data.user.username 
				}
			}
		},
		created(){
			this.getUserInfo()
		}
	}
</script>


<style lang="less">
	.sys-name {
		width: 100%;
		height: 50px;
		background-color: #008000;
		text-align: center;
		line-height: 50px;
		font-weight: bold;
		font-size: 20px;
		color: #fff;
		overflow: hidden;
	}

	.el-aside,
	.el-menu-vertical-demo,
	.el-aside .el-menu {
		background-color: #263238;
		border: none;
	}


	.el-submenu__title,
	.el-aside .el-menu-item :hover {
		color: #F5F5F5
	}

	.el-submenu__title,
	.el-menu-item {
		color: #8a979e;
	}

	.el-container .el-header .el-menu {
		float: right;
	}

	.switch {
		font-size: 20px;
		line-height: 60px;
		float: left;
	}
</style>
