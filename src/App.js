import React, { Component,Fragment } from 'react';
import Mylayout from "./components/Mylayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Mine from "./pages/Mine";
//引入路由
import { HashRouter as Router,Route} from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <Fragment>
        <Router>
          <Route path='/' exact render={(props)=><Mylayout {...props}><Home/></Mylayout>}/>
          <Route path='/Cart' exact render={(props)=><Mylayout {...props}><Cart/></Mylayout>}/>
          <Route path='/Mine' exact render={(props)=><Mylayout {...props}><Mine/></Mylayout>}/>
        </Router>
      </Fragment>
    );
  }
}
 
export default App;

