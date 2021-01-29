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
                                <i class="fa fa-eye fa-3x" aria-hidden="true"></i>
                                <p>View Benefits</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard/benefits/viewuserBenefit">
                                <i class="fa fa-user-circle-o fa-3x" aria-hidden="true"></i>
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