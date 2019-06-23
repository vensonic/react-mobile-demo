import { ADD_TO_CART } from "../actionType";

export const addToCart=(goodsInfo)=>{
    const action = {
      type: ADD_TO_CART,
      value: goodsInfo
    };
    return action
}