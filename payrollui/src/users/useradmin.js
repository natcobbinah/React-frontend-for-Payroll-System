import React, {Component} from 'react'
import axios from 'axios';
import {PATH_GET_ALLUSERROLESBUT_SHOWADMINS,PARAM_PAGE} from '../API_URLS'

const searchedForRecord = searchAdmin => id =>
 id.role.rolename.toLowerCase().includes(searchAdmin.toLowerCase());

class UserAdmin extends Component{
    constructor(props){
        super(props);

        this.state ={
            searchAdmin: 'admin',
            result: null,
            error: null,
        }

        this.fetchAllUserRolesWithAdminSorted = this.fetchAllUserRolesWithAdminSorted.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    fetchAllUserRolesWithAdminSorted(page = 0){
        axios.get(`${PATH_GET_ALLUSERROLESBUT_SHOWADMINS}?${PARAM_PAGE}${page}`)
        .then(result => this.setState({result: result.data}))
        .catch(error => this.setState({error}));
    }

    editUser(){
        
    }

    componentDidMount(){
        this.fetchAllUserRolesWithAdminSorted();
    }

    render(){
        const{result,error,page = 0,searchAdmin} = this.state;
        return(
            <div>
                <Button onClick={() => this.fetchAllUserRolesWithAdminSorted(page - 1)} type="button" className="btn btn-success">
                    PreviousRecord
                </Button>  
                <Button onClick={() => this.fetchAllUserRolesWithAdminSorted(page + 1)} type="button" className="btn btn-primary">
                    NextRecord
                </Button>

                {  error? 
                    <div className="alert alert-danger" role="alert">
                    <p>Error fetching  records Server might be down</p>
                  </div> : null
                }

                { result ?
                        <Table list={result.content} pattern={searchAdmin} editUser={this.editUser}/>
                : null
                }   
            </div>
        );
    }
}

class Table extends Component{
    render(){
        const{list,pattern,editUser} = this.props;
        return(
            <div className="table-responsive table-hover table-striped">
                <table className="table">
    ...             <thead className="thead-dark">
                        <tr>
                         <th scope="col">Email</th>
                         <th scope="col">EmployeeID</th>
                         <th scope="col">EmployeeLvl</th>
                         <th scope="col">Role</th>
                         <th scope="col">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                         {list.filter(searchedForRecord(pattern)).map(id => 
                        <tr key={id}>
                          <td>{id.user.email}</td>
                          <td>{id.user.employeeid}</td>
                          <td>{id.user.employeelevel}</td>
                          <td>{id.role.rolename}</td>
                          <td>
                              <Button onClick={() => this.editUser} type="button" className="btn btn-success">
                                  Edit
                              </Button>
                              <Button onClick={() => this.editUser} type="button" className="btn btn-success">
                                  Enable
                              </Button>
                              <Button onClick={() => this.editUser} type="button" className="btn btn-success">
                                  Disable
                              </Button>
                              <Button onClick={() => this.editUser} type="button" className="btn btn-success">
                                  ChangeRoles
                              </Button>
                              <Button onClick={() => this.editUser} type="button" className="btn btn-success">
                                  SendLoginCred
                              </Button>
                          </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div> 
        );
    }
}


class Button extends Component{
    render(){
        const{onClick,className,type,children} = this.props;
        return(
            <button onClick={onClick} type={type} className={className}>
                {children}
            </button>
        );
    }
}

export default UserAdmin;