import { ADD_TO_CART, CHANGE_CHECK_STATE, CHANGE_ALL_CHECK, CHANGE_GOODS_NUM, DELET_CART_GOOD } from "../actionType";
/**
 * 添加商品到购物车
 * @param {Object} goodsInfo 
 */
export const addToCart=(goodsInfo)=>{
    const action = {
      type: ADD_TO_CART,
      value: goodsInfo
    };
    return action
}
/**
 * 修改购物车商品的选中状态
 * @param {number} id 
 */
export const changeCheckState = (id)=>{
  return {
    type:CHANGE_CHECK_STATE,
    value:{id}
  }
}
/**
 * 实现全选或全不选
 * @param {Boolean} checkState 
 */
export const changeAllCheckState = (checkState)=>{
  return {
    type: CHANGE_ALL_CHECK,
    value: { checkState }
  };
}
/**
 * 修改购物车中商品数量
 * @param {number} id 
 * @param {number} count 
 */
export const changeGoodNum = (id,count)=>{
  return {
    type:CHANGE_GOODS_NUM,
    value:{id,count}
  }
}
/**
 * 根据id删除购物车内商品
 * @param {number} id 
 */
export const delCartGoods = (id)=>{
  return {
    type:DELET_CART_GOOD,
    value:{id}
  }
}