import React, {Component} from 'react';
import axios from 'axios'
import { Switch, Route,NavLink} from 'react-router-dom'
import ViewDepartment from './viewdepartments'
import EditDepartment from './editdepartment';
import AddDepartment from './addDepartment'

class DepartmentMain extends Component{
    render(){
        return(
            <div className="container-fluid">
            <div className="row">
            <div className="col-md-2">
                  <li className="nav-item">
                        <NavLink className="nav-link" to="/main/dashboard/department/viewdepartment">
                            <i className="nc-icon nc-chart-pie-35"></i>
                            <p>View Departments</p>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/main/dashboard/department/adddepartment">
                            <i className="nc-icon nc-circle-09"></i>
                            <p>Add Department</p>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/main/dashboard/department/editdepartment">
                            <i className="nc-icon nc-circle-09"></i>
                            <p>Edit Department</p>
                        </NavLink>
                    </li>
            </div>
            <div className="col-md-10">
            <Switch>
                <Route path="/main/dashboard/department/viewdepartment" component={ViewDepartment}/>
                <Route path="/main/dashboard/department/editdepartment" component={EditDepartment}/>
                <Route path="/main/dashboard/department/adddepartment" component={AddDepartment}/>
            </Switch>
            </div>
        </div>
        </div>
        );
    }
}

export default DepartmentMain;