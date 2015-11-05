const React = require('react');
import { History } from 'react-router'
const FirebaseRef = require('./firebaseRef');
const Mui = require('material-ui');
const TextField = Mui.TextField;
const RaisedButton = Mui.RaisedButton;


const Login = React.createClass({
	mixins: [ History ],

	getInitialState() {
		return {
			email: '',
			password:'',
			error: false
		}
	},

	_emailChanges(event){
		this.state.email = event.target.value;
		this.setState(this.state);
	},

	_handlePasswordChanges(event){
		this.state.password = event.target.value;
		this.setState(this.state);
	},

	handleSubmit(event) {
		event.preventDefault();
		FirebaseRef.authWithPassword({
			email: this.state.email,
			password: this.state.password
		}, (error, authData) => {
			if (error) {
				this.state.error = error;
				this.setState(this.state);
			} else {
				console.log("Authenticated successfully with payload:", authData);
				const { location } = this.props;

				if (location.state && location.state.nextPathname) {
					this.history.replaceState(null, location.state.nextPathname)
				} else {
					this.history.replaceState(null, '/order')
				}
			}
		});
	},

	render() {
		return (
			<div>
				<div id="notification">
					<h3>Please login</h3>
				</div>
				<div className="row">
					<div className="loginForm col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3">

						<form onSubmit={this.handleSubmit} >
							<TextField
								fullWidth={true}
								hintText="Please enter your email address"
								floatingLabelStyle={{color:'whitesmoke'}}
								floatingLabelText="Email"
								value={this.state.email}
								type="email"
								hintStyle={{color: 'whitesmoke'}}
								onChange={this._emailChanges} />

							<TextField
								type="password"
								fullWidth={true}
								floatingLabelStyle={{color:'whitesmoke'}}
								hintText="Please enter your password"
								floatingLabelText="Password"
								value={this.state.password}
								hintStyle={{color: 'whitesmoke'}}
								onChange={this._handlePasswordChanges} />

							<div>
								<RaisedButton type="submit" label="Login" primary={true}/>
								<div className="error">
					        {this.state.error}
								</div>
							</div>


						</form>

					</div>

				</div>
			</div>
		)
	}
});

module.exports = Login;