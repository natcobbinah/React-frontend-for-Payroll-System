import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'
import { Switch, Route} from 'react-router-dom'
import AddRole from './addRole'
import ViewRoles from './viewRoles'
import AssignUserRole from './assignUserRole'

class Rolesmain extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-2">
                      <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/roles/viewRoles">
                                <i className="nc-icon nc-chart-pie-35"></i>
                                <p>View Roles</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/roles/addRoles">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>Add Role</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/roles/assignUserRole">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>Assign User Roles</p>
                            </NavLink>
                        </li>
                </div>
                <div className="col-md-10">
                <Switch>
                    <Route path="/main/dashboard/roles/viewRoles" component={ViewRoles}/>
                    <Route path="/main/dashboard/roles/addRoles" component={AddRole}/>
                    <Route path="/main/dashboard/roles/assignUserRole" component={AssignUserRole}/>
                </Switch>
                </div>
            </div>
            </div>
        );
    }
}

export default Rolesmain;