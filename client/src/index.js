import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CustomButton from "./App";
import ChangeInput from "./App";
// import { Button, ButtonGroup } from "reactstrap";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<CustomButton />, document.getElementById("root"));
ReactDOM.render(<ChangeInput />, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();