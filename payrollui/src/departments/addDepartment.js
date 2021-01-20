import React, {Component} from 'react';
import axios from 'axios'
import {PATH_ADD_DEPARTMENT} from '../API_URLS'

import 'bootstrap/dist/css/bootstrap.min.css';

class AddDepartment extends Component{
    constructor(props){
        super(props);

        this.state = {
            departmentid:'',
            departmentname:'',

            errorpost:null,
            resultpost:null
        }
        this.addDepartmenttoDB = this.addDepartmenttoDB.bind(this);
    }
    
    addDepartmenttoDB(){
        const{departmentid,departmentname}=this.state;
        const headers = { 'content-type': 'application/json'};

        axios({
            method: 'post',
            url: PATH_ADD_DEPARTMENT,
            data: {
                departmentid: departmentid,
                departmentname: departmentname,
            },
            headers: headers
        })
        .then(resultpost => this.setState({resultpost: resultpost.data}))
        .catch(errorpost => this.setState({errorpost}));
    }

    render(){
        const{errorpost,resultpost} = this.state;
        return(
          <div className="container-fluid mt-5">
                       {errorpost ?
                        <div className="alert alert-danger" role="alert">
                              <p>Error saving Department to database: SERVER MIGHT DOWN</p>
                        </div> : null
                       }
                        { resultpost ?
                           <div className="alert alert-success" role="alert">
                            <p>Department Saved Successfully to database</p>
                          </div> : null     
                        }

                       <form>
                          <div className="form-group">
                            <label htmlFor="departmentcodelbl">Department Code</label>
                            <input type="text" class="form-control" id="departmentcodelbl" placeholder="Departmentcode  here...." onChange={(e) => this.setState({departmentid : e.target.value})}/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="departmentnamelbl">DepartmentName</label>
                            <input type="text" class="form-control" id="departmentnamelbl" placeholder="Departmentname  here...." onChange={(e) => this.setState({departmentname : e.target.value})}/>
                          </div>
                          <ButtonCustom onClick={this.addDepartmenttoDB} type="button" className="btn btn-success">
                              Add Department
                          </ButtonCustom>  
                       </form>
            </div> 
        );
    }
}


class ButtonCustom extends Component{
    render(){
        const{onClick, className,type,children}=this.props;
        return(
            <button onClick={onClick} type={type} className={className}>
            {children}
           </button>
        );
    }
}

export default AddDepartment;