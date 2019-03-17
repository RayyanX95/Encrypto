import React, { Component } from "react";

export default class CipherOut extends Component {
  state = {
    cipherTxt: ""
  };

  render() {
    let cipher = "";
    if (this.props.doesShow) {
      cipher = <samp>{this.props.encryptedTxt}</samp>;
    } else {
      cipher = <samp>The Encrypted text will appeare here!!</samp>;
    }
    // this.setState({ cipherTxt: cipher });

    return (
      <div className="row mb-5">
        <div className='col-lg-8 center m-auto'>{cipher}</div>
      </div>
    );
  }
}
