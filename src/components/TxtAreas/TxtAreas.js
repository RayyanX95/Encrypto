import React from "react";

import PlainTxtInput from "./PlaintxtInput/PlainTxtInput";

const txtArea = props => {
  return (
    <React.Fragment>
      <PlainTxtInput
        reset={props.doesReset}
        txt={props.inputTxt}
        change={props.change} // change event
      />
      {/* <CipherOut encryptedTxt={props.encryptedTxt} doesShow={props.doesShow} /> */}
    </React.Fragment>
  );
};

export default txtArea;
