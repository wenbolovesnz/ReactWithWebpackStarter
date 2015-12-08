let injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

require('../css/bootstrap.css');
require('../css/app.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Mui = require('material-ui');
const MyRawTheme = require('./myTheme');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');
const RaisedButton = Mui.RaisedButton;
const IconButton = Mui.IconButton;
const Login = require('./login');
const AppHeader = require('./appHeader');
const FirebaseRef = require('./firebaseRef');
const Order = require('./order');
const SignUp = require('./signup');
const ManageOrders = require('./management');
const ManageOrder = require('./manageOrder');
const Account = require('./Account');
const ResetPassword = require('./resetPassword');

import { Router, Route, Link, IndexRoute, History } from 'react-router'

const NoMatch = React.createClass({
	render() {
		return (
			<div>
				<h1>No Match</h1>
			</div>
		)
	}
});

const App = React.createClass({
	mixins: [ History ],

	getInitialState() {
		return {
			loggedIn: FirebaseRef.getAuth()
		}
	},

	_logout(){
		FirebaseRef.unauth();
		this.history.pushState(null, '/login');
	},

	_goToAccount(){
        this.history.pushState(null, '/account');
	},

	_updateAuth(authData) {
		if(authData){
			this.setState({
				loggedIn: true
			});
		}else{
			this.setState({
				loggedIn: false
			});
			this.history.pushState(null, '/login');
		}
	},

	componentWillMount() {
		FirebaseRef.onAuth(this._updateAuth);
	},

	childContextTypes : {
		muiTheme: React.PropTypes.object
	},

	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
		};
	},

	render(){
		return <div>
			<AppHeader />
			{ this.state.loggedIn ? (<div className="row ">
				<IconButton iconStyle={{color:"#B09F47" }}
					className="pull-right logout-btn"
					iconClassName="material-icons"
					tooltipPosition="bottom-center"
					onClick={this._logout}
					tooltip="Log out">exit_to_app</IconButton>

				<IconButton iconStyle={{color:"#B09F47" }}
							className="pull-left account-btn"
							iconClassName="material-icons"
							tooltipPosition="bottom-center"
							onClick={this._goToAccount}
							tooltip="Account">person</IconButton>
			</div>): ''}
			{this.props.children}
		</div>
	}
});


let requireAuth = (nextState, replaceState) => {
	if (!FirebaseRef.getAuth()){
		replaceState({ nextPathname: nextState.location.pathname }, '/login')
	}
};

ReactDOM.render((
	<Router>
		<Route path="/" component={App}>
			<IndexRoute component={Order} onEnter={requireAuth} />
			<Route path="order" component={Order} onEnter={requireAuth} />
			<Route path="login" component={Login} />
			<Route path="signup" component={SignUp} />
			<Route path="account" component={Account} />
			<Route path="resetPassword" component={ResetPassword} />
			<Route path="manageOrders" component={ManageOrders}/>
			<Route path="/manageOrders/:key" component={ManageOrder}/>
			<Route path="*" component={NoMatch}/>
		</Route>
	</Router>
), window.document.getElementById('target'));







