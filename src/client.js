// @flow

import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

const app = document.createElement("div");
app.classList.add("StormtideContext");

document.body.appendChild(app);

ReactDOM.render(
	React.createElement(App, null),
	app
);