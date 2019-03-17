import React from "react";

import classes from './EncryptingKey.module.css'

const encryptingKey = props => {
  return (
    <React.Fragment>
      <div className={classes.KeyMaindiv + " col-10 col-md-8 col-lg-3 mb-3 input-group"}>
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            The key
          </span>
        </div>
        <input
          type="text"
          onChange={props.keyHandler}
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
    </React.Fragment>
  );
};

export default encryptingKey;
