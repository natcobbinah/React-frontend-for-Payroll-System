import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'
import viewusers from './viewusers';

import adduser from './adduser'
import edituser from './edituser'
import searchuser from './searchuser'

import { Switch, Route} from 'react-router-dom'
import  './Usermain.css';;

class Usermain extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-2">
                      <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/usersmain/viewusers">
                                <i className="nc-icon nc-chart-pie-35"></i>
                                <p>View Users</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/usersmain/adduser">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>Add User</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/usersmain/edituser">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>Edit User</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/usersmain/searchuser">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>Search User</p>
                            </NavLink>
                        </li> 
                </div>
                <div className="col-md-10">
                <Switch>
                    <Route path="/dashboard/usersmain/viewusers" component={viewusers}/>
                    <Route path="/dashboard/usersmain/adduser" component={adduser}/>
                    <Route path="/dashboard/usersmain/edituser" component={edituser}/>
                    <Route path="/dashboard/usersmain/searchuser" component={searchuser}/>
                </Switch>
                </div>
            </div>
            </div>
            /* <div className="container">
                <div className="col-md-4">
                    <ul>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/usersmain/viewusers">
                                <i className="nc-icon nc-chart-pie-35"></i>
                                <p>View Users</p>
                            </NavLink>
                        </li>
                         <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/adduser">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>Add User</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/edituser">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>Edit User</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/searchuser">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>Search User</p>
                            </NavLink>
                        </li> 
                </ul>
                </div>
                <div className="col-md-9">
                <Switch>
                    <Route path="/dashboard/usersmain/viewusers" component={viewusers}/>
                </Switch>
                </div>
            </div>     */
        );
    }
}

export default Usermain;