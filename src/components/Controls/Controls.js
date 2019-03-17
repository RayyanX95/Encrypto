import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";
import classes from "./Controls.module.css";

export default class Controls extends Component {
  state = {
    show: false
  }
  handleClose = () => {
    this.setState({ show: false });
  }
  render() {
    console.log('this.props.showModal: ', this.props.showModal);
    
    return (
      <React.Fragment>
        <div>
          <div className={classes.Controls + " row"}>
            <div className="col-0 col-md-2 col-lg-3 ml-5" />
            <button
              className="btn btn-danger"
              onClick={this.props.reset}
              disabled={this.props.disableReset}
            >
              Reset
            </button>
            <div className="col-1" />
            <button
              className="btn btn-success"
              onClick={this.props.encTxt}
              disabled={this.props.disableEnc}
            >
              Encrypt
            </button>
            <div className="col-1" />
            <button
              className="btn btn-danger"
              onClick={this.props.decTxt}
              disabled={this.props.disableReset}
            >
              Decrypt
            </button>
          </div>
        </div>
        <Modal
          show={this.props.showModal}
          modalClosed={this.props.closeModal}
          title='Cipher Text'
        >
          {this.props.encryptedTxt}
        </Modal>
      </React.Fragment>
    );
  }
}
