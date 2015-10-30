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


const Firebase = require('firebase');
const RaisedButton = Mui.RaisedButton;
const Paper = Mui.Paper;
const AppLoadingBar = require('./appLoadingBar');;
const Summary = require('./summary');;
const Notification = require('./notification');;

const Actions = require('./actions');
const Store = require('./store');




const AppHeader = React.createClass({
	render(){
		return (
			<div id='appHeader'>
				<Paper zDepth={1}>
					<h2>Maria Mulata</h2>
				</Paper>
			</div>
		);
	}
});


const App = React.createClass({

	childContextTypes : {
		muiTheme: React.PropTypes.object
	},

	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
		};
	},

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
			<AppHeader />
			<img src={this.state.image}/>
			<Notification  date={this.state.date}/>
			<div className="container">
				<div className="row">
					<Summary total={this.state.total} beef={this.state.beef} chicken={this.state.chicken} veg={this.state.veg} />
					<div id='products' className="col-lg-8 col-md-8 col-sm-12">
						<ItemList items = { this.state.items }/>
					</div>
				</div>
			</div>
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



ReactDOM.render(<AppLoadingBar />, window.document.getElementById('target'));


let firebase  = new Firebase("https://food-ordering.firebaseio.com/");

firebase.child('orders').limitToLast(1).on('child_added', (snapShot) => {
	console.log(snapShot.val());

	let initData = {
		items: [{text:'1', key: '1'}, {text:'2', key:'2'}],
		beef: 0,
		veg: 0,
		chicken: 0,
		total: 0,
		date: snapShot.val().date,
		image: require('../images/simple.jpg')
	};

	Store.setInitData(initData);

	Actions.appInit(() => {
		ReactDOM.render( <App/>, window.document.getElementById('target'));
		console.log('React App Started.');
	});
});




