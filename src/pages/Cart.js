import React, { Component, Fragment } from "react";
import { NavBar, Icon, Checkbox, SwipeAction, Modal } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  changeCheckState,
  changeAllCheckState,
  changeGoodNum,
  delCartGoods
} from "../store/actionCreator";
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  delCartGoods=(id)=>{
    alert("Delete", "Are you sure???", [
      { text: "Cancel", onPress: () =>{} },
      { text: "Ok", onPress: () => this.props.del_cart_goods(id) }
    ]);
  
  }
  render() {
    return (
      <Fragment>
        {/* 顶部导航栏 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          购物车
        </NavBar>
        {/* 购物车内容 */}
        <div className="cartContent">
          {this.props.cartList.map(val => {
            return (
              <div className="cartItem" key={val.id}>
                <SwipeAction
                  style={{ backgroundColor: "gray" }}
                  autoClose
                  right={[
                    {
                      text: "取消",
                      onPress: () => console.log("cancel"),
                      style: {
                        backgroundColor: "#ddd",
                        color: "white"
                      }
                    },
                    {
                      text: "删除",
                      onPress: () => this.delCartGoods(val.id),
                      style: {
                        backgroundColor: "#F4333C",
                        color: "white"
                      }
                    }
                  ]}
                >
                  <div className="goodInfo">
                    {/* 复选框 */}
                    <div className="checkItem">
                      <CheckboxItem
                        checked={val.ischecked}
                        onChange={() => this.props.change_check_state(val.id)}
                      />
                    </div>
                    <div className="goodImg">
                      <img src={val.img_url} />
                    </div>
                    <div className="goodcontext">
                      <div className="goodTilte">{val.title}</div>
                      <div className="goodPrice">￥ {val.sell_price}</div>
                    </div>
                    <span className="goodNum">
                      <span
                        className="iconfont icon-minus"
                        onClick={() =>
                          this.props.change_good_num(val.id, -1, val.num)
                        }
                      />
                      <span>{val.num}</span>
                      <span
                        className="iconfont icon-plus"
                        onClick={() => this.props.change_good_num(val.id, 1)}
                      />
                    </span>
                  </div>
                </SwipeAction>
              </div>
            );
          })}
          <style jsx>
            {`
              .cartContent {
                .goodInfo {
                  display: flex;
                  justify-content: center;
                  background: #fff;
                  .checkItem {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  .goodImg {
                    flex: 2;
                    padding: 5px;
                  }
                  .goodcontext {
                    flex: 3;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-content: center;
                    padding: 5px;
                    .goodTilte {
                      font-size: 16px;
                      font-weight: 600;
                    }
                    .goodPrice {
                      color: #f40;
                      font-size: 16px;
                      font-weight: 800;
                    }
                  }
                  .goodNum {
                    flex: 2;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    padding: 10px;
                    font-size: 16px;
                    .iconfont {
                      color: #666;
                      margin: 0 5px;
                    }
                  }
                }
              }
            `}
          </style>
        </div>
        {/* 购物车底部工具栏 */}
        <div className="cartToolBar">
          <div className="checkedAll">
            <CheckboxItem
              onChange={this.props.change_all_check}
              checked={this.props.checkedAll}
            >
              全选
            </CheckboxItem>
          </div>
          <div className="totalPrice">
            合计 <span className="">￥ {this.props.totalPrice}</span>
          </div>
          <div className="payItem">去结算({this.props.totalNum})</div>

          <style jsx>
            {`
              .cartToolBar {
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                bottom: 45px;
                width: 100%;
                background: #fff;
                .checkedAll {
                  flex: 1;
                }
                .totalPrice {
                  flex: 1;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  span {
                    color: #f40;
                  }
                }
                .payItem {
                  flex: 1;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: #fff;
                  background: #f40;
                  height: 40px;
                }
              }
            `}
          </style>
        </div>
      </Fragment>
    );
  }
}
//计算总商品数
const getTotalNum = arr => {
  var totalNum = 0;
  arr.forEach(val => {
    if (val.ischecked) {
      totalNum += val.num;
    }
  });
  return totalNum;
};
//计算总价格
const getTotalPrice = arr => {
  var totalPrice = 0;
  arr.forEach(val => {
    if (val.ischecked) {
      totalPrice += val.num * val.sell_price;
    }
  });
  return totalPrice;
};
//设置state与props的映射
const mapStateToProps = state => {
  return {
    cartList: state.CartReducer.cartList,
    totalNum: getTotalNum(state.CartReducer.cartList),
    totalPrice: getTotalPrice(state.CartReducer.cartList),
    //是否全选
    checkedAll:
      state.CartReducer.cartList.length &&
      state.CartReducer.cartList.every(val => val.ischecked)
  };
};
//设置dispatch的映射
const mapDispatch = dispatch => {
  return {
    change_check_state: id => {
      dispatch(changeCheckState(id));
    },
    change_all_check: e => {
      dispatch(changeAllCheckState(e.target.checked));
    },
    //更改商品数量
    change_good_num: (id, count, num) => {
      if (num === 1) {
        //确定是否删除
        alert("Delete", "Are you sure???", [
          { text: "Cancel", onPress: () => {} },
          { text: "Ok", onPress: () => dispatch(delCartGoods(id)) }
        ]);
          
      } else {
        dispatch(changeGoodNum(id, count));
      }
    },
    //根据id删除
    del_cart_goods:(id)=>{
      dispatch(delCartGoods(id))
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatch
)(withRouter(Cart));
