import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

class MyComponent extends Component {
  handleClickOutside = evt => {
    console.log("OUTSIDE CLIIIIIIIICK!")
  };
}

export default onClickOutside(MyComponent);