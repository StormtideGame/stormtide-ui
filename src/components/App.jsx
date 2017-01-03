// @flow

import React from "react";

import { Game } from "stormtide-core";

export default class App extends React.Component {
	state = {
		value: 0
	};

	increment = () => {
		this.setState({
			value: this.state.value + 1
		});
	};

	render() {
		return (
			<div className="App" onClick={ this.increment }>
				App ({ this.state.value })
			</div>
		);
	}
}