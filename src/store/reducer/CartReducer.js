import { ADD_TO_CART } from "../actionType";
const defaultState = {
  cartList: [
  ]
};
export default (state = defaultState, action) => {
// console.log(action);
    if (action.type === ADD_TO_CART) {
        let newState = JSON.parse(JSON.stringify(state))
        let index = newState.cartList.findIndex(
          val => val.id === action.value.id
        );
        if(index!==-1){
         newState.cartList[index].num++;
        }else{    
            let temp = {
              id: action.value.id,
              title: action.value.title,
              sell_price: action.value.sell_price,
              img_url: action.value.sell_price,
              num: 1,
              ischecked: true
            };
            newState.cartList.push(temp);
        }
        return newState
    }
    return state;
};