import React, {Component} from 'react'
import {NavLink,Switch, Route} from 'react-router-dom'
import ViewBenefits from './viewbenefits'
import ViewUserBenefits from './viewuserbenefits'

class BenefitMain extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-2">
                      <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/benefits/viewbenefits">
                                <i className="nc-icon nc-chart-pie-35"></i>
                                <p>View Benefits</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/benefits/viewuserBenefit">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>View User Benefits</p>
                            </NavLink>
                        </li>
                </div>
                <div className="col-md-10">
                <Switch>
                    <Route path="/main/dashboard/benefits/viewbenefits" component={ViewBenefits}/>
                    <Route path="/main/dashboard/benefits/viewuserBenefit" component={ViewUserBenefits}/>
                </Switch>
                </div>
            </div>
            </div>
        );
    }
}

export default BenefitMain;