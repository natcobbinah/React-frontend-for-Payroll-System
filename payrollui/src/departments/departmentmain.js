import React, {Component} from 'react';
import axios from 'axios'
import { Switch, Route,NavLink} from 'react-router-dom'
import ViewDepartment from './viewdepartments'
import AddDepartment from './addDepartment'
import AssignDepartment from './assignDepartment'

class DepartmentMain extends Component{
    render(){
        return(
            <div className="container-fluid">
            <div className="row">
            <div className="col-md-2">
                  <li className="nav-item">
                        <NavLink className="nav-link" to="/main/dashboard/department/viewdepartment">
                            <i class="fa fa-eye fa-3x" aria-hidden="true"></i>
                            <p>View Departments</p>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/main/dashboard/department/adddepartment">
                            <i class="fa fa-university fa-3x" aria-hidden="true"></i>
                            <p>Add Department</p>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/main/dashboard/department/assignDepartment">
                            <i class="fa fa-plus-circle fa-3x" aria-hidden="true"></i>
                            <p>Assign Department</p>
                        </NavLink>
                    </li>
            </div>
            <div className="col-md-10">
            <Switch>
                <Route path="/main/dashboard/department/viewdepartment" component={ViewDepartment}/>
                <Route path="/main/dashboard/department/adddepartment" component={AddDepartment}/>
                <Route path="/main/dashboard/department/assignDepartment" component={AssignDepartment}/>
            </Switch>
            </div>
        </div>
        </div>
        );
    }
}

export default DepartmentMain;