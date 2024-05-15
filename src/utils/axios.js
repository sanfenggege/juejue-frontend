import axios from "axios";
import { Toast } from "zarm";

// MODE 是一个环境变量，通过 Vite 构建的项目中，环境变量在项目中，可以通过 import.meta.env.MODE 获取，环境变量的作用就是判断当前代码运行在开发环境还是生产环境。
const MODE = import.meta.env.MODE;

// need to do: http://api.chennick.wang need to change as self backend service
axios.defaults.baseURL = MODE === 'development' ? '/api' : 'http://api.chennick.wang';

// solve cross origin problem:
axios.defaults.withCredentials = true;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
// need to do: token saved when user login,this is same as backend authorization.
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// interceptors 为拦截器，拦截器的作用是帮你拦截每一次请求，你可以在回调函数中做一些“手脚”，再将数据 return 回去。
axios.interceptors.response.use(res => {
  console.log('axios.interceptors.response: ', res);
  if (typeof res.data !== 'object') {
    Toast.show({
      content: '服务器异常',
      duration: 2000,
    });
    return Promise.reject(res);
  }

  if (res.data.code !== 200) {
    console.log('code !== 200', res.data);
    if (res.data.msg) {
      Toast.show({
        content: res.data.msg,
        duration: 2000,
      });
    }

    if (res.data.code === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(res);
  }

  return res.data;
});

export default axios;