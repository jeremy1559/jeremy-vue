<template>
  <div class="register">
    <div class="manage_tip form_container">
      <span class="manage_tip">用户注册</span>
      <el-form
        :model="registerUser"
        :rules="rules"
        status-icon
        ref="registerForm"
        label-width="100px"
        class="demo-ruleForm"
      >
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
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
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
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[1|2|3|4|5|7|8|9][0-9]\d{8}$/
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
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
      let regEn = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!regEn.test(value)) {
        callback(new Error("请输入正确身份证"));
      } else {
        // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10
        // 下面分别分析出生日期和校验位
        let num = value.toUpperCase();
        let len, re;
        len = num.length;
        if (len === 15) {
          re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
          let arrSplit = num.match(re); // 检查生日日期是否正确
          let dtmBirth = new Date(
            "19" + arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]
          );
          let bGoodDay;
          bGoodDay =
            dtmBirth.getYear() === Number(arrSplit[2]) &&
            dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
            dtmBirth.getDate() === Number(arrSplit[4]);
          if (!bGoodDay) {
            callback(new Error("请输入正确身份证"));
          } else {
            // 将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10
            let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            let arrCh = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
            var nTemp = 0,
              i;
            num = num.substr(0, 6) + "19" + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
              nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            callback();
          }
        }
        if (len === 18) {
          re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
          let arrSplit = num.match(re); // 检查生日日期是否正确
          let dtmBirth = new Date(
            arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]
          );
          let bGoodDay;
          bGoodDay =
            dtmBirth.getFullYear() === Number(arrSplit[2]) &&
            dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
            dtmBirth.getDate() === Number(arrSplit[4]);
          if (!bGoodDay) {
            callback(new Error("请输入正确身份证"));
          } else {
            // 检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10
            let valnum;
            let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            let arrCh = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
            var nTemp = 0,
              i;
            for (i = 0; i < 17; i++) {
              nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (!isNaN(num.substr(17, 1))) {
              callback();
            }
            if (valnum !== num.substr(17, 1)) {
              callback(new Error("请输入正确身份证"));
            }
          }
        }
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
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: checkPhone,
            trigger: "blur"
          }
        ],
        idcard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: checkIdCard, trigger: "blur" }
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
       console.log(this.registerUser);
      

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

