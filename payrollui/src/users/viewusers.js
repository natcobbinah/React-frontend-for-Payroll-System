import React, {Component} from 'react';
import axios from 'axios';
import Modal from './Modal'
import {PATH_BASE,PATH_DELETEUSER,PARAM_DELETE
    ,PARAM_PAGE,PATH_SENDLOGINDETAILS,PATH_LOGINMESSAGE,PATH_SENDLOGINDETAILS_GMAIL,PATH_PATCH_EDITUSER} from '../API_URLS';
import 'bootstrap/dist/css/bootstrap.min.css';

const searchedForRecord = searchUser => user =>
    user.name.toLowerCase().includes(searchUser.toLowerCase());

class viewusers extends Component{
    constructor(props){
        super(props);

        this.state={
            searchUser:'',
            result: null,
            error:null,
            userstoDisable: [],
            checkedItems:[],

            //email message
            loginsentSuccess:null,
            loginsetnFailure:null,

            //modal attributes
            modal: false,

            //user attributes to edit
            id: '',
            address:'',
            city:'',
            email:'',
            employeeid:'',
            employeelevel:'',
            enabled: Boolean,
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

            //update userResponse attributes
            onUpdateSuccess:null,
            onUpdateError:null,
        }

        this.onDisableUsers = this.onDisableUsers.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.fetchAllUsers = this.fetchAllUsers.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSendLoginDetails = this.onSendLoginDetails.bind(this);
        this.onEditUser = this.onEditUser.bind(this);
        this.onUpdateUser = this.onUpdateUser.bind(this);
        this.onSelected = this.onSelected.bind(this);
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

    onDisableUsers(){
       /*  const{userstoDisable}=this.state;
        this.setState({
            userstoDisable: userstoDisable.push(id)
        })
        console.log(userstoDisable); */
        const{userstoDisable} = this.state;
        console.log(userstoDisable);
    }

    onDelete(id){
        const{userstoDisable} = this.state;
         if(userstoDisable[0] === id){
            userstoDisable.pop();
            axios.get(`${PATH_DELETEUSER}?${PARAM_DELETE}${id}`)
            this.componentDidMount();
        }else{
           window.alert("You need to select immediate checkbox before you can delete")
        } 
    }

    //'/test/sendemail/{to}/{subject}/{message}' MAILTRAP CILENT WORKS
    //http://localhost:2345/v1/test/sendLoginCredentials/{to}/{content} GMAIL CLIENT
    onSendLoginDetails(email,password){
        const{loginsetnFailure} = this.state;
        /* axios.get(`${PATH_SENDLOGINDETAILS}/${email}/${PATH_LOGINMESSAGE}/${password}`)
        .then(loginsentSuccess => this.setState({loginsentSuccess: loginsentSuccess.data}))
        .catch(loginsetnFailure => this.setState({loginsetnFailure})) */
        
        axios.get(`${PATH_SENDLOGINDETAILS_GMAIL}/${email}/${password}`)
        .then(loginsentSuccess => this.setState({loginsentSuccess: loginsentSuccess.data}))
        .catch(loginsetnFailure => this.setState({loginsetnFailure}))
        console.log(loginsetnFailure);
    }

    onSelected(id){
        const{userstoDisable} = this.state;
        userstoDisable.push(id);
        console.log(userstoDisable);
    }

    onEditUser(userid,useraddress,usercity,useremail,
        useremployeeid,useremployeelevel,userenabled,userpassword,userphonenumber,
        userbankaccountnumber,userbirthdate,usergender,userhiredate,usermaritalstatus,
        userbirthcertid,userdriverslicenseid,userpassportid,userssnitid,uservotersid,
        username,usertinnumber,usermarriagecertid,userusercreator){

        this.setState({
            id: userid,
            address: useraddress,
            city: usercity,
            email: useremail,
            employeeid: useremployeeid,
            employeelevel: useremployeelevel ,
            enabled: userenabled,
            password: userpassword,
            phonenumber: userphonenumber,
            bankaccountnumber:userbankaccountnumber,
            birthdate: userbirthdate,
            gender:usergender,
            hiredate: userhiredate,
            maritalstatus:usermaritalstatus,
            birthcertid: userbirthcertid,
            driverslicenseid: userdriverslicenseid,
            passportid: userpassportid,
            ssnitid: userssnitid,
            votersid:uservotersid,
            tinnumber: usertinnumber,
            marriagecertid: usermarriagecertid,
            usercreator: userusercreator,
            name: username,
       })

       this.modalOpen();
    }

    onUpdateUser(){
        const{id, address,city,email,employeeid,employeelevel,enabled,password,phonenumber,bankaccountnumber,birthdate,
            gender,hiredate,maritalstatus,birthcertid,driverslicenseid,passportid,ssnitid,votersid,name,tinnumber,
            marriagecertid,usercreator} = this.state;
        
            const headers = { 'content-type': 'application/json'};
            axios({
                method: 'patch',
                url: PATH_PATCH_EDITUSER,
                data: {
                    id:id,
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
            .then(onUpdateSuccess => this.setState({onUpdateSuccess: onUpdateSuccess.data}))
            .catch(onUpdateError => this.setState({onUpdateError}));
            
            this.fetchAllUsers();    
    }

    modalOpen(){
        this.setState({
            modal: true
        })
    }

    modalClose(){
        this.setState({
            modal: false,
        })
    }

    componentDidMount(){
        this.fetchAllUsers();
    }
    
    render(){
        const{searchUser,error,page = 0,result,loginsentSuccess,
            loginsetnFailure,modal,id,onUpdateSuccess,onUpdateError,

            //checkbox array
            userstoDisable,
            //user data attributes
            address,city,email,employeeid,employeelevel,password,phonenumber,bankaccountnumber,birthdate,
            gender,hiredate,maritalstatus,birthcertid,driverslicenseid,passportid,ssnitid,votersid,name,tinnumber,
            marriagecertid,
        } = this.state;
        return(
            <div>
                 <nav className="navbar navbar-expand-lg navbar-light bg-light my-2 pt-2">
                    <Search value={searchUser} onChange={this.onSearchChange}>Search</Search>
                 </nav>

                {onUpdateSuccess?
                   <div className="alert alert-success" role="alert">
                   <p>User Record updated successfully</p>
                 </div> : null
                }

                {onUpdateError?
                   <div className="alert alert-danger" role="alert">
                   <p>Error: Updating User record Unsuccessful: Server might have a problem</p>
                 </div> : null
                }

                <div className="form-row">
                    <div className="form-group col-md-3">
                      <Button onClick={() => this.fetchAllUsers(page - 1)} type="button" className="btn btn-success">
                       <i class="fa fa-arrow-left" aria-hidden="true"></i>
                      </Button> 
                    </div>
                    <div className="form-group col-md-3"></div> 
                    <div className="form-group col-md-3"></div> 
                    <div className=" float-right form-group col-md-3">
                     <Button onClick={() => this.fetchAllUsers(page + 1)} type="button" className="btn btn-primary">
                     <i class="fa fa-arrow-right" aria-hidden="true"></i>
                     </Button>    
                    </div> 
                </div>
                
                {  error? 
                    <div className="alert alert-danger" role="alert">
                    <p>Error fetching  records Server might be down</p>
                  </div> : null
                }

                { loginsetnFailure? 
                    <div className="alert alert-danger" role="alert">
                    <p>Error sending login details</p>
                  </div> : null
                }

                { loginsentSuccess? 
                    <div className="alert alert-success" role="alert">
                    <p>Login details sent successfully</p>
                  </div> : null
                }

                {id?
                 <Modal show={modal} handleClose={e => this.modalClose(e)}>
                    <div>
                    <form>
                    <div className="form-group">
                        <label htmlFor="fullnamelbl">Name</label>
                        <input type="text" value={name} className="form-control" id="fullnamelbl" placeholder="FullName here...." onChange={(e) => this.setState({name : e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="addresslbl">Address</label>
                        <input type="text" value={address} className="form-control" id="addresslbl" placeholder="Address here...." onChange={(e) => this.setState({address : e.target.value})}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="emaillbl">Email</label>
                          <input type="email" value={email} className="form-control" id="emaillbl" placeholder="Email here.." onChange={(e) => this.setState({email : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="passwordlbl">Password</label>
                          <input type="password" value={password} className="form-control" id="passwordlbl" placeholder="*********" onChange={(e) => this.setState({password : e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-3">
                          <label htmlFor="genderlbl">Gender</label>
                          <input type="text" value={gender} className="form-control" id="genderlbl" placeholder="Gender" onChange={(e) => this.setState({gender : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                          <label htmlFor="dateofbirthlbl">Date of Birth</label>
                          <input type="date" value={birthdate} className="form-control" id="dateofbirthlbl" onChange={(e) => this.setState({birthdate : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="hiredatelbl">HireDate</label>
                            <input type="date" value={hiredate} className="form-control" id="hiredatelbl" onChange={(e) => this.setState({hiredate : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="citylbl">City</label>
                            <input type="text" value={city} className="form-control" id="citylbl" placeholder="City name here..." onChange={(e) => this.setState({city : e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="phonenumberlbl">PhoneNumber</label>
                            <input type="text" value={phonenumber} className="form-control" id="phonenumberlbl" placeholder="Phoneno here..." onChange={(e) => this.setState({phonenumber : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="maritalstatuslbl">Marital Status</label>
                            <input type="text" value={maritalstatus} className="form-control" id="maritalstatuslbl" placeholder="Status here.." onChange={(e) => this.setState({maritalstatus : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="employeeidlbl">EmployeeID</label>
                            <input type="text" value={employeeid} className="form-control" id="employeeidlbl" placeholder="EmployeeID here.." onChange={(e) => this.setState({employeeid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="employeelvlbl">Employee Level</label>
                            <input type="text" value={employeelevel} className="form-control" id="employeelvlbl" placeholder="Position" onChange={(e) => this.setState({employeelevel : e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="bankaccnolbl">BankAccountNo</label>
                            <input type="text" value={bankaccountnumber} className="form-control" id="bankaccnolbl" placeholder="356456453563" onChange={(e) => this.setState({bankaccountnumber : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="ssnitlbl">SSNIT_ID</label>
                            <input type="text" value={ssnitid} className="form-control" id="ssnitlbl" placeholder="25452354525" onChange={(e) => this.setState({ssnitid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="votersidlbl">VotersID</label>
                            <input type="text" value={votersid} className="form-control" id="votersidlbl" onChange={(e) => this.setState({votersid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="birthcertidlbl">BirthCertificate</label>
                            <input type="text" value={birthcertid} className="form-control" id="birthcertidlbl" placeholder="356456453563" onChange={(e) => this.setState({birthcertid : e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="driverslicenlbl">DriversLicense</label>
                            <input type="text" value={driverslicenseid} className="form-control" id="driverslicenlbl" placeholder="25452354525" onChange={(e) => this.setState({driverslicenseid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="passportlbl">PassportNo</label>
                            <input type="text" value={passportid} className="form-control" id="passportlbl" onChange={(e) => this.setState({passportid : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="tinnolbl">Tin Number</label>
                            <input type="text" value={tinnumber} className="form-control" id="tinnolbl" placeholder="25452354525" onChange={(e) => this.setState({tinnumber : e.target.value})}/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="marriagecertID">Marriage CertificateID</label>
                            <input type="text" value={marriagecertid} className="form-control" id="marriagecertID" onChange={(e) => this.setState({marriagecertid : e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-row">
                       <div className="form-group col-md-12">
                            <button type="button" className="btn btn-success" onClick={this.onUpdateUser}>Update Record</button>
                        </div>
                    </div>
                </form>    
                    </div> 
                 </Modal>
                :null
                }

                { result ?
                        <Table list={result.content} pattern={searchUser} onDelete={this.onDelete} onDisableUsers={this.onDisableUsers} 
                        onSendLoginDetails={this.onSendLoginDetails}
                        onEditUser={this.onEditUser} onSelected={this.onSelected}/>
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
               <div className="form-group">
                    {children}<input type="text" value={value} onChange={onChange} className="form-control form-control-lg" placeholder="Search for user by name" aria-label="Search"/>
               </div>
            </form>
        );
    }
}

class Table extends Component{
    render(){
        const{pattern,list,onDelete,onDisableUsers,onSendLoginDetails,
            onEditUser,onSelected} = this.props;
         return(
            <div> 
            <table className="table-responsive table-sm table-hover table-striped ">
               <thead className="table-dark">
                  <tr>
                     <th scope="col">Email</th>
                     <th scope="col">EmployeeID</th>
                     <th scope="col">EmployeeLvl</th>
                     <th scope="col">PhoneNumber</th>
                     <th scope="col">BankAccountNo</th>
                     <th scope="col">Hiredate</th>
                     <th scope="col"><i class="fa fa-eercast" aria-hidden="true"></i></th>
                     <th scope="col">#</th>
                     <th scope="col">#</th>
                     <th scope="col">#</th>
                     <th scope="col">#</th>
                     <th scope="col">#</th>
                  
                 </tr>
                </thead>
                <tbody>
                 {list.filter(searchedForRecord(pattern)).map(user => 
                    <tr key={user.id} className="align-bottom">
                    <td>{user.email}</td>
                    <td>{user.employeeid}</td>
                    <td>{user.employeelevel}</td>
                    <td>{user.phonenumber}</td>
                    <td>{user.bankaccountnumber}</td>
                    <td>{user.hiredate}</td>
                    <td>
                      <input type="checkbox"  onChange={() => onSelected(user.id)}/>
                    </td>
                    <td>
                        <Button onClick={() => onDisableUsers()} type="button" className="btn btn-success">
                        <i class="fa fa-toggle-on" title="Disable" aria-hidden="true"></i>
                        </Button>
                    </td>
                    <td>
                        <Button onClick={() => onDisableUsers(user.id)} type="button" className="btn btn-info">
                        <i class="fa fa-toggle-on" title="Disable" aria-hidden="true"></i>
                        </Button>
                    </td>
                     <td>
                        <Button onClick={() => onEditUser(user.id,user.address,user.city,user.email,
                         user.employeeid,user.employeelevel,user.enabled,user.password,user.phonenumber,
                         user.bankaccountnumber,user.birthdate,user.gender,user.hiredate,user.maritalstatus,
                         user.birthcertid,user.driverslicenseid,user.passportid,user.ssnitid,user.votersid,
                         user.name,user.tinnumber,user.marriagecertid,user.usercreator
                         )} type="button" className="btn btn-primary">
                            <i className="fa fa-pencil-square-o" title="Edit"></i>
                         </Button>
                      </td>
                      <td>
                          <Button onClick={() => onDelete(user.id)} type="button" className="btn btn-danger">
                          <i className="fa fa-trash" title="Delete" ></i>
                          </Button>
                      </td>
                      <td>
                           <Button onClick={() => onSendLoginDetails(user.email,user.password)} type="button" className="btn btn-dark">
                           <i class="fa fa-envelope" aria-hidden="true" title="Send Login Details"></i>
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

