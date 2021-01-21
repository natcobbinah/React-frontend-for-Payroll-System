import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import UserProfile from './UserProfile'
import Sidebar from './Sidebar' 

class Main extends Component{
    render(){
        return(
            <div>
               {/*  <Sidebar/> */}
                <Navbar/>
                <Switch>
                    <Route path="/main/dashboard" component={Dashboard}/>
                    <Route path="/main/profile" component={UserProfile}/>
                    <Redirect from="*" to="/main/dashboard"/>
                </Switch>
                 {/* <Footer/>   */}
            </div>    
        );
    }
}

export default Main;