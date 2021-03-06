import React, { Component } from 'react'
import { BrowserRouter,Switch , Route } from 'react-router-dom'
/* import Sidebar from './components/Sidebar'  */ 
import Main from './components/Main' 
import './App.css';
import Loginform from './login/loginform'

class App extends Component {
  render(){
    return(
      <div className="wrapper">
          <BrowserRouter>
               <Switch>
                  <Route exact path='/' component={Loginform}/>
                  <Route path="/main" component={Main}/>
               </Switch>  
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
