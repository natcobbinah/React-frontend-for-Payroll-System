import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'

import viewusers from './viewusers';
import adduser from './adduser'
import edituser from './edituser'

import { Switch, Route} from 'react-router-dom'
import  './Usermain.css';;

class Usermain extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-2">
                      <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/usersmain/viewusers">
                                <i className="nc-icon nc-chart-pie-35"></i>
                                <p>View Users</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/usersmain/adduser">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>Add User</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/usersmain/edituser">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>Edit User</p>
                            </NavLink>
                        </li>
                </div>
                <div className="col-md-10">
                <Switch>
                    <Route path="/main/dashboard/usersmain/viewusers" component={viewusers}/>
                    <Route path="/main/dashboard/usersmain/adduser" component={adduser}/>
                    <Route path="/main/dashboard/usersmain/edituser" component={edituser}/>
                </Switch>
                </div>
            </div>
            </div>
        );
    }
}

export default Usermain;