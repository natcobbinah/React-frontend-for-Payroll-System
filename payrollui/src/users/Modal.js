import React from 'react';
import './modal.css'

const Modal =({handleClose,show,children}) =>{
    const showHideClassName = show ? "modal d-block" : "modal d-none";

    return(
        <div className={showHideClassName}>
            <div className="container mt-2 modalClass">
                <div className="col-md-3"></div>
                    <div className="col-md-12 mt-2">
                         {/* content goes here */}
                         {children}
                           <a   class="btn btn-primary" href="javascript:;" role="button" className="modal-close" onClick={handleClose}>
                           Close
                          </a>
                    </div>
                 <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default Modal;