const React = require('react');
import { History } from 'react-router'
const FirebaseRef = require('./firebaseRef');
const Mui = require('material-ui');
const TextField = Mui.TextField;
const RaisedButton = Mui.RaisedButton;


const SignUp = React.createClass({
	mixins: [ History ],

	getInitialState() {
		return {
			email: '',
			password:'',
			confirmPassword:'',
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

	_handleConfirmPasswordChanges(event){
		this.state.confirmPassword = event.target.value;
		this.setState(this.state);
	},

	_displayNameChanges(event){
		this.state.displayName = event.target.value;
		this.setState(this.state);
	},

	handleSubmit(event) {
		event.preventDefault();

		if(this.state.password === this.state.confirmPassword){
			FirebaseRef.createUser({
				email: this.state.email,
				password: this.state.password
			}, (error, userData) => {
				if (error) {
					switch (error.code) {
						case "EMAIL_TAKEN":
							this.state.error = "The new user account cannot be created because the email is already in use.";
							break;
						case "INVALID_EMAIL":
							this.state.error = "The specified email is not a valid email.";
							break;
						default:
							this.state.error = "Error creating user";
					}
					this.setState(this.state);
				} else {
					console.log("Successfully created user account with uid:", userData.uid);
					FirebaseRef.child("users").child(userData.uid).set(userData, () => {
						FirebaseRef.authWithPassword({
							email: this.state.email,
							password: this.state.password
						}, (error, authData) => {
							if (error) {
								this.error = "Login Failed!";
							} else {
								userData.provider = authData.provider;
								userData.displayName= this.state.displayName;
								userData.username = authData.password.email.replace(/@.*/, '');
								userData.email = authData.password.email;
								FirebaseRef.child("users").child(userData.uid).set(userData);

								const { location } = this.props;
								if (location.state && location.state.nextPathname) {
									this.history.replaceState(null, location.state.nextPathname)
								} else {
									this.history.replaceState(null, '/order')
								}
							}
						});
					});
				}
			});
		}else{
			this.state.error = 'Password and confirm password must be the same.';
			this.setState(this.state);
		}
	},

	render() {
		return (
			<div>
				<div id="notification">
					<h3>Please sign up</h3>
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
								fullWidth={true}
								hintText="Please enter your prefered display name"
								floatingLabelStyle={{color:'whitesmoke'}}
								floatingLabelText="Display name"
								value={this.state.displayName}
								type="text"
								hintStyle={{color: 'whitesmoke'}}
								onChange={this._displayNameChanges} />

							<TextField
								type="password"
								fullWidth={true}
								floatingLabelStyle={{color:'whitesmoke'}}
								hintText="Please enter your password"
								floatingLabelText="Password"
								value={this.state.password}
								hintStyle={{color: 'whitesmoke'}}
								onChange={this._handlePasswordChanges} />

							<TextField
								type="password"
								fullWidth={true}
								floatingLabelStyle={{color:'whitesmoke'}}
								hintText="Please confirm your password"
								floatingLabelText="Confirm Password"
								value={this.state.confirmPassword}
								hintStyle={{color: 'whitesmoke'}}
								onChange={this._handleConfirmPasswordChanges} />

							<div>
								<RaisedButton type="submit" label="SignUp" primary={true}/>
							</div>
							<div className="error">
					        {this.state.error}
							</div>
						</form>

					</div>

				</div>
			</div>
		)
	}
});

module.exports = SignUp;