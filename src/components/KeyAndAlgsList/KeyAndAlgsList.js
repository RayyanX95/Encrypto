import React from "react";

import AlgorithmsList from "../AlgorithmsList/AlgorithmsList";
import EncryptingKey from "../EncryptingKey/EncryptingKey";

const KeyAndAlgsList = props => (
  <div className="row mb-5 mt-5">
    <div className="col-lg-2 ml-5" />
    <AlgorithmsList
      handler={props.handler}
      submit={props.submit}
      alg={props.alg}
    />
    <div className="col-lg-1" />
    <EncryptingKey keyHandler={props.keyHandler} clearKey={props.clearKey} />
  </div>
);
export default KeyAndAlgsList;
