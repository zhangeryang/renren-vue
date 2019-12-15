<template>
  <div class="login">
    <el-row>
      <el-col :span="16">
        <div class="bck-img">
          <div class="text-center">
            <div class="title">RENREN-FAST-VUE</div>
            <div class="content">
              renren-fast-vue基于vue、element-ui构建开发，实现renren-fast后台管理前端功能，提供一套更优的前端解决方案。
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="form-info">
          <div class="form-center">
            <el-form ref="formInfo" :rules="rules" :model="formInfo">
              <el-form-item class="text">
                管理员登录
              </el-form-item>
              <el-form-item prop="username">
                <el-input placeholder="账号" v-model="formInfo.username"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="密码"   v-model="formInfo.password" ></el-input>
              </el-form-item>
              <el-form-item prop="captcha">
                <el-row :gutter="20">
                  <el-col :span="14">
                    <el-input   placeholder="验证码"   v-model="formInfo.captcha"  ></el-input>
                  </el-col>
                  <el-col :span="9"> 
                    <img class="imgsrc" :src="imgsrc" @click="changeImg()" /> 
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn" type="primary" @click="submit">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script> 
export default {
  data() {
    return {
      formInfo: {
        username: "",
        password: "",
        captcha: "",
        uuid:""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号！", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码！", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        captcha:[
          { required: true, message: "请输入验证码！", trigger: "blur" }
        ]
      },
      imgsrc: "", 
    };
  },
  methods: {
    async changeImg() {
      try {
        var uuid = new Date().getTime() + Math.floor(Math.random()*1000);
        this.formInfo.uuid = uuid
        // const result = await this.$http.get("http://182.61.35.138:8090/renren-fast/captcha.jpg",{params:{uuid:uuid}});
        // debugger
        this.imgsrc = "http://182.61.35.138:8090/renren-fast/captcha.jpg?uuid="+uuid;
      } catch (e) {
        console.log(e);
      }
    },
    submit(){ 
      this.$http.post("http://182.61.35.138:8090/renren-fast/sys/login",{ 
          'username':this.formInfo.username,  
          'password':this.formInfo.password,
          'captcha': this.formInfo.captcha,
          'uuid': this.formInfo.uuid  
        } 
      ).then(({data})=>{ 
        if(data.code == 0){
          this.$message({
            message: '恭喜你，登录成功！',
            type: 'success'
          });
          this.$router.replace({path:'/home'})
        }else{ 
          this.$message({
            message: data.msg,
            type: 'error'
          });
          this.changeImg();
        }
      })  
  },
 
  
  },
  created(){
    this.changeImg();
  }

}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
}
.el-row {
  height: 100%;
}
.el-col {
  height: 100%;
  border-radius: 4px;
}

.bck-img {
  height: 100%;
  width: 100%;
  background: url(../assets/img/login_bg.jpg);
  background-color: rgba(38, 50, 56, 0.6);
  background-size: cover;
  color: white;
  position: relative;

  .text-center {
    position: absolute;
    width: 70%;
    height: 200px;
    left: 50%;
    top: 50%;
    transform: translate(-50%) translateY(-50%);

    .title {
      margin: 0 auto;
      font-size: 50px;
    }

    .content {
      margin: 0 auto;
      color: #eee;
      margin-top: 20px;
    }
  }
}

.form-info {
  height: 100%;
  width: 100%;
  position: relative;

  .form-center {
    position: absolute;
    width: 80%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%) translateY(-50%);

    .text {
      margin-bottom: 0;
      font-weight: 700;
    }

    .login-btn {
      width: 100%;
    }

    .imgsrc{
        width:100%;
        height:100%; 
    }
    // .check-code { 
    //   height: 100%;
    //   margin-left: 20px;
      

    //   
    // }
  }
}
</style>
