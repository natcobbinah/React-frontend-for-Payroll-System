import React, {Component} from 'react'
import axios from 'axios'
import {PATH_BASE,PARAM_PAGE,PATH_GETALL_DESIGNATION,PATH_ASSIGNUSERDESIGNATION} from '../API_URLS'

class AssignUserDesignation extends Component{
    constructor(props){
        super(props);

        this.state = {
             //fetch user objects
             resultUserfetch: null,
             errorUserfetch:null,

             //fetch designation objects
             result: null,
             error: null,

             //posting user designation objects
             resultpost:null,
             errorpost:null,

        }

        this.assignUserDesignation = this.assignUserDesignation.bind(this);
    }

    fetchAllUsers(pageUser = 0){
        axios.get(`${PATH_BASE}?${PARAM_PAGE}${pageUser}`)
        .then(resultUserfetch => this.setState({resultUserfetch: resultUserfetch.data}))
        .catch(errorUserfetch => this.setState({errorUserfetch}));
    }

    fetchAllDesignations(pageDesignation = 0){
        axios.get(`${PATH_GETALL_DESIGNATION}?${PARAM_PAGE}${pageDesignation}`)
        .then(result => this.setState({result: result.data}))
        .catch(error => this.setState({error}))
    }

    assignUserDesignation(){
        let selectedUser = document.getElementById('userid').value;
        let selectedDesignation = document.getElementById('designationId').value;

        axios.post(`${PATH_ASSIGNUSERDESIGNATION}/${selectedUser}/${selectedDesignation}`)
        .then(resultpost => this.setState({resultpost: resultpost.data}))
        .catch(errorpost => this.setState({errorpost})); 
    }

    componentDidMount(){
        this.fetchAllUsers();
        this.fetchAllDesignations();
    }

    render(){
        const{resultUserfetch,errorUserfetch,pageUser = 0, pageDesignation = 0 , 
            result, error,resultpost,errorpost}=this.state;
        return(
            <div className="container-fluid">
                {errorUserfetch ?
                    <div className="alert alert-danger" role="alert">
                        <p>Error Populating users: Server might be down</p>
                    </div> : null
                }  

                {error ?
                    <div className="alert alert-danger" role="alert">
                        <p>Error Populating Designations: Server might be down</p>
                    </div> : null
                }

                {resultpost ?
                    <div className="alert alert-success" role="alert">
                        <p>Assigning user designation successful</p>
                    </div> : null
                }      

                {errorpost ?
                    <div className="alert alert-danger" role="alert">
                        <p>Error assigning user designation</p>
                    </div> : null
                }  
                
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">                
                        <ButtonCustom onClick={() => this.fetchAllUsers(pageUser - 1)} type="button" className="btn btn-success">
                            PreviousRecord
                        </ButtonCustom> 
                        <ButtonCustom onClick={() => this.fetchAllUsers(pageUser + 1)} type="button" className="btn btn-success">
                            NextRecord
                        </ButtonCustom> 
                        </div>

                        <div className="form-group col-md-6">   
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
                
                        <div className="form-group col-md-6">
                        <ButtonCustom onClick={() => this.fetchAllDesignations(pageDesignation - 1)} type="button" className="btn btn-success">
                            PreviousRecord
                        </ButtonCustom> 
                        <ButtonCustom onClick={() => this.fetchAllDesignations(pageDesignation + 1)} type="button" className="btn btn-success">
                            NextRecord
                        </ButtonCustom> 
                        </div>
                  
                        <div className="form-group col-md-6">
                        <label htmlFor="selectuser">Select Designation</label>
                        <select id="designationId">
                        {result ?
                         result.content.map(designation => (
                        <option value={designation.id}>{designation.designationname}</option>
                        ))
                        : null
                        }   
                        </select>
                        </div>
                        <div className="form-group col-md-6">
                            <ButtonCustom onClick={() => this.assignUserDesignation()} type="button" className="btn btn-success">
                                Assign Designation
                            </ButtonCustom> 
                        </div>
                    </div>
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

export default AssignUserDesignation