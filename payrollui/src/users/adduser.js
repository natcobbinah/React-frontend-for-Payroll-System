import React, { Component } from 'react'
import {PATH_ADDUSER} from '../API_URLS';

class adduser extends Component{
    constructor(props){
        super(props);

        this.state={
            address:'',
            city:'',
            email:'',
            employeeid:'',
            employeelevel:'',
            enabled: true,
            password:'',
            phonenumber:'',
            bankaccountnumbe:'',
            birthdate:'',
            gender:'',
            hiredate:'',
            maritalstatus:'',
            birthcertid:'',
            driverslicenseid:'',
            passportid:'',
            ssnitid:'',
            votersid:'',
            name:'',
        }

        this.getFormDataandSavetoDB = this.getFormDataandSavetoDB.bind(this);
    }

    getFormDataandSavetoDB(){
        const{
            address,city,email,employeeid,employeelevel,enabled,password,phonenumber,bankaccountnumber,birthdate,
            gender,hiredate,maritalstatus,birthcertid,driverslicenseid,passportid,ssnitid,votersid,name
        }=this.state;



      /*   console.log(name + ":" + address + ":" + password + ":" + phonenumber + ":" + bankaccountnumber + ":" + birthdate + ":" + hiredate + ":" + email);
        console.log(city + ":" + employeeid + ":" + employeelevel + ":" + enabled + ":" + gender + ":" + maritalstatus + ":" + birthcertid + ":" + driverslicenseid);
        console.log(passportid + ":" + ssnitid + ":" + votersid); */
    }

    render(){
        return(
            <div className="container-fluid mt-3">
                <form>
                    <div className="form-group">
                        <label htmlFor="fullnamelbl">Name</label>
                        <input type="text" class="form-control" id="fullnamelbl" placeholder="FullName here...." onChange={(e) => this.setState({name : e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="addresslbl">Address</label>
                        <input type="text" class="form-control" id="addresslbl" placeholder="Address here...." onChange={(e) => this.setState({address : e.target.value})}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="emaillbl">Email</label>
                          <input type="email" className="form-control" id="emaillbl" placeholder="Email here.." onChange={(e) => this.setState({email : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="passwordlbl">Password</label>
                          <input type="password" className="form-control" id="passwordlbl" placeholder="*********" onChange={(e) => this.setState({password : e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="genderlbl">Gender</label>
                          <input type="text" className="form-control" id="genderlbl" placeholder="Gender" onChange={(e) => this.setState({gender : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="dateofbirthlbl">Date of Birth</label>
                          <input type="date" className="form-control" id="dateofbirthlbl" onChange={(e) => this.setState({birthdate : e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="citylbl">City</label>
                            <input type="text" className="form-control" id="citylbl" placeholder="City name here..." onChange={(e) => this.setState({city : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="phonenumberlbl">PhoneNumber</label>
                            <input type="text" className="form-control" id="phonenumberlbl" placeholder="Phoneno here..." onChange={(e) => this.setState({phonenumber : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="maritalstatuslbl">Marital Status</label>
                            <input type="text" className="form-control" id="maritalstatuslbl" placeholder="Status here.." onChange={(e) => this.setState({maritalstatus : e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="employeeidlbl">EmployeeID</label>
                            <input type="text" className="form-control" id="employeeidlbl" placeholder="EmployeeID here.." onChange={(e) => this.setState({employeeid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="employeelvlbl">Employee Level</label>
                            <input type="text" className="form-control" id="employeelvlbl" placeholder="Position" onChange={(e) => this.setState({employeelevel : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="hiredatelbl">HireDate</label>
                            <input type="date" className="form-control" id="hiredatelbl" onChange={(e) => this.setState({hiredate : e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="bankaccnolbl">BankAccountNo</label>
                            <input type="text" className="form-control" id="bankaccnolbl" placeholder="356456453563" onChange={(e) => this.setState({bankaccountnumber : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="ssnitlbl">SSNIT_ID</label>
                            <input type="text" className="form-control" id="ssnitlbl" placeholder="25452354525" onChange={(e) => this.setState({ssnitid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="votersidlbl">VotersID</label>
                            <input type="text" className="form-control" id="votersidlbl" onChange={(e) => this.setState({votersid : e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="birthcertidlbl">BirthCertificate</label>
                            <input type="text" className="form-control" id="birthcertidlbl" placeholder="356456453563" onChange={(e) => this.setState({birthcertid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="driverslicenlbl">DriversLicense</label>
                            <input type="text" className="form-control" id="driverslicenlbl" placeholder="25452354525" onChange={(e) => this.setState({driverslicenseid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="passportlbl">PassportNo</label>
                            <input type="text" className="form-control" id="passportlbl" onChange={(e) => this.setState({passportid : e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-row">
                       <div className="form-group col-md-12">
                            <button type="button" className="btn btn-primary" onClick={this.getFormDataandSavetoDB}>Add User</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

//, , driverslicenseid, passportid, 
export default adduser;