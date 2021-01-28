import React, {Component} from 'react'
import {PARAM_PAGE,PATH_GETALL_BENEFITS,PATH_GETALL_DESIGNATION,PATH_POST_BENEFIT
   ,PATH_DELETE_BENEFIT,NO_OF_DESIGNATIONS,PATH_GET_DEPARTMENT} from '../API_URLS'
import axios from 'axios'
import Modal from './Modal'

class ViewBenefits extends Component{
    constructor(props){
        super(props);

        this.state = {
            //attributes on benefits fetch 
            result: null,
            error: null,

            //attributes on departments fetch
            resultDept:null,
            errorDept:null,

            //modal attributes
            modal: false,
            editmodal:false,

            //attributes on designation fetch
            resultDesignation:null,
            errorDesignation:null,

            //attribute to add benefits
            benefitname: '',
            calculatedamount:'',
            percentageonCalcamount: '',
            flatamount:'',
            designation:'',

            //checkbox state to activate  flatamount
            flatamountradiobtn:false,
            calculatedamoutradiobtn:false,

            //posting benefits to db result objects
            onPostSuccess:null,
            onPostFailure:null,

            //ondelete benefits attributes
            resultOndelete:null,
            errorOndelete:null,

            //attributes to store onedit clicked button
            bid: '',
            bbenefitname:'',
            bcalcamount:'',
            bflatamount:'',
            bpercentageValue:'',
            bfrequency:'',
            bdesignationid:'',
            bdesignationname:'',
            bdesignationdeptid:'',
            bdesignationdeptdid:'',
            bdesignationdeptdeptname:'',

            //multiple select attribute
            selectedDesignations:'',
            selectedDepartments: '',
        }

        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.showBenefitModal = this.showBenefitModal.bind(this);
        this.addBenefittoDB = this.addBenefittoDB.bind(this);
        this.clearModalFields = this.clearModalFields.bind(this);
        this.multipleselectHandler =this.multipleselectHandler.bind(this);
        this.multipleselectHandlerDept = this.multipleselectHandlerDept.bind(this);
    }

    fetchAllBenefits(page = 0){
        axios.get(`${PATH_GETALL_BENEFITS}?${PARAM_PAGE}${page}`)
        .then(result => this.setState({result: result.data}))
        .catch(error => this.setState({error}));
    }

    fetchAllDepartments(pageDept = 0){
        axios.get(`${PATH_GET_DEPARTMENT}?${PARAM_PAGE}${pageDept}`)
        .then(resultDept => this.setState({resultDept: resultDept.data}))
        .catch(errorDept => this.setState({errorDept}));
    }

    fetchAllDesignations(pageDesignation = 0){
        axios.get(`${PATH_GETALL_DESIGNATION}?${PARAM_PAGE}${pageDesignation}`)
        .then(resultDesignation => this.setState({resultDesignation: resultDesignation.data}))
        .catch(errorDesignation => this.setState({errorDesignation}))
    }

    multipleselectHandler(event){
        const selected=[];
        let selectedOption = (event.target.selectedOptions);

        for(let i=0; i < selectedOption.length; i++){
            selected.push(selectedOption.item(i).value)
        }
        this.setState({
            selectedDesignations:selected
        })
    }

    multipleselectHandlerDept(event){
        const selectedDept=[];
        let selectedOption = (event.target.selectedOptions);

        for(let i=0; i < selectedOption.length; i++){
            selectedDept.push(selectedOption.item(i).value)
        }
        this.setState({
            selectedDepartments:selectedDept
        })
    }

    ///test/benefit/{benefitname}/{calculatedamount}/{flatamount}/{frequency}/{percentagevalue}/{departments}
    //http://localhost:2345/v1/test/benefit/DeptDesMINIXTest/0/111/Monthly/0/2,3?designations=6,7
    addBenefittoDB(){
        const{benefitname,calculatedamount,flatamount,
        percentageonCalcamount,selectedDesignations,selectedDepartments} = this.state;
        //let selectedDesignation = document.getElementById('designationId').value;
        
        let selectedFrequency = document.getElementById('frequencyId').value;
        //console.log(selectedDesignations);
        //console.log(selectedDepartments);

         let computationsonCalculatedAmount = ((+percentageonCalcamount/100) * +calculatedamount)
 
         axios.post(`${PATH_POST_BENEFIT}/${benefitname}/${computationsonCalculatedAmount}/${flatamount}/
         ${selectedFrequency}/${percentageonCalcamount}/${selectedDepartments}?${NO_OF_DESIGNATIONS}${selectedDesignations}`) 
         .then(onPostSuccess => this.setState({onPostSuccess: onPostSuccess.data}))
         .catch(onPostFailure => this.setState({onPostFailure}));   
    }

