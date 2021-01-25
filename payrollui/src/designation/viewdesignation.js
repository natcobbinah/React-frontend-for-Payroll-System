import React,{Component} from 'react'
import axios from 'axios'
import {PATH_GETALL_DESIGNATION,PATH_ADD_DESIGNATION,PATH_DELETE_DESIGNATION,
    PARAM_PAGE,PATH_GET_DEPARTMENT} from '../API_URLS'
import Modal from './Modal'

class ViewDesignation extends Component{
    constructor(props){
        super(props);

        this.state = {
            //result from fetching designations
            result: null,
            error: null,

            //result from deleting designation
            deleteResult: null,
            deleteError: null,

            //modal attributes
            modal: false,

            //value to changeState when assigning modal
            designationaname:'',

            //fetching department attributes
            deptResult:null,
            deptError:null,

            //assigning designation to department attributes
            assignResult:null,
            assignError:null,
        }

        this.fetchAllDesignations = this.fetchAllDesignations.bind(this);
        this.popupModal = this.popupModal.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.addDesignationtoDB = this.addDesignationtoDB.bind(this);
    }

    onDelete(id){
        axios.get(`${PATH_DELETE_DESIGNATION}/${id}`)
        .then(deleteResult => this.setState({deleteResult : deleteResult.data}))
        .catch(deleteError => this.setState({deleteError}))
    }

    //http://localhost:2345/v1/test/designation/{desname}/{deptid}
    addDesignationtoDB(){
        const{designationaname} = this.state; 
        let selectedDepartment = document.getElementById('deptid').value;

        axios.get(`${PATH_ADD_DESIGNATION}/${designationaname}/${selectedDepartment}`)
        .then(assignResult => this.setState({assignResult: assignResult.data}))
        .catch(assignError => this.setState({assignError})); 
    }

    popupModal(){
        this.modalOpen();
    }

    fetchAllDepartments(pageDept = 0){
        axios.get(`${PATH_GET_DEPARTMENT}?${PARAM_PAGE}${pageDept}`)
        .then(deptResult => this.setState({deptResult: deptResult.data}))
        .catch(deptError => this.setState({deptError}));
    }

    fetchAllDesignations(page = 0){
        axios.get(`${PATH_GETALL_DESIGNATION}?${PARAM_PAGE}${page}`)
        .then(result => this.setState({result: result.data}))
        .catch(error => this.setState({error}))
    }

    modalOpen(){
        this.setState({
            modal: true
        })
    }

    modalClose(){
        this.setState({
            designationaname: '',
            modal: false,
        })
    }

    componentDidMount(){
        this.fetchAllDesignations();
        this.fetchAllDepartments();
    }
    
    render(){
        const{result,error,page = 0,deleteResult,deleteError,
        designationaname,modal,deptResult,deptError,pageDept = 0,assignResult,assignError } = this.state;
        return(
            <div>
                <div className="row">
                    {assignError?
                           <div className="alert alert-danger" role="alert">
                           <p>Error assigning designation to department: Operation Unsuccessful</p>
                         </div> : null
                    }

                    {assignResult?
                           <div className="alert alert-success" role="alert">
                           <p>Successfully assigned Designatin to Department</p>
                         </div> : null
                    }
                </div>

                 <div className="row">
                    <div className="col-md-6">
                      <ButtonCustom onClick={() => this.popupModal()} type="button" className="btn btn-success">
                         Add Designation
                      </ButtonCustom>  
                    </div>
                </div>

                <div className="row">
                    <Modal show={modal} handleClose={e => this.modalClose(e)}>
                     <div className="form-group">
                        <label htmlFor="designationname">DesignationName</label>
                        <input type="text" value={designationaname} className="form-control" onChange={(e) => this.setState({designationaname : e.target.value})}/>
                     </div>
                     <div className="form-group">
                        <label htmlFor="designationname">Select Department</label>
                     </div>
                     <div className="form-group">
                        <ButtonCustom onClick={() => this.fetchAllDepartments(pageDept - 1)} type="button" className="btn btn-success">
                              PreviousRecord
                        </ButtonCustom> 
                        <ButtonCustom onClick={() => this.fetchAllDepartments(pageDept + 1)} type="button" className="btn btn-success">
                              NextRecord
                        </ButtonCustom>     
                     </div>
                     <div className="form-group">
                         {deptError?
                           <div className="alert alert-danger" role="alert">
                           <p>Populating department field unsuccesful: Server might be down</p>
                         </div> : null
                        }
                        <select id="deptid" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                        {deptResult?
                         deptResult.content.map(department => (
                            <option value={department.id}>{department.departmentname}</option>
                        ))
                        : null
                       }
                        </select>
                     </div>                
                     <div className="form-group">
                        <button type="button" className="btn btn-primary" onClick={() => this.addDesignationtoDB()}>Add Designation</button>
                     </div>
                   </Modal>                 
                </div> 

                {error ?
                     <div className="alert alert-danger" role="alert">
                     <p>Error fetching  records Server might be down</p>
                   </div> : null
                }

                {deleteResult ?
                     <div className="alert alert-success" role="alert">
                     <p>Designation deleted successfully</p>
                   </div> : null
                }  

                {deleteError ?
                     <div className="alert alert-danger" role="alert">
                     <p>Deleting designation Unsuccessful</p>
                   </div> : null
                }       

                <div className="row mt-2">
                    <div className="col-md-6">
                      <ButtonCustom onClick={() => this.fetchAllDesignations(page - 1)} type="button" className="btn btn-success">
                         PreviousRecord
                      </ButtonCustom>  
                    </div>
                    <div className="col-md-6">
                      <ButtonCustom onClick={() => this.fetchAllDesignations(page + 1)} type="button" className="btn btn-primary">
                        NextRecord
                      </ButtonCustom>  
                    </div>
                </div>

                {result ?
                <Table list={result.content} onDelete={this.onDelete}/>
                : null
                }
          </div>
        );
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
                     <th scope="col">DESIGNATION NAME</th>
                     <th scope="col">DEPARTMENT</th>
                     <th scope="col">ACTION</th>
                    </tr>
                 </thead>
                 <tbody>
                     {list.map(designation => 
                    <tr key={designation.id}>
                      <td>{designation.designationname}</td>
                      <td>{designation.department.departmentname}</td>
                      <td> 
                        <ButtonCustom onClick={() => onDelete(designation.id)} type="button" className="btn btn-danger">
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



export default ViewDesignation