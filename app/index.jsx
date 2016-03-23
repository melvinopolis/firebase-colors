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
		//for live change to local and firebase
		this.ref.update({
			color: event.target.value
		})
		//for change to firebase on save (local state is still live)
		// this.setState({
		// 	color: event.target.value
		// })
	}

	backgroundChange(event) {
		//for live change to local and firebase
		this.ref.update({
			backgroundColor: event.target.value
		})
		//for change to firebase on save (local state is still live)
		// this.setState({
		// 	backgroundColor: event.target.value
		// })
	}

	save() {
		// this.ref.set({
		// 	color: this.state.color,
		// 	backgroundColor: this.state.backgroundColor
		// })
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
					<label htmlFor="color">font color: </label>
					<input type="text" id="color" value={this.state.color} onChange={this.colorChange.bind(this)} />
					<br />
					<label htmlFor="backgroundColor">background color: </label>
					<input type="text" id="backgroundColor" value={this.state.backgroundColor} onChange={this.backgroundChange.bind(this)} />
					{/* <button onClick={this.save.bind(this)}>save</button> */}
				</form>

				<div style={divStyles}>
					<h1>this is a preview</h1>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));