import React from 'react';
import ReactDOM from 'react-dom';
import "./style/index.css";
import App from './App';
import "./style/iconfont.css";
import "antd-mobile/dist/antd-mobile.css";
//引入Provider
import { Provider } from "react-redux";
//引入store
import store from "./store";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

