import React, {Component} from 'react'
import {PARAM_PAGE,PATH_GETALL_BENEFITS,PATH_GETALL_DESIGNATION} from '../API_URLS'
import axios from 'axios'
import Modal from './Modal'

class ViewBenefits extends Component{
    constructor(props){
        super(props);

        this.state = {
            //attributes on benefits fetch 
            result: null,
            error: null,

            //modal attributes
            modal: false,

            //attributes on designation fetch
            resultDesignation:null,
            errorDesignation:null,

            //attribute to add benefits
            benefitname: '',
            calculatedamount:'',
            flatamount:'',
            frequency: '',
            designation:'',

            //checkbox state to activate  flatamount
            flatamountradiobtn:false,
            calculatedamoutradiobtn:false,
        }

        this.onDelete = this.onDelete.bind(this);
        this.showBenefitModal = this.showBenefitModal.bind(this);
        this.addBenefittoDB = this.addBenefittoDB.bind(this);
    }

    fetchAllBenefits(page = 0){
        axios.get(`${PATH_GETALL_BENEFITS}?${PARAM_PAGE}${page}`)
        .then(result => this.setState({result: result.data}))
        .catch(error => this.setState({error}));
    }

    fetchAllDesignations(pageDesignation = 0){
        axios.get(`${PATH_GETALL_DESIGNATION}?${PARAM_PAGE}${pageDesignation}`)
        .then(resultDesignation => this.setState({resultDesignation: resultDesignation.data}))
        .catch(errorDesignation => this.setState({errorDesignation}))
    }

    addBenefittoDB(){

    }

    onDelete(id){
        console.log(id);
    }

    showBenefitModal(){
        this.modalOpen();
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
        this.fetchAllBenefits();
        this.fetchAllDesignations();
    }

    render(){
        const{result,error, page = 0, pageDesignation = 0,
        modal, benefitname,calculatedamount,flatamount,frequency,
        flatamountradiobtn,calculatedamoutradiobtn,resultDesignation} = this.state;
        return(
            <div className="container-fluid">

                {error?
                 <div className="alert alert-danger" role="alert">
                    <p>Error Populating Records: Server might be down</p>
                 </div> : null
                }

                <div className="row">
                    <div className="col-md-6">
                      <ButtonCustom onClick={() => this.showBenefitModal()} type="button" className="btn btn-success">
                         Add Benefit
                      </ButtonCustom>  
                    </div>
                </div>

                <div className="row">
                  <Modal show={modal} handleClose={e => this.modalClose(e)}>
                     <div className="form-group">
                        <label htmlFor="designationname">Benefit Name</label>
                        <input type="text" value={benefitname} className="form-control" onChange={(e) => this.setState({benefitname : e.target.value})}/>
                     </div>
                     <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                     </div>
                     <div className="form-row">
                         <div className="form-group col-md-3">
                           <input className="form-check-input" type="radio" name="amountradiobtn" id="flatamountradbtn" onChange={(e) => this.setState({flatamountradiobtn : e.target.value, calculatedamoutradiobtn:false})} />
                           <label htmlFor="amount">Flat Amount</label>
                         </div>
                         <div className="form-group col-md-3">
                           <input className="form-check-input" type="radio" name="amountradiobtn" id="calcamountradbtn" onChange={(e) => this.setState({calculatedamoutradiobtn : e.target.value, flatamountradiobtn:false})} />
                           <label htmlFor="amount">Calculated Amount</label>
                         </div>
                     </div>
                     {flatamountradiobtn?
                         <div className="form-group">
                          <input type="text" value={flatamount} className="form-control" onChange={(e) => this.setState({flatamount : e.target.value})}/>
                        </div>
                      : null
                     }
                      {calculatedamoutradiobtn?
                         <div className="form-group">
                          <label htmlFor="amount">Amount</label>
                          <input type="text" value={calculatedamount} className="form-control" onChange={(e) => this.setState({calculatedamount : e.target.value})}/>
                          <label htmlFor="amount">% on Amount</label>
                          <input type="text"  className="form-control"/>
                        </div>
                      : null
                     }
                     <div className="form-group">
                        <label htmlFor="designationname">Frequency</label>
                        <input type="text" value={frequency} className="form-control" onChange={(e) => this.setState({frequency : e.target.value})}/>
                     </div>
                     <div className="form-group">
                       <div className="col-md-6">
                            <ButtonCustom onClick={() => this.fetchAllDesignations(pageDesignation - 1)} type="button" className="btn btn-success">
                                  PreviousRecord
                            </ButtonCustom>  
                            <ButtonCustom onClick={() => this.fetchAllDesignations(pageDesignation + 1)} type="button" className="btn btn-primary">
                                  NextRecord
                           </ButtonCustom>  
                       </div>

                        <label htmlFor="selectuser">Select Designation</label>
                        <select id="designationId">
                        {resultDesignation ?
                         resultDesignation.content.map(designation => (
                        <option value={designation.id}>{designation.designationname}</option>
                        ))
                        : null
                        }   
                        </select>
                        </div>
                     <div className="form-group">
                       <button type="button" className="btn btn-primary" onClick={this.addBenefittoDB}>Add</button>
                     </div>
                     </Modal>   
                 </div>

                <div className="row">
                    <div className="col-md-6">
                      <ButtonCustom onClick={() => this.fetchAllBenefits(page - 1)} type="button" className="btn btn-success">
                         PreviousRecord
                      </ButtonCustom>  
                    </div>
                    <div className="col-md-6">
                      <ButtonCustom onClick={() => this.fetchAllBenefits(page + 1)} type="button" className="btn btn-primary">
                        NextRecord
                      </ButtonCustom>  
                    </div>
                </div>

                {result?
                  <Table list={result.content} onDelete={this.onDelete}/>
                  : null
                }
              
            </div>
        );
    }
}

class Table extends Component{
    render(){
        const{list,onDelete} = this.props;
        return(
            <div className="table-responsive table-hover table-striped">
            <table className="table">
...             <thead className="thead-dark">
                    <tr>
                     <th scope="col">BENEFIT NAME</th>
                     <th scope="col">FREQUENCY</th>
                     <th scope="col">AMOUNT FLAT</th>
                     <th scope="col">AMOUNT CALCULATED</th>
                     <th scope="col">DESIGNATION NAME</th>
                     <th scope="col">DEPARTMENT NAME</th>
                     <th scope="col">ACTION</th>
                    </tr>
                 </thead>
                 <tbody>
                     {list.map(benefit => 
                    <tr key={benefit.id}>
                      <td>{benefit.benefitname}</td>
                      <td>{benefit.frequency}</td>
                      <td>{benefit.flatamount}</td>
                      <td>{benefit.calculatedamount}</td>
                      <td>{benefit.designation.designationname}</td>
                      <td>{benefit.designation.department.departmentname}</td>
                      <td> 
                        <ButtonCustom onClick={() => onDelete(benefit.id)} type="button" className="btn btn-danger">
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

export default ViewBenefits;