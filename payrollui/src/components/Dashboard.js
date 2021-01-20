import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import {Route} from 'react-router-dom'
import Usermain from '../users/Usermain'

class Dashboard extends Component {
  render() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-navbar navbar-expand-lg navbar-light bg-dark">
             <ul className="navbar-nav mr-auto">   
             <li className="nav-item mx-5">
                <Link to="/main/dashboard/usersmain">Users</Link>
            </li>
            <li className="nav-item mx-5">
                <Link to="/">Roles</Link>
            </li>
            <li className="nav-item mx-5">
                <Link to="/">Department</Link>
            </li>
            </ul>
            </nav> 
            
            <div className="col-md-12">
                <Route path="/main/dashboard/usersmain" component={Usermain}/>
            </div>
        
          {/* <div className="col-md-9">
               <Switch>
                   <Route path="/dashboard/viewusers" component={viewusers}/>
                    <Route path="/dashboard/edituser" component={edituser}/>
                    <Route path="/dashboard/searchuser" component={searchuser}/>
                </Switch>
            </div> */}
        </div>
    );
  }
}


export default Dashboard