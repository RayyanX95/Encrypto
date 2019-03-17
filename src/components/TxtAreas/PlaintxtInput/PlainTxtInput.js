import React from "react";

import classes from "./PlainTxtInput.module.css";

const txtArea = props => {
  return (
    <React.Fragment>
      <div className={classes.MainDiv + " row mb-0"}>
        <div className="col-11 col-md-10 col-lg-8 mx-auto px-1 input-group">
          <h2 className="pt-5 pb-1 clr-2">Encrypt your text online</h2>
          <div className="input-group">
            <textarea
              placeholder="Type a text here to Encrypt or Decrypt..."
              className="form-control"
              aria-label="With textarea"
              onChange={props.change}
              value={props.txt}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default txtArea;
