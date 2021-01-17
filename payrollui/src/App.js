import React, { Component } from 'react'
import { BrowserRouter , Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Main from './components/Main'
import './App.css';

class App extends Component {
  render(){
    return(
      <div className="wrapper">
          <BrowserRouter>
              <Sidebar/>
              <Route path="/" component={Main}/>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
