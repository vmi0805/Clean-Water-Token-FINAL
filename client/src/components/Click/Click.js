
import React from "react";
import { Button } from 'reactstrap';


class Click extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
	alert("hi,i've been clicked");			
				}

  render() {
    return (
      <Button color={"success"} onClick={this.handleClick}>
      </Button>
    );
  }
}

export default Click;