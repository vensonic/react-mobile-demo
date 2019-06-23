import React, { Component, Fragment } from "react";
import { getGoods, getGoodsGroup } from "../api";
import { Carousel, List, Grid } from "antd-mobile";
//引入withrouter,解决没哟传入props问题
import { withRouter } from 'react-router-dom';
const Item = List.Item;
//轮播图组件
class Slider extends Component {
  state = {
    imgHeight: 176
  };
  render() {
    return (
      <Fragment>
        <Carousel autoplay infinite>
          {this.props.sliderlist.map(val => (
            <a
              key={val.id}
              href="javascrip:;"
              onClick={()=>this.props.history.push(`/goodsDetail/${val.id}`)}
              style={{
                display: "inline-block",
                width: "100%",
                height: this.state.imgHeight
              }}
            >
              <img
                src={val.img_url}
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderlist: [],
      imgHeight: 176,
      toplist: [],
      catelist: []
    };
  }
  componentDidMount() {
    //获取商品
    getGoods().then(res => {
      // console.log(res.message);
      if (res.status === 0) {
        this.setState({
          sliderlist: res.message.sliderlist,
          toplist: res.message.toplist
        });
      }
    });
    //获取商品分类目录
    getGoodsGroup().then(res => {
    //   console.log(res);
      if (res.status === 0) {
        this.setState({ catelist: res.message });
      }
    });
  }
  //点击宫格的回调函数
  goodsInfo = (el) => {
    // console.log(el, index);
    this.props.history.push(`/goodsDetail/${el.id}`)
  };
  render() {
    
    return (
      <div className="home">
        {/* 轮播图开始 */}
        {this.state.sliderlist.length ? (
          <Slider sliderlist={this.state.sliderlist} {...this.props} />
        ) : null}
        {/* 轮播图结束 */}
        {/* 推荐商品列表开始 */}
        <div className="recommond">
          <List renderHeader={() => "推荐商品"}>
            {this.state.toplist.map(val => (
              <Item
                key={val.id}
                thumb={val.img_url}
                onClick={() =>
                  this.props.history.push(`/goodsDetail/${val.id}`)
                }
              >
                {val.title}
              </Item>
            ))}
          </List>
        </div>
        {/* 推荐商品列表结束 */}
        {/* 商品分类目录开始 */}
        <div className="Cate">
          {this.state.catelist.map((val, index) => {
            return (
              <Fragment key={index}>
                <div className="sub-title">{val.catetitle}</div>
                <Grid
                  data={val.datas.map(val2 => ({
                    id: val2.artID,
                    icon: val2.img_url,
                    title: val2.artTitle,
                    sellPrice: val2.sell_price,
                    marketPrice: val2.market_price,
                    hotsell: val2.stock_quantity
                  }))}
                  itemStyle={{
                    height: "275px"
                  }}
                  columnNum={2}
                  onClick={this.goodsInfo}
                  renderItem={dataItem => (
                    <div style={{ padding: "12.5px" }}>
                      <img
                        src={dataItem.icon}
                        style={{
                          width: "80%"
                        }}
                        alt=""
                      />
                      <div
                        style={{
                          color: "#333",
                          fontSize: "14px",
                          marginTop: "12px",
                          textAlign: "left"
                        }}
                      >
                        <div className="goodsTitle">{dataItem.title}</div>
                        <div className="goodsPrice">
                          <span className="currentPrice">
                            {dataItem.sellPrice}
                          </span>
                          <span className="oldPrice">
                            {dataItem.marketPrice}
                          </span>
                        </div>
                        <div className="hotsell">
                          热卖中{dataItem.hotsell}
                        </div>
                      </div>
                    </div>
                  )}
                />
                <style jsx>
                  {`
                    .sub-title {
                      color: #888;
                      font-size: 14px;
                      padding: 15px 0 9px 15px;
                    }
                    .goodsTitle {
                      height: 32px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 2;
                    }
                    .goodsPrice {
                      margin: 10px 0;
                      .currentPrice {
                        color: red;
                      }
                      .oldPrice {
                        float: right;
                        text-decoration: line-through;
                      }
                    }
                    .hotsell {
                    }
                  `}
                </style>
              </Fragment>
            );
          })}
        </div>
        {/* 商品分类目录结束 */}
      </div>
    );
  }
}

export default withRouter(Home);
