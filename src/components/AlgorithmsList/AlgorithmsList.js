import React from "react";

import classes from "./AlgorithmsList.module.css";

const AlgorithmsList = props => {
  return (
    <React.Fragment>
      <div className={classes.SelectMaindiv + " col-10 col-md-8 col-lg-3 mb-3 mt-0 input-group"}>
        <select
          className="browser-default custom-select"
          // value={props.alg}
          onChange={props.handler}
        >
          <option defaultChecked>Choose an Algorithm</option>
          <option value="ceaser">Ceaser Cipher</option>
          <option value="playfair">Playfair Cipher</option>
          <option value="des">DES Cipher</option>
        </select>
      </div>
    </React.Fragment>
  );
};

export default AlgorithmsList;
