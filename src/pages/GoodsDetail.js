import React, { Component, Fragment } from "react";
import { NavBar, Icon, Carousel, Badge } from "antd-mobile";
import { getGoodsInfoById } from "../api";
import { connect } from "react-redux";
import { addToCart } from "../store/actionCreator";
//轮播图组件
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgHeight: 176
    };
  }
  render() {
    return (
      <Fragment>
        <Carousel autoplay infinite>
          {this.props.imgList.map(val => (
            <a
              key={val.id}
              href="javascript:;"
              style={{
                display: "inline-block",
                width: "100%",
                height: this.state.imgHeight
              }}
            >
              <img
                src={val.thumb_path}
                alt=""
                style={{ width: "100%", verticalAlign: "top" }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event("resize"));
                  this.setState({ imgHeight: "auto" });
                }}
              />
            </a>
          ))}
        </Carousel>
      </Fragment>
    );
  }
}

class GoodsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsInfo: {},
      imgList: []
    };
  }
  componentDidMount() {
    getGoodsInfoById(this.props.match.params.id).then(res => {
      // console.log(res);
      if (res.status === 0) {
        this.setState({
          goodsInfo: res.message.goodsinfo,
          imgList: res.message.imglist
        });
      }
    });
  }

  render() {
    return (
      <Fragment>
        {/* 顶部导航栏开始 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          商品详情
        </NavBar>
        {/* 顶部导航栏结束 */}
        {/* 商品轮播图开始 */}
        {this.state.imgList.length ? (
          <Slider imgList={this.state.imgList} />
        ) : null}
        {/* 商品轮播图结束 */}
        {/* 商品信息开始 */}
        <div className="goodsInfo">
          <div className="title">{this.state.goodsInfo.title}</div>
          <div className="sub_title">{this.state.goodsInfo.sub_title}</div>
          <div className="goodsprice">
            <span className="sell_price">
              ￥{this.state.goodsInfo.sell_price}
            </span>
            <span className="market_price">
              ￥{this.state.goodsInfo.market_price}
            </span>
          </div>
          <div className="goodParmas">商品参数</div>
          <div className="goods_no">
            商品编号: {this.state.goodsInfo.goods_no}
          </div>
          <div className="stock_quantity">
            库存: {this.state.goodsInfo.stock_quantity}
          </div>
          <div className="add_time">
            上架时间: {this.state.goodsInfo.add_time}
          </div>
          <div
            className="goodsIntroduce"
            dangerouslySetInnerHTML={{
              __html: this.state.goodsInfo.content
            }}
          />
          <div className="bottomBar">
            <div className="contract">
              <span className="iconfont icon-kefu" />
              <span>客服</span>
            </div>
            <div
              className="goodsCart"
              onClick={() => this.props.history.push("/Cart")}
            >
              <Badge
                text={this.props.cartListLength}
                style={{ background: "red" }}
              >
                <span className="iconfont icon-gouwuche" />
              </Badge>
              <span>购物车</span>
            </div>
            <div
              className="addCart"
              onClick={() => this.props.add_to_cart(this.state.goodsInfo)}
            >
              加入购物车
            </div>
            <div className="purchase">立即购买</div>
          </div>
          <style jsx>
            {`
              .goodsInfo {
                margin-top: 10px;
                padding: 0 10px;
                .title {
                  font-size: 16px;
                  font-weight: 800;
                }
                .sub_title {
                  margin-top: 5px;
                  font-size: 14px;
                  color: #333;
                }
                .goodsprice {
                  margin-top: 5px;
                  .sell_price {
                    font-size: 16px;
                    font-weight: 800;
                    color: red;
                  }
                  .market_price {
                    margin-left: 5px;
                    text-decoration: line-through;
                  }
                }
                .goodParmas {
                  margin-top: 5px;
                  font-size: 16px;
                  font-weight: 800;
                }
                .goods_no {
                  margin-top: 5px;
                }
                .stock_quantity {
                  margin-top: 5px;
                }
                .add_time {
                  margin-top: 5px;
                }
                .goodsIntroduce {
                  margin-top: 5px;
                  margin-bottom: 50px;
                }
                .bottomBar {
                  display: flex;
                  justify-content: space-around;
                  position: fixed;
                  left: 0;
                  bottom: 0;
                  height: 40px;
                  width: 100%;
                  background: #fff;
                  .contract {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    flex: 2;
                    font-size: 12px;
                  }
                  .goodsCart {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    flex: 2;
                    font-size: 12px;
                  }
                  .addCart {
                    flex: 3;
                    font-size: 18px;
                    color: #fff;
                    background: #ff976a;
                    text-align: center;
                    line-height: 40px;
                  }
                  .purchase {
                    flex: 3;
                    font-size: 18px;
                    color: #fff;
                    background: #ff4444;
                    text-align: center;
                    line-height: 40px;
                  }
                }
              }
            `}
          </style>
        </div>
        {/* 商品信息结束 */}
      </Fragment>
    );
  }
}
//设置state和props的映射
const mapStateToProp = state => {
  return {
    cartListLength: state.CartReducer.cartList.length
  };
};
//设置dispatch映射
const mapDispatch = dispatch => {
  return {
    add_to_cart: goodsinfo => {
      dispatch(addToCart(goodsinfo));
    }
  };
};

export default connect(
  mapStateToProp,
  mapDispatch
)(GoodsDetail);
