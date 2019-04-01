import axios from 'axios';
import { Loading, MessageBox } from 'element-ui';
import store from '../store'
import jwtDecode from 'jwt-decode'


/*是否有请求正在刷新token*/
window.isRefreshing = false;
/*被挂起的请求数组*/
let refreshSubscribers = [];
//遮罩
let loading;
/***********打开遮罩*****************/
function startLoding() {
    loading = Loading.service({
        lock: true,
        text: "拼命加载中...",
        background: 'rgba(0,0,0,0,0)'

    });
}
/**********关闭遮罩*****************/
function endLoding() {
    loading.close();
}

/*获取refreshToken*/
function getRefreshToken() {
    return store.getters.refreshToken;
}

/*获取accessToken*/
function getAccessToken() {
    return store.getters.accessToken;
}

/*判断accessToken是否过期*/
function isAccessTokenExpired(times) {

    /*从localStorage中取出token过期时间*/
    let expiredTime = new Date(jwtDecode(getAccessToken()).outTime).getTime();
    /*获取本地时间*/
    let nowTime = new Date().getTime();
    /*返回是否过期*/
    return expiredTime - nowTime <= times;
}
/*判断refreshToken是否过期*/
function isRefreshTokenExpired(times) {
    /*从localStorage中取出token过期时间*/
    let expiredTime = new Date(jwtDecode(getRefreshToken()).outTime).getTime();
    /*获取本地时间*/
    let nowTime = new Date().getTime();
    /*返回是否过期*/
    return expiredTime - nowTime <= times;
}
/*push所有请求到数组中*/
function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb)
}
/*********执行数组中的请求***********/
function onRrefreshed(token) {
    refreshSubscribers.map(cb => cb(token))
}


/****** request拦截器==>对请求参数做处理 ******/
axios.interceptors.request.use(config => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    //判断 accessToken 是否存在
    if (accessToken) {
        //在请求头中添加token类型、token
        config.headers.token = accessToken;
        //如果刷新token不存在或者刷新token过期
        if (!refreshToken || isRefreshTokenExpired(0)) {
            MessageBox.confirm('登陆超时请重新登陆', '登陆提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //确定
                this.$store.commit("removeUser");
                window.location.href = '/login'
                return;
            }).catch(() => {
                //取消
                return;
            });
        }
        //判断accessToken是否将要过期或者已经过期
        if (isAccessTokenExpired(1000 * 60)) {

            /*把请求(token)=>{....}都push到一个数组中*/
            let retry = new Promise((resolve, reject) => {
                /*(token) => {...}这个函数就是回调函数*/
                subscribeTokenRefresh((token) => {
                    config.headers.token = token;
                    /*将请求挂起*/
                    resolve(config)
                })
            })
            debugger;
            //是否已经在刷新token
            if (!window.isRefreshing) {
                isRefreshing = true;
                this.$axios.post("/api/authorization/refreshToken", {
                    refreshToken: getRefreshToken(),
                }).then(response => {
                    if (response.data.status == '0000') {
                        //保存新 token 到 vuex中
                        this.saveUserVuexStore(response.data.data);
                        /*执行数组里的函数,重新发起被挂起的请求*/
                        onRrefreshed(response.data.data.accessToken)
                    } else {
                        MessageBox.confirm('登陆超时请重新登陆', '登陆提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //确定
                            this.$store.commit("removeUser");
                            window.location.href = '/login'
                            return;
                        }).catch(() => {
                            //取消
                            return;
                        });
                    }
                    window.isRefreshing = false;
                    //清空执行方法的数组
                    refreshSubscribers = [];

                }).cache(error => {
                    window.isRefreshing = false;
                    refreshSubscribers = [];
                    this.$store.commit("removeUser");
                    window.location.href = '/login'
                    console.log(error);
                });

            }
            return retry
        }
        return config;
    }

    return config;
}, error => {
    console.log(error);
    return error;
});


/****** respone拦截器==>对响应做处理 ******/
axios.interceptors.response.use(response => {
    return response;
}, error => {
    return error;
});

export default axios;