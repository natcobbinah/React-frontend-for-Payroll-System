import React, {Component} from 'react';
import axios from 'axios';
import {PATH_BASE,PATH_DELETEUSER,PARAM_DELETE
    ,PARAM_PAGE} from '../API_URLS';

const searchedForRecord = searchUser => user =>
    user.name.toLowerCase().includes(searchUser.toLowerCase());

class viewusers extends Component{
    constructor(props){
        super(props);

        this.state={
            searchUser:'',
            result: null,
            error:null,
        }

        this.onDelete = this.onDelete.bind(this);
        this.fetchAllUsers = this.fetchAllUsers.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(event){
        this.setState({
            searchUser: event.target.value
        })
    }

    fetchAllUsers(page = 0){
        axios.get(`${PATH_BASE}?${PARAM_PAGE}${page}`)
        .then(result => this.setState({result: result.data}))
        .catch(error => this.setState({error}));
    }

    onDelete(id){
        axios.get(`${PATH_DELETEUSER}?${PARAM_DELETE}${id}`)
        this.componentDidMount();
    }

    componentDidMount(){
        this.fetchAllUsers();
    }
    
    render(){
        const{searchUser,error,page = 0,result} = this.state;
        if(error){
            return <p>Something Went wrong:</p>
        }
        return(
            <div>
                <Search value={searchUser} onChange={this.onSearchChange}>Search</Search>
                <Button onClick={() => this.fetchAllUsers(page + 1)} type="button" className="btn btn-primary">
                    NextRecord
                </Button>
                <Button onClick={() => this.fetchAllUsers(page - 1)} type="button" className="btn btn-success">
                    PreviousRecord
                </Button>  
                { result ?
                        <Table list={result.content} pattern={searchUser} onDelete={this.onDelete}/>
                : null
                }   
            </div>
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

class Table extends Component{
    render(){
        const{pattern,list,onDelete} = this.props;
        return(
            <div className="table-responsive table-hover table-striped">
                <table className="table">
    ...             <thead className="thead-dark">
                        <tr>
                         <th scope="col">Email</th>
                         <th scope="col">EmployeeID</th>
                         <th scope="col">EmployeeLvl</th>
                         <th scope="col">PhoneNo</th>
                         <th scope="col">BankAccno</th>
                         <th scope="col">Gender</th>
                         <th scope="col">HireDate</th>
                         <th scope="col">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                         {list.filter(searchedForRecord(pattern)).map(user => 
                        <tr key={user.id}>
                          <td>{user.email}</td>
                          <td>{user.employeeid}</td>
                          <td>{user.employeelevel}</td>
                          <td>{user.phonenumber}</td>
                          <td>{user.bankaccountnumber}</td>
                          <td>{user.gender}</td>
                          <td>{user.hiredate}</td>
                          <td>
                             <input type="checkbox"/>
                          </td>
                          <td>
                              <Button onClick={() => onDelete(user.id)} type="button" className="btn btn-success">
                                Disable
                              </Button>
                              <Button onClick={() => onDelete(user.id)} type="button" className="btn btn-danger">
                                Delete
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

export default viewusers;

