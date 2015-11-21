const React = require('react');
const FirebaseRef = require('./firebaseRef');
const Mui = require('material-ui');
const RaisedButton = Mui.RaisedButton;
const TextField = Mui.TextField;


const Account = React.createClass({

    getInitialState(){
      return {
          currentPassword: '',
          newPassword: '',
          confirmNewPassword:'',
          error:'',
          success:''
      };
    },

    _showError(error){
        this.state.success = '';
        this.state.error = error;
        this.setState(this.state);
    },

    _handleSavePassword(event){
        event.preventDefault();
        var userAuthInfo = FirebaseRef.getAuth().password;

        if(userAuthInfo && this.state.newPassword === this.state.confirmNewPassword){
            FirebaseRef.changePassword({
                email: userAuthInfo.email,
                oldPassword: this.state.currentPassword,
                newPassword: this.state.newPassword
            }, (error) => {
                if (error) {
                    switch (error.code) {
                        case "INVALID_PASSWORD":
                            this._showError("The specified user account password is incorrect.");
                            break;
                        case "INVALID_USER":
                            this._showError("The specified user account does not exist.");
                            break;
                        default:
                            this._showError("Error changing password:", error);
                    }
                } else {
                    this.state = this.getInitialState();
                    this.state.success = "User password changed successfully!";
                    this.setState(this.state);
                }
            });

        }



    },

    _handleNewPasswordChanges(event){
        this.state.newPassword = event.target.value;
        this.setState(this.state);
    },

    _currentPasswordChanges(event){
        this.state.currentPassword = event.target.value;
        this.setState(this.state);
    },

    _handleConfirmNewPasswordChanges(event){
        this.state.confirmNewPassword = event.target.value;
        this.setState(this.state);
    },

    render(){
        return(
            <div className="col-lg-12">

                <div id="notification">
                    <h3>Change password</h3>
                </div>
                <div className="row">
                    <div className="loginForm col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3">

                        <form onSubmit={this._handleSavePassword} >
                            <TextField
                                fullWidth={true}
                                hintText="Please enter your current password"
                                floatingLabelStyle={{color:'whitesmoke'}}
                                floatingLabelText="Current password"
                                value={this.state.currentPassword}
                                type="password"
                                hintStyle={{color: 'whitesmoke'}}
                                onChange={this._currentPasswordChanges} />

                            <TextField
                                type="password"
                                fullWidth={true}
                                floatingLabelStyle={{color:'whitesmoke'}}
                                hintText="Please enter your new password"
                                floatingLabelText="New password"
                                value={this.state.newPassword}
                                hintStyle={{color: 'whitesmoke'}}
                                onChange={this._handleNewPasswordChanges} />

                            <TextField
                                type="password"
                                fullWidth={true}
                                floatingLabelStyle={{color:'whitesmoke'}}
                                hintText="Please confirm your new password"
                                floatingLabelText="Confirm new password"
                                value={this.state.confirmNewPassword}
                                hintStyle={{color: 'whitesmoke'}}
                                onChange={this._handleConfirmNewPasswordChanges} />

                            <div>
                                <RaisedButton type="submit" label="Save" primary={true}/>
                            </div>
                            <div className="error">
                                {this.state.error}
                            </div>


                        </form>

                    </div>

                </div>
            </div>
        );
    }
});

module.exports = Account;