<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">登陆系统</span>
      </div>

      <el-tabs v-model="defaultTabs">
        <el-tab-pane label="账号登陆" name="accountLogin">
          <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm">
            <el-form-item prop="account">
              <el-input v-model="loginUser.account" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginUser.password" placeholder="密码" type="password"></el-input>
            </el-form-item>
            <!-- <el-form-item prop="imagecode">
              <el-col :span="16">
                <el-input v-model="loginUser.imagecode" placeholder="验证码"></el-input>
              </el-col>
              <el-col :span="6">
                <img
                  :src="imagecodeSrc"
                  class="img"
                  style="width:50px;heigth:38px"
                  @click="getImageCode()"
                >
              </el-col>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
            </el-form-item>
            <div class="tiparea">
              <p>
                还没有账号？现在
                <router-link to="/register">去注册</router-link>
              </p>
            </div>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="手机登录" name="phoneLogin">
          <el-form
            :model="phoneLoginUser"
            :rules="phoneRules"
            ref="phoneLoginForm"
            class="loginForm"
          >
            <el-form-item prop="mobile">
              <el-input v-model="phoneLoginUser.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="smscode">
              <el-col :span="16">
                <el-input v-model="phoneLoginUser.smscode" placeholder="请输入短信验证码" type="password"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="success" @click="sendSms()" class="smsButton">发送短信</el-button>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="phoneSubmitForm('phoneLoginForm')"
                class="submit_btn"
              >登 录</el-button>
            </el-form-item>
            <div class="tiparea">
              <p>
                还没有账号？现在
                <router-link to="/register">去注册</router-link>
              </p>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      //默认选项卡
      defaultTabs: "accountLogin",

      //登陆用户
      loginUser: {
        account: "",
        password: "",
        imagecode: ""
      },
      //手机登陆用户
      phoneLoginUser: {
        mobile: "",
        smscode: ""
      },
      //图片验证码URL
      imagecodeSrc: "",
      //客户端唯一标识
      deviceid: "",
      //登陆参数校验
      rules: {
        account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度6-16个字符", trigger: "blur" }
        ],
        imagecode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度4个字符", trigger: "blur" }
        ]
      },
      phoneRules: {
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        smscode: [
          { required: true, message: "短信验证码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //账号密码登陆
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }

        this.$axios
          .post(this.$URL.imageCode.path, {
            account: this.loginUser.account,
            password: this.loginUser.password,
            imagecode: this.loginUser.imagecode,
            deviceid: this.deviceid
          })
          .then(response => {
            if (response.data.status == "0000") {
              this.$message({
                message: response.data.msg,
                type: "success"
              });
              console.info(response.data.data);
              this.saveUserSession(response.data.data);
               //跳转主页
              this.$router.push("/home");
            } else {
              this.$message({
                message: response.data.msg,
                type: "warning"
              });
            }
          });
      });
    },

    //获取图片验证码
    getImageCode() {
      this.$axios
        .get(this.$URL.getImageCode.path, {
          params: { deviceid: this.deviceid },
          responseType: "arraybuffer"
        })
        .then(response => {
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then(data => {
          this.imagecodeSrc = data;
        });
    },

    //短信登陆
    phoneSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        this.$axios
          .post(this.$URL.smsCode.path, {
            mobile: this.phoneLoginUser.mobile,
            smscode: this.phoneLoginUser.smscode,
            deviceid: this.deviceid
          })
          .then(response => {
            if (response.data.status == "0000") {
              this.$message({
                message: response.data.msg,
                type: "success"
              });
              console.info(response.data.data);
              this.saveUserSession(response.data.data);
               //跳转主页
              this.$router.push("/home");
            } else {
              this.$message({
                message: response.data.msg,
                type: "warning"
              });
            }
          });
      });
    },

    //获取短信验证码
    sendSms() {
      if (this.phoneLoginUser.mobile == "") {
        this.$message({
          message: "手机号不能为空",
          type: "warning"
        });
        return;
      }
      this.$axios
        .post(this.$URL.getSmsCode.path, {
          deviceid: this.deviceid,
          mobile: this.phoneLoginUser.mobile
        })
        .then(response => {
          if (response.data.status == "0000") {
            this.$message({
              message: "短信发送成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "短信发送失败",
              type: "warning"
            });
          }
        });
    },
    //向sessionStorage 中保存user信息
    saveUserSession(user) {
      let u ={};
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  },
  mounted() {
    if (this.deviceid == "" || this.deviceid == null) {
      //获取uuid当客户端id 并加载图片验证码
      this.$axios.get(this.$URL.uuid.path).then(response => {
        this.deviceid = response.data.data;
        //this.getImageCode();
      });
    }
  }
};
</script>

<style scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/2.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 0px;
  background-color: #fff;
  padding: 20px 20px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
.img {
  margin-left: 20px;
}
.smsButton {
  margin-left: 20px;
}
</style>


