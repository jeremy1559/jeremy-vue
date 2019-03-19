import axios from 'axios';
import { Loading } from 'element-ui';

let loading;
function startLoding() {
    loading = Loading.service({
        lock: true,
        text: "拼命加载中...",
        background: 'rgba(0,0,0,0,0)'

    });
}

function endLoding() {
    loading.close();
}



/****** request拦截器==>对请求参数做处理 ******/
axios.interceptors.request.use(config => {
    startLoding();
    return config;
}, error => {
    endLoding();
    Promise.reject(error);
});


/****** respone拦截器==>对响应做处理 ******/
axios.interceptors.response.use(response => {
    endLoding();
    return response;
}, error => {
    endLoding();
    return Promise.reject(error)
});

export default axios;