    clearModalFields(){
        this.setState({
            benefitname: '',
            calculatedamount:'',
            percentageonCalcamount: '',
            flatamount:'',
            designation:'',
            flatamountradiobtn:false,
            calculatedamoutradiobtn:false,
        })
    }

    onDelete(id){
        axios.get(`${PATH_DELETE_BENEFIT}/${id}`)
        .then(resultOndelete => this.setState({resultOndelete: resultOndelete.data}))
        .catch(errorOndelete => this.setState({errorOndelete}))
        this.fetchAllBenefits();
    }

    onEdit(benefitid,bbenefitname,bculatedamount,bflatamount,bfrequency,
        bpercentagevalue,bdesid,bdesdesname,bdesdeptid, bdesdeptdeptid,bdesdeptdeptname){
        
        this.setState({
            bid: benefitid,
            bbenefitname:bbenefitname,
            bcalcamount:bculatedamount,
            bflatamount:bflatamount,
            bpercentageValue: bpercentagevalue,
            bfrequency:bfrequency,
            bdesignationid:bdesid,
            bdesignationname:bdesdesname,
            bdesignationdeptid:bdesdeptid,
            bdesignationdeptdid:bdesdeptdeptid,
            bdesignationdeptdeptname:bdesdeptdeptname,
        })

        this.showEditModal();
    }

    showBenefitModal(){
        this.modalOpen();
    }

    modalOpen(){
        this.setState({
            modal: true,
            benefitname: '',
            calculatedamount:'',
            percentageonCalcamount: '',
            flatamount:'',
            designation:'',
        })
    }

    modalClose(){
        this.setState({
            modal: false,
        })
    }

    showEditModal(){
        this.modalOpen();
    }

    EditmodalOpen(){
        this.setState({
            editmodal: true
        })
    }

    EditmodalClose(){
        this.setState({
            bid: '',
            bbenefitname:'',
            bcalcamount:'',
            bflatamount:'',
            bpercentageValue:'',
            bfrequency:'',
            bdesignationid:'',
            bdesignationname:'',
            bdesignationdeptid:'',
            bdesignationdeptdid:'',
            bdesignationdeptdeptname:'',
            editmodal: false,
        })
    }

    componentDidMount(){
        this.fetchAllBenefits();
        this.fetchAllDesignations();
        this.fetchAllDepartments();
    }

