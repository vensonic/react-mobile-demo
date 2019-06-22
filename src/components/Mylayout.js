import React, { Component, Fragment } from "react";
//引入ant-d
import { TabBar } from "antd-mobile";
class Mylayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  render() {
    return (
      <Fragment>
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            top: 0
          }}
        >
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            <TabBar.Item
              title="首页"
              key="Home"
              icon={
                <span
                  className="iconfont icon-home"
                  style={{
                    width: "22px",
                    height: "22px"
                  }}
                />
              }
              selectedIcon={
                <span
                  className="iconfont icon-home"
                  style={{
                    width: "22px",
                    height: "22px"
                  }}
                />
              }
              selected={this.props.match.path === "/"}
              onPress={() => {
                this.props.history.push("/");
              }}
              data-seed="logId"
            >
              {this.props.match.path === "/" ? this.props.children :null}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <span
                  className="iconfont icon-gouwuche"
                  style={{
                    width: "22px",
                    height: "22px"
                  }}
                />
              }
              selectedIcon={
                <span
                  className="iconfont icon-gouwuche"
                  style={{
                    width: "22px",
                    height: "22px"
                  }}
                />
              }
              title="购物车"
              key="Cart"
              badge={1}
              selected={this.props.match.path === "/Cart"}
              onPress={() => {
                this.props.history.push("/Cart");
              }}
              data-seed="logId1"
            >
              {this.props.match.path === "/Cart" ? this.props.children :null}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <span
                  className="iconfont icon-weibiaoti2fuzhi12"
                  style={{
                    width: "22px",
                    height: "22px"
                  }}
                />
              }
              selectedIcon={
                <span
                  className="iconfont icon-weibiaoti2fuzhi12"
                  style={{
                    width: "22px",
                    height: "22px"
                  }}
                />
              }
              title="我的"
              key="Mine"
              selected={this.props.match.path === "/Mine"}
              onPress={() => {
                this.props.history.push("/Mine");
              }}
            >
              {this.props.match.path === "/Mine" ? this.props.children : null}
            </TabBar.Item>
          </TabBar>
        </div>
      </Fragment>
    );
  }
}

export default Mylayout;
