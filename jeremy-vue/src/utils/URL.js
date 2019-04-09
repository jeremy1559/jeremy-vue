export default {
  uuid: { path: "/api/authorization/get_uuid", desc: "获取UUID" },
  getImageCode: { path: "/api/authorization/get_image_code", desc: "获取图片验证码" },
  imageCode: { path: "/api/authorization/login/image_code", desc: "验证码登录" },
  getSmsCode: { path: "/api/authorization/get_sms_code", desc: "获取短信验证码" },
  smsCode: { path: "/api/authorization/login/sms_code", desc: "短信登陆" },
  registerUser: { path:  "/api/authorization/registerUser", desc: "注册用户" },

 

}