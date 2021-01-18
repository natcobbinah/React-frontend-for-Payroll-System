import React, {Component} from 'react';
import axios from 'axios';
import {PATH_ADDUSER} from '../API_URLS'

class edituser extends Component{
    constructor(props){
        super(props);

        this.state = {
            searchUser:'',
            result: null,
            error:null
        }

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.fetchAllUsersByName = this.fetchAllUsersByName.bind(this);
    }

    //'http://localhost:2345/v1/test/user/{name}';
    fetchAllUsersByName(searchUser){
        axios.get(`${PATH_ADDUSER}/${searchUser}`)
        .then(result => this.setState({result: result.data}))
        .catch(error => this.setState({error}));
   }

   onSearchChange(event){
       this.setState({
           searchUser: event.target.value
       })
   }

   //fetches from the server via the apiURL fetch function
   onSearchSubmit(event){
        const{searchUser}= this.state;
        this.fetchAllUsersByName(searchUser);
        event.preventDefault();
   }

    render(){
        const{searchUser,result,error} = this.state;
        if(error){
            return <p>Something went wrong</p>
        }
        return(
            <div className="container-fluid mt-3">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Search value={searchUser} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>Search</Search>
                </nav>
                {result ?
                <DisplayUserForm list={result}/>
                : null}
            </div>
        );
    }
}

class Search extends Component{
    render(){
        const{value,onChange,onSubmit,children} = this.props;
        return(
           <form className="form-inline mr-5 my-2 my-lg-0" onSubmit={onSubmit}>
                {children} <input className="form-control  mr-sm-2" type="text" value={value} onChange={onChange} placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        );
    }
}

class DisplayUserForm extends Component{
    render(){
        const{list} = this.props;
        return(  
            <div>
               <form> 
                   {list.map(user => 
                    <div>
                    <div className="form-group">
                        <label htmlFor="fullnamelbl">Name</label>
                        <input type="text" value={user.name} className="form-control" id="fullnamelbl" placeholder="FullName here...."/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="addresslbl">Address</label>
                        <input type="text"  value={user.address} className="form-control" id="addresslbl" placeholder="Address here...."/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="emaillbl">Email</label>
                          <input type="email" value={user.email} className="form-control" id="emaillbl" placeholder="Email here.."/>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="passwordlbl">Password</label>
                          <input type="password" value={user.password} className="form-control" id="passwordlbl" placeholder="*********"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="genderlbl">Gender</label>
                          <input type="text" value={user.gender} className="form-control" id="genderlbl" placeholder="Gender"/>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="dateofbirthlbl">Date of Birth</label>
                          <input type="date" value={user.birthdate} className="form-control" id="dateofbirthlbl"/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="citylbl">City</label>
                            <input type="text" value={user.city} className="form-control" id="citylbl" placeholder="City name here..."/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="phonenumberlbl">PhoneNumber</label>
                            <input type="text" value={user.phonenumber} className="form-control" id="phonenumberlbl" placeholder="Phoneno here..."/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="maritalstatuslbl">Marital Status</label>
                            <input type="text" value={user.maritalstatus} className="form-control" id="maritalstatuslbl" placeholder="Status here.."/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="employeeidlbl">EmployeeID</label>
                            <input type="text" value={user.employeeid} className="form-control" id="employeeidlbl" placeholder="EmployeeID here.."/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="employeelvlbl">Employee Level</label>
                            <input type="text" value={user.employeelevel} className="form-control" id="employeelvlbl" placeholder="Position"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="hiredatelbl">HireDate</label>
                            <input type="date" value={user.hiredate} className="form-control" id="hiredatelbl"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="bankaccnolbl">BankAccountNo</label>
                            <input type="text" value={user.bankaccountnumber} className="form-control" id="bankaccnolbl" placeholder="356456453563"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="ssnitlbl">SSNIT_ID</label>
                            <input type="text" value={user.ssnitid} className="form-control" id="ssnitlbl" placeholder="25452354525"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="votersidlbl">VotersID</label>
                            <input type="text" value={user.votersid} className="form-control" id="votersidlbl"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="birthcertidlbl">BirthCertificate</label>
                            <input type="text" value={user.birthcertid} className="form-control" id="birthcertidlbl" placeholder="356456453563"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="driverslicenlbl">DriversLicense</label>
                            <input type="text" value={user.driverslicenseid} className="form-control" id="driverslicenlbl" placeholder="25452354525"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="passportlbl">PassportNo</label>
                            <input type="text" value={user.passportid} className="form-control" id="passportlbl"/>
                        </div>
                    </div>
                    <div className="form-row">
                       <div className="form-group col-md-12">
                            <button type="button" className="btn btn-primary">Update User Details</button>
                        </div>
                    </div>
                    </div>
                    )}
                </form> 
                </div>
        );
    }
}

export default edituser;