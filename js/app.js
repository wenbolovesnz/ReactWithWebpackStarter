let injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const React = require('react');
const ReactDOM = require('react-dom');
const Mui = require('material-ui');
const Firebase = require('firebase');
const RaisedButton = Mui.RaisedButton;
const CircularProgress = Mui.CircularProgress;
const Actions = require('./actions');
const Store = require('./store');


const App = React.createClass({
	getInitialState(){
		return Store.getInitData();
	},

	componentDidMount() {
		Store.addChangeListener(this._onChange);
	},

	componentWillUnmount() {
		Store.removeChangeListener(this._onChange);
	},

	_onChange() {
		this.setState(Store.getInitData());
	},

	render(){
		return <div>
			<div>{this.state.quantity}</div>
			<ItemList items = { this.state.items }/>
		</div>
	}
});

const ItemList = React.createClass({
	render(){
		return (
			<div>
				{this.props.items.map( item => {
					return (
						<Item {...item} />	
					);
				})}
			</div>	
		);
	}
});

const Item = React.createClass({
	handleClick(){
		Actions.addBeef({});
	},
	render(){
		return(
			<div>
				<RaisedButton label={this.props.text} primary={true} onClick={this.handleClick}/>
			</div>
		)
	}
});

ReactDOM.render(<CircularProgress mode="indeterminate" size={2} />, window.document.getElementById('target'));


let firebase  = new Firebase("https://food-ordering.firebaseio.com/");

firebase.child('orders').limitToLast(1).on('child_added', (snapShot) => {
	console.log(snapShot.val());
	Actions.appInit(() => {
		ReactDOM.render( <App/>, window.document.getElementById('target'));
		console.log('React App Started.');
	});
});




