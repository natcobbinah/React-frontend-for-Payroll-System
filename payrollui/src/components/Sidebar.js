import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

class Sidebar extends Component{
    render(){
        return(
            <div className="sidebar">
                <div className="sidebar-wrapper">
                    <div className="logo">
                        <Link to="/" className="simple-text">
                            Payroll Dashboard
                        </Link>
                    </div>
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/main/dashboard">
                                <i className="nc-icon nc-chart-pie-35"></i>
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/main/profile">
                                <i className="nc-icon nc-circle-09"></i>
                                <p>User Profile</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;