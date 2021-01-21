import React,{Component} from 'react'
import axios from 'axios'
import {PATH_GET_ROLES,PARAM_PAGE,PATH_DELETE_ROLE,PATH_PATCH_EDIT_ROLE} from '../API_URLS'

import 'bootstrap/dist/css/bootstrap.min.css';

class ViewRoles extends Component{
    constructor(props){
        super(props);

        this.state = {
            //values to edit on edit clicked
            role_id: '',
            role_name: '',

            result:null,
            error:null,
            resultOndelete:null,
            errorOndelete:null,
            onUpdateSuccess:null,
            onUpdateError:null,
        }

        this.fetchAllRoles = this.fetchAllRoles.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditRole = this.onEditRole.bind(this);
        this.updateRole = this.updateRole.bind(this);
    }

    fetchAllRoles(page = 0){
        axios.get(`${PATH_GET_ROLES}?${PARAM_PAGE}${page}`)
        .then(result => this.setState({result: result.data}))
        .catch(error => this.setState({error}));
    }

    onDelete(id){
        axios.get(`${PATH_DELETE_ROLE}/${id}`)
        .then(resultOndelete => this.setState({resultOndelete: resultOndelete.data}))
        .catch(errorOndelete => this.setState({errorOndelete}))
        this.fetchAllRoles();
    }

    onEditRole(id,name){
       this.setState({
           role_id: id,
           role_name: name
       })
    }

    updateRole(){
        const{role_id,role_name} = this.state;
       // console.log(role_id +":" + role_name);

        const headers = { 'content-type': 'application/json'};
        axios({
            method: 'patch',
            url: PATH_PATCH_EDIT_ROLE,
            data: {
                roleid: role_id,
                rolename: role_name,
            },
            headers: headers
        })
        .then(onUpdateSuccess => this.setState({onUpdateSuccess: onUpdateSuccess.data}))
        .catch(onUpdateError => this.setState({onUpdateError}));
        
        this.fetchAllRoles();
    }

    componentDidMount(){
        this.fetchAllRoles();
    }

    render(){
        const{result,error,page = 0, resultOndelete,errorOndelete,role_id,role_name,onUpdateSuccess,onUpdateError} = this.state;
        return(
            <div className="container-fluid">
                {onUpdateSuccess?
                    <div className="alert alert-success" role="alert">
                      <p>Role updated Successfully</p>
                    </div> : null
                }

                {onUpdateError?
                    <div className="alert alert-danger" role="alert">
                      <p>Error updating role</p>
                    </div> : null
                }       

                {role_id ?
                  <div className="row">
                  <form>
                      {/* <label htmlFor="id">RoleID</label>
                      <input type="text" value={role_id} onChange={(e) => this.setState({role_id : e.target.value})}/> */}
                      <label htmlFor="rolename">Rolename</label>
                      <input type="text" value={role_name} onChange={(e) => this.setState({role_name : e.target.value})}/>
                      <button type="button" onClick={this.updateRole}>Update</button>
                  </form>
                </div> 
                 : null
                }

                <div className="row">
                    <div className="col-md-6">
                      <ButtonCustom onClick={() => this.fetchAllRoles(page - 1)} type="button" className="btn btn-success">
                         PreviousRecord
                      </ButtonCustom>  
                    </div>
                    <div className="col-md-6">
                      <ButtonCustom onClick={() => this.fetchAllRoles(page + 1)} type="button" className="btn btn-primary">
                        NextRecord
                      </ButtonCustom>  
                    </div>
                </div>

                {error ?
                     <div className="alert alert-danger" role="alert">
                     <p>Error fetching  records Server might be down</p>
                   </div> : null
                  }

                   {resultOndelete ?
                     <div className="alert alert-sucess" role="alert">
                     <p>Role deleted successfully</p>
                   </div> : null
                   }

                    {errorOndelete ?
                     <div className="alert alert-danger" role="alert">
                     <p>Unsuccessful operation deleting role</p>
                     </div> : null
                   }


                {result?
                    <Table list={result.content}  onDelete={this.onDelete} onEditRole={this.onEditRole}/>
                    :
                    null
                } 
            </div>
        )
    }
}

class Table extends Component{
    render(){
        const{list,onDelete,onEditRole} = this.props;
        return(
            <div className="table-responsive table-hover table-striped">
            <table className="table">
...             <thead className="thead-dark">
                    <tr>
                     <th scope="col">ROLE NAMES</th>
                     <th scope="col">ACTION</th>
                    </tr>
                 </thead>
                 <tbody>
                     {list.map(role => 
                    <tr key={role.roleid}>
                      <td>{role.rolename}</td>
                      <td> 
                        <ButtonCustom onClick={() => onEditRole(role.roleid, role.rolename)} type="button" className="btn btn-success">
                                Edit
                        </ButtonCustom>
                        <ButtonCustom onClick={() => onDelete(role.roleid)} type="button" className="btn btn-danger">
                                Delete
                        </ButtonCustom>
                      </td>
                    </tr>
                    )}
                </tbody>
            </table>
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

export default ViewRoles;