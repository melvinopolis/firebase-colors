import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			color: '',
			backgroundColor: ''
		}
		this.ref = new Firebase('https://colors-example.firebaseio.com/');
	}

	componentDidMount() {
		this.ref.on('value', (snapshot) => {
			this.setState({
				color: snapshot.val().color,
				backgroundColor: snapshot.val().backgroundColor
			})
		})
	}

	colorChange(event) {
		this.ref.update({
			color: event.target.value
		})
	}

	backgroundChange(event) {
		this.ref.update({
			backgroundColor: event.target.value
		})
	}

	render() {
		var divStyles = {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '500px',
			width: '500px',
			color: this.state.color,
			backgroundColor: this.state.backgroundColor
		}
		return (
			<div>
				<form>
					<input type="text" value={this.state.color} onChange={this.colorChange.bind(this)} />
					<input type="text" value={this.state.backgroundColor} onChange={this.backgroundChange.bind(this)} />
				</form>

				<div style={divStyles}>
					<h1>this is a preview</h1>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));