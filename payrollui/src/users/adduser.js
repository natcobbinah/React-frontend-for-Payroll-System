import React, { Component } from 'react'
import axios from 'axios';
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
            bankaccountnumber:'',
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
            tinnumber:'',
            marriagecertid:'',
            usercreator:'',

            error:null,
            postRecordSuccess:null,
        }

        this.getFormDataandSavetoDB = this.getFormDataandSavetoDB.bind(this);
    }

    getFormDataandSavetoDB(){
        const{
            address,city,email,employeeid,employeelevel,enabled,password,phonenumber,bankaccountnumber,birthdate,
            gender,hiredate,maritalstatus,birthcertid,driverslicenseid,passportid,ssnitid,votersid,name,tinnumber,
            marriagecertid,usercreator
        }=this.state;

        const headers = { 'content-type': 'application/json'};

        axios({
            method: 'post',
            url: PATH_ADDUSER,
            data: {
                address: address,
                city: city,
                email: email,
                employeeid: employeeid,
                employeelevel: employeelevel ,
                enabled: enabled,
                password: password,
                phonenumber: phonenumber,
                bankaccountnumber:bankaccountnumber,
                birthdate: birthdate,
                gender:gender,
                hiredate: hiredate,
                maritalstatus:maritalstatus,
                birthcertid: birthcertid,
                driverslicenseid: driverslicenseid,
                passportid: passportid,
                ssnitid: ssnitid,
                votersid:votersid,
                tinnumber: tinnumber,
                marriagecertid: marriagecertid,
                usercreator: usercreator,
                name: name,
            },
            headers: headers
        })
        .then(postRecordSuccess => this.setState({postRecordSuccess: postRecordSuccess.data}))
        .catch(error => this.setState({error}));
    }

    render(){
        const{error, postRecordSuccess} = this.state;
        return(
            <div className="container-fluid mt-3">
                { error ?
                   <div className="alert alert-danger" role="alert">
                     <p>Error saving using record</p>
                   </div> : null
                }
                { postRecordSuccess ?
                    <div className="alert alert-success" role="alert">
                      <p>User record successfully saved</p>
                  </div>  :
                  null     
                }
                <form>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="fullnamelbl">Name</label>
                        <input type="text" class="form-control" id="fullnamelbl" placeholder="FullName here...." onChange={(e) => this.setState({name : e.target.value})}/>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="addresslbl">Address</label>
                        <input type="text" class="form-control" id="addresslbl" placeholder="Address here...." onChange={(e) => this.setState({address : e.target.value})}/>
                      </div>
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
                        <div className="form-group col-md-3">
                          <label htmlFor="genderlbl">Gender</label>
                          <input type="text" className="form-control" id="genderlbl" placeholder="Gender" onChange={(e) => this.setState({gender : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                          <label htmlFor="dateofbirthlbl">Date of Birth</label>
                          <input type="date" className="form-control" id="dateofbirthlbl" onChange={(e) => this.setState({birthdate : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="employeelvlbl">Employee Level</label>
                            <input type="text" className="form-control" id="employeelvlbl" placeholder="Position" onChange={(e) => this.setState({employeelevel : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="hiredatelbl">HireDate</label>
                            <input type="date" className="form-control" id="hiredatelbl" onChange={(e) => this.setState({hiredate : e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="citylbl">City</label>
                            <input type="text" className="form-control" id="citylbl" placeholder="City name here..." onChange={(e) => this.setState({city : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="phonenumberlbl">PhoneNumber</label>
                            <input type="text" className="form-control" id="phonenumberlbl" placeholder="Phoneno here..." onChange={(e) => this.setState({phonenumber : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="maritalstatuslbl">Marital Status</label>
                            <input type="text" className="form-control" id="maritalstatuslbl" placeholder="Status here.." onChange={(e) => this.setState({maritalstatus : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="employeeidlbl">EmployeeID</label>
                            <input type="text" className="form-control" id="employeeidlbl" placeholder="EmployeeID here.." onChange={(e) => this.setState({employeeid : e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="bankaccnolbl">BankAccountNo</label>
                            <input type="text" className="form-control" id="bankaccnolbl" placeholder="356456453563" onChange={(e) => this.setState({bankaccountnumber : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="ssnitlbl">SSNIT_ID</label>
                            <input type="text" className="form-control" id="ssnitlbl" placeholder="25452354525" onChange={(e) => this.setState({ssnitid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="votersidlbl">VotersID</label>
                            <input type="text" className="form-control" id="votersidlbl" onChange={(e) => this.setState({votersid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="birthcertidlbl">BirthCertificate</label>
                            <input type="text" className="form-control" id="birthcertidlbl" placeholder="356456453563" onChange={(e) => this.setState({birthcertid : e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="driverslicenlbl">DriversLicense</label>
                            <input type="text" className="form-control" id="driverslicenlbl" placeholder="25452354525" onChange={(e) => this.setState({driverslicenseid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="passportlbl">PassportNo</label>
                            <input type="text" className="form-control" id="passportlbl" onChange={(e) => this.setState({passportid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="tinnolbl">Tin Number</label>
                            <input type="text" className="form-control" id="tinnolbl" placeholder="25452354525" onChange={(e) => this.setState({tinnumber : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="marriagecertID">Marriage CertificateID</label>
                            <input type="text" className="form-control" id="marriagecertID" onChange={(e) => this.setState({marriagecertid : e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-row">
                       <div className="form-group col-md-3">
                            <button type="button" className="btn btn-primary" onClick={this.getFormDataandSavetoDB}>Add User</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


export default adduser;