    render(){
        const{result,error, page = 0, pageDesignation = 0,
        modal, benefitname,calculatedamount,flatamount,
        flatamountradiobtn,calculatedamoutradiobtn,resultDesignation,
        percentageonCalcamount,onPostSuccess,onPostFailure,
        resultOndelete,errorOndelete, 
        bid,bbenefitname,bcalcamount,bflatamount,bfrequency,bdesignationid,bdesignationname,
        bdesignationdeptid,designationdeptdid,bdesignationdeptdeptname,
        bpercentageValue,editmodal,pageDept = 0, resultDept, errorDept} = this.state;
        return(
            <div className="container-fluid">

                {error?
                 <div className="alert alert-danger" role="alert">
                    <p>Error Populating Records: Server might be down</p>
                 </div> : null
                }

                {errorOndelete?
                 <div className="alert alert-danger" role="alert">
                    <p>Error deleting Benefit: Operation unsuccessful</p>
                 </div> : null
                }  

                {resultOndelete?
                 <div className="alert alert-success" role="alert">
                    <p>Benefit deleted successfully</p>
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
                      {onPostSuccess?
                        <div className="alert alert-success alert-dismissible" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>  
                            <p>Benefit record saved successfully</p>
                        </div> : null
                      }
                      {onPostFailure?
                        <div className="alert alert-danger" role="alert">
                            <p>Error: Saving benefit record Unsuccessful</p>
                        </div> : null
                      }
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
                          <input type="text" value={flatamount} className="form-control" onChange={(e) => this.setState({flatamount : e.target.value, calculatedamount: '0',percentageonCalcamount:'0'})}/>
                        </div>
                      : null
                     }
                      {calculatedamoutradiobtn?
                         <div className="form-group">
                          <label htmlFor="amount">Amount</label>
                          <input type="text" value={calculatedamount} className="form-control" onChange={(e) => this.setState({calculatedamount : e.target.value, flatamount: '0'})}/>
                          <label htmlFor="amount">% on Amount</label>
                          <input type="text" value={percentageonCalcamount} className="form-control" onChange={(e) => this.setState({percentageonCalcamount : e.target.value})} className="form-control"/>
                        </div>
                      : null
                     }
                     <div className="form-group">
                        <label htmlFor="designationname">Frequency</label>
                        <select class="form-select" aria-label="Default select example" id="frequencyId">
                            <option value="1month">1month</option>
                            <option value="2months">2months</option>
                            <option value="3months">3months</option>
                            <option value="4months">4months</option>
                            <option value="5months">5months</option>
                            <option value="6months">6months</option>
                            <option value="7months">7months</option>
                            <option value="8months">8months</option>
                            <option value="9months">9months</option>
                            <option value="10months">10months</option>
                            <option value="11months">11months</option>
                            <option value="12months">12months</option>
                        </select>
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

                        <label htmlFor="selectuser">Select Designation(s)</label>
                        <select className="form-select" multiple id="designationId" onChange={this.multipleselectHandler}>
                        {resultDesignation ?
                         resultDesignation.content.map(designation => (
                        <option value={designation.id}>{designation.designationname}</option>
                        ))
                        : null
                        }   
                        </select>
                        </div> 

                        {/* department section */}
                        <div className="form-group">
                       <div className="col-md-6">
                            <ButtonCustom onClick={() => this.fetchAllDepartments(pageDept - 1)} type="button" className="btn btn-success">
                                  PreviousRecord
                            </ButtonCustom>  
                            <ButtonCustom onClick={() => this.fetchAllDepartments(pageDept + 1)} type="button" className="btn btn-primary">
                                  NextRecord
                           </ButtonCustom>  
                       </div>

                        <label htmlFor="selectuser">Select Department(s)</label>
                        <select className="form-select" multiple id="deptId" onChange={this.multipleselectHandlerDept}>
                        {resultDept ?
                         resultDept.content.map(department => (
                        <option value={department.id}>{department.departmentname}</option>
                        ))
                        : null
                        }   
                        </select>
                        </div> 

                        

                     <div className="form-group">
                       <button type="button" className="btn btn-primary" onClick={this.addBenefittoDB}>Add</button>
                       <button type="button" className="btn btn-primary" onClick={this.clearModalFields}>Clear</button>
                     </div>
                     </Modal>   
                 </div>

               {/* on edit clicked========================================================================================================= */}
                <div className="row">
               <Modal show={editmodal} handleClose={e => this.EditmodalClose(e)}>
                     <div className="form-group">
                        <label htmlFor="designationname">Benefit Name</label>
                        <input type="text" value={bbenefitname} className="form-control" onChange={(e) => this.setState({bbenefitname : e.target.value})}/>
                     </div>
                     <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                     </div>
                     {bflatamount?
                         <div className="form-group">
                          <input type="text" value={bflatamount} className="form-control" onChange={(e) => this.setState({bflatamount : e.target.value})}/>
                        </div>
                      : null
                     }
                      {bcalcamount?
                         <div className="form-group">
                          <label htmlFor="amount">Amount</label>
                          <input type="text" value={bcalcamount} className="form-control" onChange={(e) => this.setState({bcalcamount : e.target.value})}/>
                          <label htmlFor="amount">% on Amount</label>
                          <input type="text" value={bpercentageValue} className="form-control" onChange={(e) => this.setState({bpercentageValue : e.target.value})} className="form-control"/>
                        </div>
                      : null
                     }
                     <div className="form-group">
                        <label htmlFor="designationname">Frequency</label>
                        <select class="form-select" aria-label="Default select example" id="editfrequencyId">
                            <option selected>{bfrequency}</option>
                            <option value="1month">1month</option>
                            <option value="2months">2months</option>
                            <option value="3months">3months</option>
                            <option value="4months">4months</option>
                            <option value="5months">5months</option>
                            <option value="6months">6months</option>
                            <option value="7months">7months</option>
                            <option value="8months">8months</option>
                            <option value="9months">9months</option>
                            <option value="10months">10months</option>
                            <option value="11months">11months</option>
                            <option value="12months">12months</option>
                        </select>

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
                        <option value={designation.id == bdesignationid }>{designation.designationname}</option>
                        ))
                        : null
                        }   
                        </select>
                        </div>
                     <div className="form-group">
                       <button type="button" className="btn btn-primary" onClick={this.updateBenefit}>Update</button>
                     </div>
                     </Modal>  
                 </div> 
               {/* on edit clicked end line================================================================================================ */}

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
                  <Table list={result.content} onDelete={this.onDelete} onEdit={this.onEdit}/>
                  : null
                }
              
            </div>
        );
    }
}


class Table extends Component{
    render(){
        const{list,onDelete,onEdit} = this.props;
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
                        <ButtonCustom onClick={() => onEdit(benefit.id,benefit.benefitname,
                            benefit.calculatedamount,benefit.flatamount, benefit.percentagevalue,
                            benefit.frequency,
                            benefit.designation.id,benefit.designation.designationname,
                            benefit.designation.department.id, benefit.designation.department.departmentid,
                            benefit.designation.department.departmentname)} type="button" className="btn btn-danger">
                                Edit
                        </ButtonCustom> 
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