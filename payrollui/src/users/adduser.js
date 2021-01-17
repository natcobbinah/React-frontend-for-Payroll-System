import React, { Component } from 'react'

class adduser extends Component{
    render(){
        return(
            <div className="container-fluid mt-3">
                <form>
                    <div className="form-group">
                        <label htmlFor="fullnamelbl">Name</label>
                        <input type="text" class="form-control" id="fullnamelbl" placeholder="FullName here...."/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="addresslbl">Address</label>
                        <input type="text" class="form-control" id="addresslbl" placeholder="Address here...."/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="emaillbl">Email</label>
                          <input type="email" className="form-control" id="emaillbl" placeholder="Email here.."/>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="passwordlbl">Password</label>
                          <input type="password" className="form-control" id="passwordlbl" placeholder="*********"/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="genderlbl">Gender</label>
                          <input type="text" className="form-control" id="genderlbl" placeholder="Gender"/>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="dateofbirthlbl">Date of Birth</label>
                          <input type="date" className="form-control" id="dateofbirthlbl"/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="citylbl">City</label>
                            <input type="text" className="form-control" id="citylbl" placeholder="City name here..."/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="phonenumberlbl">PhoneNumber</label>
                            <input type="text" className="form-control" id="phonenumberlbl" placeholder="Phoneno here..."/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="maritalstatuslbl">Marital Status</label>
                            <input type="text" className="form-control" id="maritalstatuslbl" placeholder="Status here.."/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="employeeidlbl">EmployeeID</label>
                            <input type="text" className="form-control" id="employeeidlbl" placeholder="EmployeeID here.."/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="employeelvlbl">Employee Level</label>
                            <input type="text" className="form-control" id="employeelvlbl" placeholder="Position"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="hiredatelbl">HireDate</label>
                            <input type="date" className="form-control" id="hiredatelbl"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="bankaccnolbl">BankAccountNo</label>
                            <input type="text" className="form-control" id="bankaccnolbl" placeholder="356456453563"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="ssnitlbl">SSNIT_ID</label>
                            <input type="text" className="form-control" id="ssnitlbl" placeholder="25452354525"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="votersidlbl">VotersID</label>
                            <input type="date" className="form-control" id="votersidlbl"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="birthcertidlbl">BirthCertificate</label>
                            <input type="text" className="form-control" id="birthcertidlbl" placeholder="356456453563"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="driverslicenlbl">DriversLicense</label>
                            <input type="text" className="form-control" id="driverslicenlbl" placeholder="25452354525"/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="passportlbl">PassportNo</label>
                            <input type="date" className="form-control" id="passportlbl"/>
                        </div>
                    </div>
                    <div className="form-row">
                       <div className="form-group col-md-12">
                            <button type="button" className="btn btn-primary">Add User</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

//, , driverslicenseid, passportid, 
export default adduser;