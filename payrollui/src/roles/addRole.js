import React,{Component} from 'react'
import axios from 'axios'
import {PATH_ADD_ROLE} from '../API_URLS'
import 'bootstrap/dist/css/bootstrap.min.css';

class AddRole extends Component{
    constructor(props){
        super(props);

        this.state = {
            rolename: '',

            errorpost:null,
            resultpost:null,
        }

        this.addRoletoDB = this.addRoletoDB.bind(this);
    }

    addRoletoDB(){
        const{rolename} = this.state;
        const headers = { 'content-type': 'application/json'};

        axios({
            method: 'post',
            url: PATH_ADD_ROLE,
            data: {
                rolename: rolename,
            },
            headers: headers
        })
        .then(resultpost => this.setState({resultpost: resultpost.data}))
        .catch(errorpost => this.setState({errorpost}));
    }

    render(){
        const{errorpost,resultpost} = this.state;
        return(
            <div className="container-fluid">
                  {errorpost ?
                        <div className="alert alert-danger" role="alert">
                              <p>Error saving Role to database: SERVER MIGHT DOWN</p>
                        </div> : null
                    }
                    { resultpost ?
                        <div className="alert alert-success" role="alert">
                            <p>Role Saved Successfully to database</p>
                        </div> : null     
                     }
                      <form>
                          <div className="form-group">
                            <label htmlFor="rolenamelble">Rolename</label>
                            <input type="text" class="form-control" id="rolenamelble" placeholder="rolename  here...." onChange={(e) => this.setState({rolename : e.target.value})}/>
                          </div>
                          <ButtonCustom onClick={this.addRoletoDB} type="button" className="btn btn-success">
                              Add Role
                          </ButtonCustom>  
                       </form>
            </div>
        )
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


export default AddRole;