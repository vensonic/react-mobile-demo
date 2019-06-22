import React, { Component,Fragment } from 'react'
import { getGoods } from "../api";
import { Carousel } from "antd-mobile";
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
          silderRun:false
        };
    }
    componentDidMount(){
        getGoods().then(res=>{
            // console.log(res.message.sliderlist);
            if(res.status === 0){
                this.setState({
                  sliderlist: res.message.sliderlist,
                  silderRun:true
                });
            }
        })
    }
    render() { 
        return (
          <div className="home">
              {/* 轮播图开始 */}
              {this.state.sliderlist.length ? <Slider sliderlist={this.state.sliderlist}/> : null}
              {/* 轮播图结束 */}
          </div>
        );
    }
}
 
export default Home;