let injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

import {login} from "./login";
const React = require('react');
const ReactDOM = require('react-dom');
const Mui = require('material-ui');
const RaisedButton = Mui.RaisedButton;
const AppBar = Mui.AppBar;

const App = React.createClass({
	render(){
		return <div>
			<ItemList items = {[{text:'1', key: '1'}, {text:'2', key:'2'}]}/>
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
	render(){
		return(
			<div>
				<RaisedButton label={this.props.text} primary={true} />
			</div>
		)
	}
});

ReactDOM.render( <App/>, window.document.getElementById('target'));

console.log('React App Started.');
