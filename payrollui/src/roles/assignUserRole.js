import React,{Component} from 'react'
import axios from 'axios'
import {PATH_GET_ROLES,PATH_BASE,PARAM_PAGE,PATH_ASSIGNUSERROLES} from '../API_URLS'

class AssignUserRole extends Component{
    constructor(props){
        super(props);

        this.state ={
            //fetch role objects
            result: null,
            error: null,

            //fetch user objects
            resultUserfetch: null,
            errorUserfetch:null,

            //assign role objects
            resultRoleassignSuccess: null,
            resultRoleassignError: null,
        }

        this.assignRole = this.assignRole.bind(this);
    }

    //http://localhost:2345/v1/test/assignUserRole/{userid}/{roleid}
    assignRole(){
        let selectedUser = document.getElementById('userid').value;
        let selectedRole = document.getElementById('roleid').value;
        console.log("role = " + selectedRole + " user =" + selectedUser);

        axios.get(`${PATH_ASSIGNUSERROLES}/${selectedUser}/${selectedRole}`)
        .then(resultRoleassignSuccess => this.setState({resultRoleassignSuccess: resultRoleassignSuccess.data}))
        .catch(resultRoleassignError => this.setState({resultRoleassignError}));
    }

    fetchAllRoles(pageRole = 0){
        axios.get(`${PATH_GET_ROLES}?${PARAM_PAGE}${pageRole}`)
        .then(result => this.setState({result: result.data}))
        .catch(error => this.setState({error}));
    }

    fetchAllUsers(pageUser = 0){
        axios.get(`${PATH_BASE}?${PARAM_PAGE}${pageUser}`)
        .then(resultUserfetch => this.setState({resultUserfetch: resultUserfetch.data}))
        .catch(errorUserfetch => this.setState({errorUserfetch}));
    }

    componentDidMount(){
        this.fetchAllRoles();
        this.fetchAllUsers();
    }

    render(){
        const{result,error,resultUserfetch,errorUserfetch,resultRoleassignSuccess,resultRoleassignError,
        pageRole = 0, pageUser = 0} = this.state;
        return(
            <div className="container-fluid">
                 {error ?
                     <div className="alert alert-danger" role="alert">
                     <p>Error Populating roles: Server might be down</p>
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
                         <ButtonCustom onClick={() => this.fetchAllRoles(pageRole - 1)} type="button" className="btn btn-success">
                          PreviousRecord
                         </ButtonCustom> 
                         <ButtonCustom onClick={() => this.fetchAllRoles(pageRole + 1)} type="button" className="btn btn-success">
                          NextRecord
                         </ButtonCustom> 
                         </div> 
                         <div className="row">
                         <label htmlFor="selectrole">Select Role</label>
                        <select id="roleid">
                        {result ?
                            result.content.map(role => (
                                <option value={role.roleid}>{role.rolename}</option>
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
                       <ButtonCustom onClick={() => this.assignRole()} type="button" className="btn btn-success">
                            ASSIGN ROLE
                         </ButtonCustom> 
                     </div>
                     {resultRoleassignSuccess ?
                     <div className="alert alert-success" role="alert">
                     <p>User assigned role successfully</p>
                   </div> : null
                     } 

                      {resultRoleassignError ?
                     <div className="alert alert-danger" role="alert">
                     <p>Error: Assigning Role to user unsuccesful</p>
                   </div> : null
                 }

                </form>
            </div>
        );
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

export default AssignUserRole;