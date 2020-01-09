<template>
	<div class="home">
		<el-container style="height: 760px;">
			<el-aside :width="asideW">
				<div class="sys-name">人人快速开发平台</div>
				<el-menu default-active="1-4-1" class="el-menu-vertical-demo" router>
					<el-menu-item index="/index">
						<i class="el-icon-s-home"></i>
						<span slot="title">首页</span>
					</el-menu-item>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-star-off"></i>
							<span slot="title">demo</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/echarts">
								<i class="el-icon-s-data"></i>echarts
							</el-menu-item>
							<el-menu-item index="/ueditor">
								<i class="el-icon-edit"></i>ueditor
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3" v-for="(menuItem,index) in menuList" :key="index">
						<template slot="title"><i class="el-icon-setting"></i>
							<span slot="title">{{menuItem.name}}</span>
						</template>
						<el-menu-item-group> 
							<el-menu-item v-for="(listItem,index) in menuItem.list" 
								:index="listItem.url.startsWith('http')?'/sql':'/'+listItem.url">
								<i class="el-icon-user-solid"></i>
								{{listItem.name}}
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-container>
				<el-header style="text-align: right; font-size: 12px">
					<span class="switch">
						<i class="el-icon-menu" @click="collapse"></i>
					</span>
					<el-menu class="el-menu-demo" mode="horizontal">
						<el-menu-item index="1">
							<el-badge value="new" class="item">设置</el-badge>
						</el-menu-item>
						<el-menu-item index="2">
							<el-badge value="hot" class="item">官方社区</el-badge>
						</el-menu-item>
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
					<div width="200px" height="200px">
						<router-view />
					</div>
				</el-main>

			</el-container>
		</el-container>
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible">
			<el-form ref="formPwd" :model="formPwd" :rules="rules">
				<el-form-item label="账号" :label-width="formLabelWidth">{{userName}}</el-form-item>
				<el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPwd">
					<el-input type="password" v-model="formPwd.oldPwd" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码" :label-width="formLabelWidth" prop="newPwd">
					<el-input type="password" v-model="formPwd.newPwd" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmPwd">
					<el-input type="password" v-model="formPwd.confirmPwd" autocomplete="off"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="canclePwd">取 消</el-button>
				<el-button type="primary" @click="updatePwd">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.formPwd.newPwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				menuList: [],
				userName: '',
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
						validator: validatePass2,
						trigger: "blur"
					}]
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
			handleCommand(command) {
				if (command == "updatePwd") {
					this.dialogFormVisible = true
				} else if (command == "logout") {
					this.$router.replace({
						path: '/'
					})
					this.$store.commit("setToken", "")
					window.localStorage.removeItem("rrtoken")
				}

			},
			async getUserInfo() {
				const token = this.$store.state.token;
				console.log(token);
				const result = await this.$http.get('http://182.61.35.138:8090/renren-fast/sys/user/info')
				if (result) {
					console.log(result);
					this.userName = result.data.user.username
				}
			},
			updatePwd() {
				this.$http.post('http://182.61.35.138:8090/renren-fast/sys/user/password', {
					'password': this.formPwd.oldPwd,
					'newPassword': this.formPwd.newPwd
				}).then(({
					data
				}) => {
					if (data.code == 0) {
						this.$message({
							message: '修改成功！',
							type: 'success'
						});
						this.dialogFormVisible = false
					} else {
						this.$message({
							message: data.msg,
							type: 'error'
						});
					}
				})
			},
			canclePwd() {
				this.$refs['formPwd'].resetFields();
				this.dialogFormVisible = false
			},
			getMenuNav(){
				this.menuList =JSON.parse( window.localStorage.getItem('menuList'))
			}

		},
		created() {
			this.getUserInfo()
			this.getMenuNav()
			this.$router.replace({
				path: '/index'
			})
		}
	}
</script>


<style lang="less">
	.sys-name {
		width: 100%;
		height: 50px;
		background-color: #45c2b5;
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

	.el-menu-demo .el-menu-item {
		padding: 0 30px;
	}

	.item {
		.el-badge__content {
			top: 12px;
		}

	}
</style>
