require('../css/bootstrap.css');
require('../css/app.css');
import {login} from "./login";

const React = require('react');

const App = React.createClass({
	render(){
		return <div>
			<ItemList items = {[{text:'1'}, {text:'2'}]}/>
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
})

const Item = React.createClass({
	render(){
		return(
			<div>
				{ this.props.text}									
			</div>
		)
	}
});

React.render( <App/>, window.document.getElementById('target'));

login('owen', 'goodman');


console.log('React App Started.');
