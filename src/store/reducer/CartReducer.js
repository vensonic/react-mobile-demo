import {
  ADD_TO_CART,
  CHANGE_CHECK_STATE,
  CHANGE_ALL_CHECK,
  CHANGE_GOODS_NUM,
  DELET_CART_GOOD
} from "../actionType";
const defaultState = {
  cartList: [
    {
      id: 11,
      title: "大保健",
      sell_price: 998,
      img_url: "http://react.zbztb.cn//imgs/xc2lnMmHTbwa13s6QFrrOdmB.jpg",
      num: 1,
      ischecked: true
    },
    {
      id: 12,
      title: "大保健",
      sell_price: 998,
      img_url: "http://react.zbztb.cn//imgs/xc2lnMmHTbwa13s6QFrrOdmB.jpg",
      num: 1,
      ischecked: true
    }
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
              img_url: action.value.img_url,
              num: 1,
              ischecked: true
            };
            newState.cartList.push(temp);
        }
        return newState
    }
   if (action.type === CHANGE_CHECK_STATE) {
     let newState = JSON.parse(JSON.stringify(state))
     let index = newState.cartList.findIndex(val=>val.id === action.value.id)
     newState.cartList[index].ischecked = !newState.cartList[index]
       .ischecked;
       return newState;
   }
   if (action.type === CHANGE_ALL_CHECK){
     let newState = JSON.parse(JSON.stringify(state));
     newState.cartList.forEach(element => {
       element.ischecked = action.value.checkState;
     });
     return newState
   }
   if (action.type === CHANGE_GOODS_NUM) {
     let newState = JSON.parse(JSON.stringify(state))
      let index = newState.cartList.findIndex(val=>val.id === action.value.id)
      newState.cartList[index].num +=  action.value.count
      return newState;
   }
   if(action.type === DELET_CART_GOOD){
       let newState = JSON.parse(JSON.stringify(state))
        let index = newState.cartList.findIndex(
          val => val.id === action.value.id
        );
         newState.cartList.splice(index,1)
         return newState
   }
   return state;
};