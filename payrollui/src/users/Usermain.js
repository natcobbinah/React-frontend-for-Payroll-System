import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'

import viewusers from './viewusers';
import adduser from './adduser'
import UserProfile from './userprofile'
import UserAdmin from './useradmin'

import { Switch, Route} from 'react-router-dom'
import  './Usermain.css';

class Usermain extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-2">
                      {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/usersmain/viewusers">
                                <i class="fa fa-street-view fa-3x" aria-hidden="true"></i>
                                <p>View Users</p>
                            </NavLink>
                        </li> */}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/usersmain/adduser">
                            <i class="fa fa-address-book-o fa-3x" aria-hidden="true"></i>
                                <p>Add User</p>
                            </NavLink>
                        </li>
                       {/*  <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/usersmain/edituser">
                                <i class="fa fa-user-secret fa-3x" aria-hidden="true"></i>
                                <p>User Profile</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/usersmain/useradmins">
                                <i class="fa fa-eye fa-3x" aria-hidden="true"></i>
                                <p>View/Add ADMINS</p>
                            </NavLink>
                        </li> */}
                </div>

                <div className="col-md-10">
                <Switch>
                    <Route path="/main/dashboard/usersmain/adduser" component={adduser}/>
                   {/*  <Route path="/main/dashboard/usersmain/viewusers" component={viewusers}/>
                    <Route path="/main/dashboard/usersmain/edituser" component={UserProfile}/>
                    <Route path="/main/dashboard/usersmain/useradmins" component={UserAdmin}/> */}
                </Switch>
                </div>
            </div>
            </div>
        );
    }
}

export default Usermain;