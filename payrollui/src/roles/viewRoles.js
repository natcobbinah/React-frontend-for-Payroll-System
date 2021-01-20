import React,{Component} from 'react'
import axios from 'axios'
import {PATH_GET_ROLES,PARAM_PAGE,PATH_DELETE_ROLE} from '../API_URLS'

import 'bootstrap/dist/css/bootstrap.min.css';

class ViewRoles extends Component{
    constructor(props){
        super(props);

        this.state = {
            result:null,
            error:null,

            resultOndelete:null,
            errorOndelete:null,
        }

        this.fetchAllRoles = this.fetchAllRoles.bind(this);
        this.onDelete = this.onDelete.bind(this);
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

    componentDidMount(){
        this.fetchAllRoles();
    }

    render(){
        const{result,error,page = 0, resultOndelete,errorOndelete} = this.state;
        return(
            <div className="container-fluid">
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
                    <Table list={result.content}  onDelete={this.onDelete}/>
                    :
                    null
                } 
            </div>
        )
    }
}

class Table extends Component{
    render(){
        const{list,onDelete} = this.props;
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