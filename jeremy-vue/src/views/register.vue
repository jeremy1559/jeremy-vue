<template>
    <div class="register">
            <div class="manage_tip form_container">
            <span class="manage_tip">用户注册</span>
                <el-form :model="registerUser" :rules="rules" status-icon ref="registerForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="用户名" prop="name">
                    <el-input type="text" v-model="registerUser.name" placeholder="请输入用户名"></el-input>
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
                      <el-radio label="男">男</el-radio>
                      <el-radio label="女">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                   <el-form-item label="联系电话" prop="phone">
                    <el-input type="text" v-model="registerUser.phone" placeholder="请输入联系电话"></el-input>
                  </el-form-item>
                   <el-form-item label="身份证号" prop="idcard">
                    <el-input type="text" v-model="registerUser.idcard" placeholder="请输入身份证号"></el-input>
                  </el-form-item>
                   <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                    <el-button class="submit_btn" type="primary" @click="submitForm('registerForm')">注册</el-button>
                  </el-form-item>
                </el-form>
            </div>
       
    </div>
</template>

<script>
export default {
  name: "register",
  components: {},

  data() {
    var validateCheckPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        account: "",
        password: "",
        checkpassword: "",
        sex: "",
        phone: "",
        idcard: "",
        email: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度2-10个字符", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, max: 16, message: "长度6-16个字符", trigger: "blur" }
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
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        idcard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { length: 18, message: "长度18个字符", trigger: "blur" }
        ],
        email: [
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
    submitForm(fromName) {
      this.$refs[fromName].validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }

        
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
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.title {
  font-size: 40px;
  color: #cccc;
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
</style>

