<template>
	<div class="box">
		<el-input class="name-input" v-model="input" placeholder="用户名"></el-input>
		<el-button>查询</el-button>
		<el-button type="success" @click="dialogFormVisible = true">新增</el-button>
		<el-button type="danger" disabled>批量删除</el-button>
		<el-table :data="tableData" border>
			<el-table-column type="selection" width="50">
			</el-table-column>
			<el-table-column prop="userId" label="ID" width="100">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="150">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="150">
			</el-table-column>
			<el-table-column prop="mobile" label="手机号" width="150">
			</el-table-column>
			<el-table-column prop="status" label="状态" width="130">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.status==1" type="success">正常</el-tag>
					<el-tag v-else type="danger">异常</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" width="180">
			</el-table-column>
			<el-table-column prop="opreate" label="操作" width="150">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
					<el-button type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
		 :page-sizes="[10,20,50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>

		<el-dialog title="新增" :visible.sync="dialogFormVisible">
			<el-form ref="userForm" :model="userForm" :rules="rules">
				<el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
					<el-input v-model="userForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth" prop="password">
					<el-input type="password" v-model="userForm.password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" :label-width="formLabelWidth" prop="surepsd">
					<el-input type="password" v-model="userForm.surepsd" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
					<el-input v-model="userForm.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
					<el-input v-model="userForm.mobile" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色" :label-width="formLabelWidth"> 
				</el-form-item>
				<el-form-item label="状态" :label-width="formLabelWidth">
					<el-radio v-model="userForm.status" label="1">禁用</el-radio>
					<el-radio v-model="userForm.status" label="2">正常</el-radio>
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
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.userForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				tableData: null,
				input: '',
				total: '',
				pageSize: '',
				userForm:{
					name:'',
					password:'',
					surepsd:'',
					email:'',
					mobile:'',
					status:'2' 
				},
				formLabelWidth: '100px',
				dialogFormVisible: false,
				rules: {
						name: [{
							required: true,
							message: "请输入用户名！",
							trigger: "blur"
						}],
						password: [{
							required: true,
							message: "请输入密码！",
							trigger: "blur"
						}],
						surepsd: [{
							required: true,
							validator: validatePass2,
							trigger: "blur"
						}],
						email: [{
							required: true,
							message: "请输入邮箱！",
							trigger: "blur"
						}],
						mobile: [{
							required: true,
							message: "请输入手机号！",
							trigger: "blur"
						}]
					}
			}
		},
		methods: {
			async getUserList() {
				const result = await this.$http.get("http://182.61.35.138:8090/renren-fast/sys/user/list", {
					page: 1,
					limit: 10
				})
				if (result && result.data.code == 0) {
					this.tableData = result.data.page.list
					this.total = result.data.page.totalCount
					this.pageSize = result.data.page.pageSize
				}
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}
		},
		mounted() {
			this.getUserList()
		}
	}
</script>

<style scoped>
	.box {
		width: 100%;
		height: 100%;
		border: 1px solid #eee;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		padding: 20px;
	}

	.name-input {
		width: 200px;
		margin: 0 10px 20px 0;
	}

	.el-table th,
	.el-table td {
		text-align: center;
	}

	.el-pagination {
		margin-top: 20px;
		text-align: right;
	}
</style>
