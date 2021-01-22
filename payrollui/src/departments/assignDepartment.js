import React, { Component } from "react";
import axios from 'axios';
import {PATH_GET_DEPARTMENT,PATH_BASE,PARAM_PAGE,PATH_ASSIGNUSER_DEPARTMENT} from '../API_URLS'

class AssignDepartment extends Component {
    constructor(props){
        super(props);

        this.state ={
            //fetch department objects
            result: null,
            error: null,

            //fetch user objects
            resultUserfetch: null,
            errorUserfetch:null,

            //assign role objects
            resultDeptassignSuccess: null,
            resultDeptassignError: null,
        }

        this.assignDepartment = this.assignDepartment.bind(this);
    }

    //http://localhost:2345/v1/test/assignUserDepartment/{userid}/{deptid}
    assignDepartment(){
        let selectedUser = document.getElementById('userid').value;
        let selectedDepartment = document.getElementById('deptid').value;
        console.log("department = " + selectedDepartment + " user =" + selectedUser);

        axios.get(`${PATH_ASSIGNUSER_DEPARTMENT}/${selectedUser}/${selectedDepartment}`)
        .then(resultDeptassignSuccess => this.setState({resultDeptassignSuccess: resultDeptassignSuccess.data}))
        .catch(resultDeptassignError => this.setState({resultDeptassignError})); 
    }

    fetchAllDepartments(pageDept = 0){
        axios.get(`${PATH_GET_DEPARTMENT}?${PARAM_PAGE}${pageDept}`)
        .then(result => this.setState({result: result.data}))
        .catch(error => this.setState({error}));
    }

    fetchAllUsers(pageUser = 0){
        axios.get(`${PATH_BASE}?${PARAM_PAGE}${pageUser}`)
        .then(resultUserfetch => this.setState({resultUserfetch: resultUserfetch.data}))
        .catch(errorUserfetch => this.setState({errorUserfetch}));
    }

    componentDidMount(){
        this.fetchAllUsers();
        this.fetchAllDepartments();
    }

     render(){
        const{result,error,resultUserfetch,errorUserfetch,resultDeptassignSuccess,resultDeptassignError,
            pageDept = 0, pageUser = 0} = this.state;
            return(
                <div className="container-fluid">
                     {error ?
                         <div className="alert alert-danger" role="alert">
                         <p>Error Populating Departments: Server might be down</p>
                       </div> : null
                     }
    
                    {errorUserfetch ?
                         <div className="alert alert-danger" role="alert">
                         <p>Error Populating users: Server might be down</p>
                       </div> : null
                     }          
    
                    <form>
                        <div className="form-row">
                         <div className="form-group col-md-6">
                             <div className="row">
                             <ButtonCustom onClick={() => this.fetchAllDepartments(pageDept - 1)} type="button" className="btn btn-success">
                              PreviousRecord
                             </ButtonCustom> 
                             <ButtonCustom onClick={() => this.fetchAllDepartments(pageDept + 1)} type="button" className="btn btn-success">
                              NextRecord
                             </ButtonCustom> 
                             </div> 
                             <div className="row">
                             <label htmlFor="selectdepartment">Select Department</label>
                            <select id="deptid">
                            {result ?
                                result.content.map(department => (
                                    <option value={department.id}>{department.departmentid} - {department.departmentname}</option>
                                ))
                                : null
                            }   
                            </select>
                             </div>
                          </div>
                          <div className="form-group col-md-6">
                              <div className="row">
                              <ButtonCustom onClick={() => this.fetchAllUsers(pageUser - 1)} type="button" className="btn btn-success">
                                PreviousRecord
                             </ButtonCustom> 
                             <ButtonCustom onClick={() => this.fetchAllUsers(pageUser + 1)} type="button" className="btn btn-success">
                                NextRecord
                             </ButtonCustom> 
                              </div>
    
                              <div className="row">
                               <label htmlFor="selectuser">Select User</label>
                               <select id="userid">
                               {resultUserfetch ?
                                 resultUserfetch.content.map(user => (
                                    <option value={user.id}>{user.name}</option>
                                 ))
                                  : null
                                }   
                               </select>
                              </div>
                          </div>
                         </div>
                         <div className="form-group">
                           <ButtonCustom onClick={() => this.assignDepartment()} type="button" className="btn btn-success">
                                ASSIGN DEPARTMENT
                             </ButtonCustom> 
                         </div>
                         {resultDeptassignSuccess ?
                         <div className="alert alert-success" role="alert">
                         <p>User assigned Department successfully</p>
                       </div> : null
                         } 
    
                          {resultDeptassignError ?
                         <div className="alert alert-danger" role="alert">
                         <p>Error: Assigning Department to user unsuccesful</p>
                       </div> : null
                     }
    
                    </form>
                </div>
     )
 }
}

class ButtonCustom extends Component{
    render(){
        const{onClick,className,type,children} = this.props;
        return(
            <button onClick={onClick} type={type} className={className}>
                {children}
            </button>
        );
    }
}


export default AssignDepartment;
