import React, {Component} from 'react';
import axios from 'axios'
import {PATH_GET_DEPARTMENT,PARAM_PAGE,PATH_DELETE_DEPARTMENT,PATH_PATCH_EDITDEPARTMENT} from '../API_URLS'
import Modal from './Modal'
import 'bootstrap/dist/css/bootstrap.min.css';


//for client side filtering of records
const searchedForRecord = searchDepartment => department =>
    department.departmentname.toLowerCase().includes(searchDepartment.toLowerCase());

class ViewDepartment extends Component{
    constructor(props){
        super(props);

        this.state = {
            //values to edit on edit clicked
            id: '',
            departmentid: '',
            departmentname: '',

            //variable for filtering
            searchDepartment: '',
            //response from axios post and get
            error:null,
            result:null,

            errorOndelete:null,
            resultOndelete:null,
            onUpdateSuccess:null,
            onUpdateError:null,

            //modal attributes
            modal: false,
        }

        this.fetchAllDepartments = this.fetchAllDepartments.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onEditDepartment = this.onEditDepartment.bind(this);
        this.updateDepartment = this.updateDepartment.bind(this);
    }

    fetchAllDepartments(page = 0){
        axios.get(`${PATH_GET_DEPARTMENT}?${PARAM_PAGE}${page}`)
        .then(result => this.setState({result: result.data}))
        .catch(error => this.setState({error}));
    }

    onSearchChange(event){
        this.setState({
            searchDepartment: event.target.value
        })
    }

    onDelete(id){
        axios.get(`${PATH_DELETE_DEPARTMENT}/${id}`)
        .then(resultOndelete => this.setState({resultOndelete: resultOndelete.data}))
        .catch(errorOndelete => this.setState({errorOndelete}))
        this.fetchAllDepartments();
    }

    onEditDepartment(id,deptid,name){
        this.setState({
            id: id,
            departmentid:deptid,
            departmentname: name,
        })
        this.modalOpen();
    }

    updateDepartment(){
        const{id,departmentid,departmentname} = this.state;
        //console.log(id + ":" + departmentid + " : " +departmentname)
        const headers = { 'content-type': 'application/json'};
        axios({
            method: 'patch',
            url: PATH_PATCH_EDITDEPARTMENT,
            data: {
                id: id,
                departmentid:departmentid,
                departmentname: departmentname,
            },
            headers: headers
        })
        .then(onUpdateSuccess => this.setState({onUpdateSuccess: onUpdateSuccess.data}))
        .catch(onUpdateError => this.setState({onUpdateError}));
        
        this.fetchAllDepartments();
    }

    modalOpen(){
        this.setState({
            modal: true
        })
    }

    modalClose(){
        this.setState({
            id: '',
            departmentid: '',
            departmentname: '',
            modal: false,
        })
    }

    componentDidMount(){
        this.fetchAllDepartments();
    }

    render(){
        const{result,error,page=0,searchDepartment,
            resultOndelete,errorOndelete,id,departmentid,departmentname,
            onUpdateSuccess,onUpdateError,modal
        } = this.state;
        return(
          <div className="container-fluid mt-2">
                <Search value={searchDepartment} onChange={this.onSearchChange}>Search</Search>
                
                {id ?
                <div className="row">
                    <Modal show={modal} handleClose={e => this.modalClose(e)}>
                    <div className="col-md-12">
                        <form>
                          <div className="form-group">
                            <label htmlFor="deptidlbl">Department_Code</label>
                            <input type="text" className="form-control" id="deptidlbl" value={departmentid} onChange={(e) => this.setState({departmentid : e.target.value})}/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="deptnamelbl">Department_Name</label>
                            <input type="text" className="form-control" id="deptnamelbl" value={departmentname} onChange={(e) => this.setState({departmentname : e.target.value})}/>
                          </div>
                          <button type="button" className="btn btn-primary" onClick={this.updateDepartment}>Update</button>
                        </form>
                    </div>
                    </Modal>
                </div>
                  : null
                }

                {onUpdateSuccess?
                    <div className="alert alert-success" role="alert">
                      <p>Department updated Successfully</p>
                    </div> : null
                }

                {onUpdateError?
                    <div className="alert alert-danger" role="alert">
                      <p>Error updating department</p>
                    </div> : null
                } 

                <div className="row">
                    <div className="col-md-6 my-3">
                    <ButtonCustom onClick={() => this.fetchAllDepartments(page - 1)} type="button" className="btn btn-success">
                        PreviousRecord
                    </ButtonCustom>  
                    </div>
                    <div className="col-md-6 my-3">
                    <ButtonCustom onClick={() => this.fetchAllDepartments(page + 1)} type="button" className="btn btn-primary">
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
                     <p>Department deleted successfully</p>
                   </div> : null
                  }

                   {errorOndelete ?
                     <div className="alert alert-danger" role="alert">
                     <p>Unsuccessful operation deleting department</p>
                   </div> : null
                  }

                 {result?
                    <Table list={result.content} pattern={searchDepartment} onDelete={this.onDelete} onEditDepartment={this.onEditDepartment}/>
                    :
                    null
                } 
     
            </div> 
        );
    }
}

class Table extends Component{
    render(){
        const{list,pattern,onDelete,onEditDepartment} = this.props;
        return(
            <div className="table-responsive table-hover table-striped">
            <table className="table">
...             <thead className="thead-dark">
                    <tr>
                     <th scope="col">DEPARTMENT_CODE</th>
                     <th scope="col">DEPARTMENT_NAME</th>
                     <th scope="col">ACTION</th>
                    </tr>
                 </thead>
                 <tbody>
                     {list.filter(searchedForRecord(pattern)).map(department => 
                    <tr key={department.id}>
                      <td>{department.departmentid}</td>
                      <td>{department.departmentname}</td>
                      <td>
                        <ButtonCustom onClick={() => onEditDepartment(department.id,department.departmentid,department.departmentname)} type="button" className="btn btn-success mx-2">
                                Edit
                        </ButtonCustom>
                        <ButtonCustom onClick={() => onDelete(department.id)} type="button" className="btn btn-danger">
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

class Search extends Component{
    render(){
        const {value,onChange,onSubmit,children} = this.props;
        return(
            <form className="form-inline mr-5 my-2 my-lg-0 mt-5 py-4" onSubmit={onSubmit}>
                 {children}<input type="text" value={value} onChange={onChange} className="form-control form-control-lg" placeholder="Search for user by name" aria-label="Search"/>
            </form>
        );
    }
}


export default ViewDepartment;