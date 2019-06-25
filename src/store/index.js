import reducer from "./reducer";
import { createStore } from "redux";

export default createStore(
  reducer, 
  // 给谷歌调试工具使用的
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);