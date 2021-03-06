import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'
import { Switch, Route} from 'react-router-dom'
import AssignUserDesignation from './assignUserdesignation'
import ViewDesignation from './viewdesignation'

class DesignationMain extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-2">
                      <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/designation/viewDesignation">
                                <i class="fa fa-eye fa-3x" aria-hidden="true"></i>
                                <p>View Designation</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/designation/assignUserDesignation">
                                <i class="fa fa-wrench fa-3x" aria-hidden="true"></i>
                                <p>Assign Designation</p>
                            </NavLink>
                        </li>
                </div>
                <div className="col-md-10">
                <Switch>
                    <Route path="/main/dashboard/designation/viewDesignation" component={ViewDesignation}/>
                    <Route path="/main/dashboard/designation/assignUserDesignation" component={AssignUserDesignation}/>
                </Switch>
                </div>
            </div>
            </div>
        );
    }
}

export default DesignationMain;