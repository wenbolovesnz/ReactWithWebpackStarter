const React = require('react');
import { Link, History } from 'react-router'
const FirebaseRef = require('./firebaseRef');
const Mui = require('material-ui');
const TextField = Mui.TextField;
const FlatButton = Mui.FlatButton;
const RaisedButton = Mui.RaisedButton;
const AppLoadingBar = require('./appLoadingBar');

const ResetPassword = React.createClass({
    mixins: [ History ],

    getInitialState() {
        return {
            email: '',
            error: false,
            success: ''
        }
    },

    _emailChanges(event){
        this.state.email = event.target.value;
        this.setState(this.state);
    },

    showError(msg){
        this.state.success = '';
        this.state.error = msg;
        this.setState(this.state);
    },

    showSuccess(msg){
        this.state = this.getInitialState();
        this.state.success = msg;
        this.setState(this.state);
    },

    handleSubmit(event) {
        event.preventDefault();

        FirebaseRef.resetPassword({
            email: this.state.email
        }, (error) =>  {
            if (error) {
                switch (error.code) {
                    case "INVALID_USER":
                        this.showError("The specified user account does not exist.");
                        break;
                    default:
                        this.showError("Error resetting password:", error);
                }
            } else {
                this.showSuccess("Password reset email sent successfully!");
            }
        });

    },

    render() {

            return (
                <div>
                    <div id="notification">
                        <h3>Reset Password</h3>
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

                                <div>
                                    <RaisedButton type="submit" label="Reset password" primary={true} />
                                    <Link to="/login" className="pull-right"><RaisedButton label="Cancel" primary={true} /></Link>
                                </div>

                                <div className="error">
                                    {this.state.error}
                                </div>
                                <div>
                                    <p>{this.state.success}</p>
                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            )
        }
});

module.exports = ResetPassword;