import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import {PATH_FINDUSERBY_EMAIL,PATH_ADDUSER} from '../API_URLS';
import './loginform.css'

class Loginform extends Component{
  //to cater for no-op warning when axios operations
  //are not yet done, but the components renders a 
  //different page and the componentUmounts
  _isMounted = false;

  constructor(props){
    super(props);

      this.state ={
          //creating user credentials
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
          tier2: '',
          tinnumber:'',
          marriagecertid:'',
          usercreator:'Google',

          postRecordSuccess:null,

          //basic auth with springsecurity
          //email: '', already in the variables states above
          //password: '', 
          error: null,
          result: null,

          //login in with google
          buttonText:'Login With Google',
          googlename:null,
          googleemail:null,
          googletoken:null,
          googleProviderId: 'Google',
          onGoogleLoginSuccess: null,
          onGoogleLoginFailure: null,
          clientId: '552767747033-o7fm828mscm2otn5oprkfjjtq3qscqad.apps.googleusercontent.com'
      }

      this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleLoginSubmit(event){
      event.preventDefault();
      const{email,password} = this.state;
      console.log(email + ":" + password );
      this.props.history.push("/main")  
    }

    signUpUserIfnotINDB(response){
        //checking error when component unmounts
        this._isMounted = true;

        //get email,name and googleId from response and
        const{googlename,googletoken,googleProviderId,error,postRecordSuccess,
          address,city,email,employeeid,employeelevel,enabled,password,phonenumber,bankaccountnumber,birthdate,
          gender,hiredate,maritalstatus,birthcertid,driverslicenseid,passportid,ssnitid,votersid,name,usercreator
        } = this.state;

        const headers = { 'content-type': 'application/json'};

        let googleEmail = response.profileObj.email;
        let googleIdasPasswrd = response.profileObj.googleId;
        let googleName = response.profileObj.name;

        console.log(response);

   /*    if(response){ 
        //check if user is present in database
        axios.get(`${PATH_FINDUSERBY_EMAIL}/${googleEmail}`)
        .then(result => this.setState({result: result.data}))
        .catch(error => this.setState({error}));
      }
       */
      if(response){
        //then create user
        axios({
          method: 'post',
          url: PATH_ADDUSER,
          data: {
              address: '',
              city: '',
              email: googleEmail,
              employeeid: '',
              employeelevel: '' ,
              enabled: enabled,
              password: googleIdasPasswrd,
              phonenumber: '',
              bankaccountnumber:'',
              birthdate: '',
              gender:'',
              hiredate: '',
              maritalstatus:'',
              birthcertid: '',
              driverslicenseid: '',
              passportid: '',
              ssnitid: '',
              votersid:'',
              name: googleName,
              tier2: '',
              tinnumber:'',
              marriagecertid:'',
              usercreator:usercreator,
             
          },
          headers: headers
      })
      .then(postRecordSuccess => this._isMounted && this.setState({postRecordSuccess: postRecordSuccess.data}))
      .catch(error => this._isMounted && this.setState({error}))
      }
        //redirect to main dashboard
        this.props.history.push("/main")  
    }

    componentWillMount(){
      this._isMounted = false;
    }

    render(){
      const{buttonText,clientId}=this.state;
      const onGoogleLoginSuccess = (response) =>{
        let res = response.profileObj;
        console.log(res);

        this.signUpUserIfnotINDB(response);
      }

      const onGoogleLoginFailure = (response) =>{
        let res = response.profileObj;
        console.log(res);
      }
      
      return(
        <div className="container-fluid  rowSidenav">
          <div className="row rowSidenav">
          <div className="col-md-3 sidebarlogin"></div>
          <div className="col-md-2"></div>
          <div className="col-md-4 mt-5 mx-4 rowMainnav">
            <GoogleLogin clientId={clientId} buttonText={buttonText}
                           onSuccess={onGoogleLoginSuccess}
                           onFailure={onGoogleLoginFailure}/>
                     <form>
                      <div className="form-group my-5 ">
                        <label htmlFor="emaillbl">Email</label>
                        <input type="email" className="form-control" id="emaillbl" placeholder="Email here..." onChange={(e) => this.setState({email: e.target.value})}/>
                     </div>
                     <div className="form-group">
                        <label htmlFor="passwordlbl">Password</label>
                        <input type="password" className="form-control" id="passwordlbl" placeholder="password here..." onChange={(e) => this.setState({password: e.target.value})}/>
                     </div>

                     <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block" onClick={this.handleLoginSubmit}>Login</button>
                    </div>
                    </form>
            </div>
          </div>
        </div>
      );
    }
}

export default Loginform