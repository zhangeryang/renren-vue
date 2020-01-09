<template>
	<div class="box">
				<div class="content">
					<h3 class="title">项目介绍</h3>
					<ul>
						<li>renren-fast-vue基于vue、element-ui构建开发，实现renren-fast后台管理前端功能，提供一套更优的前端解决方案</li>
						<li>前后端分离，通过token进行数据交互，可独立部署</li>
						<li>主题定制，通过scss变量统一一站式定制</li>
						<li>动态菜单，通过菜单管理统一管理访问路由</li>
						<li>数据切换，通过mock配置对接口数据／mock模拟数据进行切换</li>
						<li>发布时，可动态配置CDN静态资源／切换新旧版本</li>
						<li>演示地址：<a href="http://demo.open.renren.io/renren-fast">http://demo.open.renren.io/renren-fast</a>(账号密码：admin/admin)</li>
					</ul>
					<h3 class="title">获取帮助</h3>
					<ul>
						<li>官方社区：<a href="https://www.renren.io/community">https://www.renren.io/community</a></li>
						<li>前端Git地址：<a href="https://www.renren.io/community">https://www.renren.io/community</a></li>
						<li>官方社区：<a href="https://www.renren.io/community">https://www.renren.io/community</a></li>
						<li>官方社区：<a href="https://www.renren.io/community">https://www.renren.io/community</a></li>
						<li>如需关注项目最新动态，请Watch、Star项目，同时也是对项目最好的支持</li> 
					</ul>
					<h3 class="title">官方QQ群</h3>
					<ul>
						<li>高级群：324780204(大牛云集，跟大牛学习新技能)</a></li>
						<li>普通群：145799952(学习交流，互相解答各种疑问)</a></li> 
					</ul>
				</div>
			</div>
</template>

<script>
</script>

<style scoped>
	.box{ 
		width:90%;
		height:100%; 
		padding: 20px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
	}
	
	.box h3{
		font-size:20px;
		margin:10px;
	}
	
	.box ul{
		margin:20px 40px;
		color:#303133;
		font-size:14px;
	}
	
	.box ul li a{
		text-decoration: none;
		color: #45c2b5;
	}
	
	.box ul li a:hover{
		text-decoration: underline;
	}
</style>
