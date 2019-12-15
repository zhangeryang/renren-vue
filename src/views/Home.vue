<template>
	<div class="home">
		<el-container style="height: 760px; border: 1px solid #eee">
			<el-aside width="230px">
				<div class="sys-name">人人快速开发平台</div>
				<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
					<el-menu-item index="4">
						<i class="el-icon-s-home"></i>
						<span slot="title">首页</span>
					</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-star-off"></i>demo</template>
						<el-menu-item-group>
							<el-menu-item index="2-1"><i class="el-icon-s-data"></i>echarts</el-menu-item>
							<el-menu-item index="2-2"><i class="el-icon-edit"></i>ueditor</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-setting"></i>系统管理</template>
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
					<span class="switch"><i class="el-icon-menu"></i></span>
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
							<el-dropdown>
								<div class="el-dropdown-link">
									<el-avatar :src="photoImg"></el-avatar>
									<span>admin</span>
								</div>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>修改密码</el-dropdown-item>
									<el-dropdown-item>退出</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</el-menu-item>
					</el-menu>
				</el-header>

				<el-main>
				</el-main>

			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				photoImg: require('../assets/img/headImg.jpg')
			}
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
