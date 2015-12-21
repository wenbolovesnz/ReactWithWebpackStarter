const React = require('react');
import { Link, History } from 'react-router';
const FirebaseRef = require('./firebaseRef');
const Mui = require('material-ui');
const TextField = Mui.TextField;
const FlatButton = Mui.FlatButton;
const RaisedButton = Mui.RaisedButton;
const Checkbox = Mui.Checkbox;
const AppLoadingBar = require('./appLoadingBar');

const Login = React.createClass({
	mixins: [ History ],

	getInitialState() {
		return {
			email: '',
			password:'',
			error: '',
			isSubmitting: false
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
		this.state.isSubmitting = true;
		this.setState(this.state);
		FirebaseRef.authWithPassword({
			email: this.state.email,
			password: this.state.password
		}, (error, authData) => {
			if (error) {
				this.state.error = error.message;
				this.state.isSubmitting = false;
				this.setState(this.state);
			} else {
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
		if(this.state.isSubmitting === true){
			return (<AppLoadingBar />);
		}else{
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
									floatingLabelStyle={{color:'#B09F47'}}
									floatingLabelText="Email"
									value={this.state.email}
									type="email"
									hintStyle={{color: '#B09F47'}}
									onChange={this._emailChanges} />

								<TextField
									type="password"
									fullWidth={true}
									floatingLabelStyle={{color:'#B09F47'}}
									hintText="Please enter your password"
									floatingLabelText="Password"
									value={this.state.password}
									hintStyle={{color: '#B09F47'}}
									onChange={this._handlePasswordChanges} />
								<div>
									<RaisedButton type="submit" label="Login" primary={true} disabled = {this.state.isSubmitting}/>
								</div>

								<div className="error">
									{this.state.error}
								</div>

								<div>
									<Checkbox
										iconStyle={{
											fill: '#b71c1c'
										}}
										labelStyle={{
											color:'#B09F47'
										}}
										name="rememberMe"
										value={this.state.rememberMe}
										label="Remember Me"/>
								</div>

								<div>
                      <Link to="/resetPassword">Forgot your password?</Link>
								</div>

								<div>
									<span>Don't have an account ?</span> <Link to="/signup">Register here</Link>
								</div>



							</form>

						</div>

					</div>

				</div>
			)
		}

	}
});

module.exports = Login;