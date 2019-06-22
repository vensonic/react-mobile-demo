import axios from 'axios';
//设置baseUrl
axios.defaults.baseURL = "http://react.zbztb.cn/site/"
//添加响应拦截器,优化响应数据
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
//获取首页所有商品
export const getGoods = ()=>{
    return axios.get("goods/gettopdata/goods")
}
//获取商品分类列表
export const getGoodsGroup = () => {
         return axios.get("goods/getgoodsgroup");
       };