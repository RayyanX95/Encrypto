import React, { Component } from 'react';

// import classes from './Modal.module.css';
import './modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate = (nextProps, nextState) => {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render() {

        return (
            <React.Fragment>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed} />
                    
                <div className='Modal'
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-50vh)',
                        opacity: this.props.show ? '1' : '0'
                    }} >
                    <h3>{this.props.title}</h3>
                    <hr/>
                    {this.props.children}
                </div>
            </React.Fragment >
        );
    }
}

export default Modal;