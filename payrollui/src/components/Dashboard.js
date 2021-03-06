import React, { Component } from 'react'
import {Link } from 'react-router-dom'
import {Route} from 'react-router-dom'
import Usermain from '../users/Usermain'
import DepartmentMain from '../departments/departmentmain'
import Rolesmain from '../roles/rolesMain'
import DesignationMain from '../designation/designationMain'
import BenefitMain from '../benefits/benefitMain'

import viewusers from '../users/viewusers';

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
                <Link to="/main/dashboard/roles">Roles</Link>
            </li>
            <li className="nav-item mx-5">
                <Link to="/main/dashboard/department">Department</Link>
            </li>
            <li className="nav-item mx-5">
                <Link to="/main/dashboard/designation">Designation</Link>
            </li>
            <li className="nav-item mx-5">
                <Link to="/main/dashboard/benefits">Benefits</Link>
            </li>
            </ul>
            </nav> 
            
            <div className="col-md-12">
                <Route path="/main/dashboard/usersmain/**" component={viewusers}/>
                <Route path="/main/dashboard/usersmain" component={Usermain}/>
                <Route path="/main/dashboard/department" component={DepartmentMain}/>
                <Route path="/main/dashboard/roles" component={Rolesmain}/>
                <Route path="/main/dashboard/designation" component={DesignationMain}/>
                <Route path="/main/dashboard/benefits" component={BenefitMain}/>
            </div>
        </div>
    );
  }
}

export default Dashboard