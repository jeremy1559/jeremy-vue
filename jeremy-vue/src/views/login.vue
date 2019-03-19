<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">登陆系统</span>
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        class="loginForm"
        label-width="100px"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="loginUser.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="imagecode">
          <el-col :span="16">
            <el-input v-model="loginUser.imagecode" placeholder="请输入密码" type="password"></el-input>
          </el-col>
          <el-col :span="6">
            <img
              :src="imagecodeSrc"
              class="img"
              style="width:200%;heigth:200%"
              @click="getImageCode"
            >
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>还没有账号？现在
            <router-link to="/register">去注册</router-link>
          </p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginUser: {
        account: "",
        password: "",
        imagecode: ""
      },
      imagecodeSrc: "",
      deviceid: "",
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
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }

        this.$axios
          .post("/api/authorization/login/image_code", {
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
            } else {
              this.$message({
                message: response.data.msg,
                type: "warning"
              });
            }
          })
          .cache(error => {
            console.error(error);
          });
      });
    },

    getImageCode() {
      this.$axios
        .get("/api/authorization/get_image_code", {
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
    }
  },
  mounted() {
    if (this.deviceid == "" || this.deviceid == null) {
      this.$axios.get("/api/authorization/get_uuid").then(response => {
        this.deviceid = response.data.data;
        this.getImageCode();
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
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 60px 20px 20px;
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
</style>


