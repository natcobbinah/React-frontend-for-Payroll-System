import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from './Modal'


class ModalFormTest extends Component{
    constructor(props){
        super(props);

        this.state ={
            modal: false,
            name: '',
            modalInputName: '',
        }
    }

    handleSubmit(e){
        this.setState({
            name: this.state.modalInputName
        })
        this.modalClose();
    }

    modalOpen(){
        this.setState({
            modal: true
        })
    }

    modalClose(){
        this.setState({
            modalInputName: '',
            modal: false,
        })
    }

    render(){
        const{modalInputName,name}=this.state;
        return(
            <div className="ModalFormTest">
               <h1>Hello!! {name}</h1>
               <a href="javascript:;" onClick={e => this.modalOpen(e)}>Open Modal</a>
                
                     <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
                    <h2>Hello Modal</h2> 
                    <div className="form-group">
                        <label>Enter Name </label>
                        <input type="text" value={modalInputName} className="form-control"
                        onChange={(e) => this.setState({modalInputName: e.target.value})} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-success" onClick={e => this.handleSubmit(e)}>
                            Save
                        </button>
                    </div>
               </Modal>
            </div>
        );
    }
}
export default ModalFormTest;