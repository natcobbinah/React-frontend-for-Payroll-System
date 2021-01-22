import React from 'react';
import './modal.css'

const Modal =({handleClose,show,children}) =>{
    const showHideClassName = show ? "modal d-block" : "modal d-none";

    return(
        <div className={showHideClassName}>
            <div className="container mt-5 modalClass">
                <div className="col-md-3"></div>
                    <div className="col-md-6 mt-5">
                          {children}
                          <a href="javascript:;" className="modal-close" onClick={handleClose}>
                           Close
                          </a>
                    </div>
                 <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default Modal;