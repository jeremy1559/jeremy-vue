<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">用户注册</span>
      </div>
      <el-form
        :model="registerUser"
        :rules="rules"
        status-icon
        ref="registerForm"
        label-width="100px"
        class="registerForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="registerUser.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="registerUser.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpassword">
          <el-input type="password" v-model="registerUser.checkpassword" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="registerUser.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input type="text" v-model="registerUser.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCard">
          <el-input type="text" v-model="registerUser.idCard" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="eMail">
          <el-input type="text" v-model="registerUser.eMail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit_btn" type="primary" @click="submitForm('registerForm')">注册</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>
            <router-link to="/login">返回登陆页</router-link>
          </p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: "register",
  components: {},

  data() {
    //确认密码校验
    var validateCheckPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    //手机号校验
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[1|2|3|4|5|7|8|9][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };

    //数字校验
    var checkNumber = (rule, value, callback) => {
      if (value && value !== "") {
        let regEn = /^(\-|\+)?\d+(\.\d)?$/;
        if (!regEn.test(value)) {
          callback(new Error("请输入数字"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    //整数校验
    var checkInteger = (rule, value, callback) => {
      let regEn = /^[1-9]\d*$/;
      if (!regEn.test(value)) {
        callback(new Error("正整数"));
      } else {
        callback();
      }
    };

    //身份证号校验
    var checkIdCard = (rule, value, callback) => {
      if (
        value &&
        (!/\d{17}[\d|x]|\d{15}/.test(value) ||
          (value.length !== 15 && value.length !== 18))
      ) {
        callback(new Error("身份证号码不符合规范"));
      } else {
        callback();
      }
    };

    return {
      registerUser: {
        userName: "",
        account: "",
        password: "",
        checkpassword: "",
        sex: "",
        phone: "",
        idCard: "",
        eMail: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度2-10个字符", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 16, message: "长度6-16个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度6-16个字符", trigger: "blur" }
        ],
        checkpassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validateCheckPassword, trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: checkPhone,
            trigger: "blur"
          }
        ],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: checkIdCard, trigger: "blur" }
        ],
        eMail: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
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
          .post(this.$URL.registerUser.path, this.registerUser)
          .then(response => {
            if (response.data.status == "0000") {
              this.$message({
                message: "注册成功！",
                type: "success"
              });
              this.$router.push("/login");
            } else {
              this.$message({
                message: response.data.msg,
                type: "warning"
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      });
    }
  }
};
</script>

<style scoped>
.register {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/register_bg.jpg") no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 5%;
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
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
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
</style>

