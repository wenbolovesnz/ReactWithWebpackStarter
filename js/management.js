const React = require('react');
const Store = require('./store');
const Mui = require('material-ui');
import { Router, Route, History, Link } from 'react-router'
const List = Mui.List;
const ListItem = Mui.ListItem;
const ListDivider = Mui.ListDivider;


const ManageOrders = React.createClass({
	mixins: [ History ],

	getInitialState(){
		return {
			orders: []
		}
	},

	componentDidMount() {
		Store.addChangeListener(this._onChange);
		Store.getDataForManagement();
	},

	componentWillUnmount() {
		Store.removeChangeListener(this._onChange);
	},

	_onChange() {
		let newStates = {
			orders: Store.getOrdersData()
		};

		this.setState(newStates);
	},

	render(){
			return (<div>
				<div className="row">
					<div className="col-lg-12">
						<h3>Orders Management</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12">
						<List>
							{this.state.orders.map((order) => {
								return(<OrderDateLink order={order} key={order.key}/>);
							})}
						</List>
					</div>
				</div>
			</div>)
		}
});

const OrderDateLink = React.createClass({
	mixins: [ History ],

	_handleClick(){
		let newLink = '/manageOrders/' + this.props.order.key;
		this.history.pushState(null, newLink);
	},

	render(){
		return(<div><ListItem key={this.props.key} primaryText={this.props.order.value.date} onClick={this._handleClick}/><ListDivider/></div>);
	}
});

module.exports = ManageOrders;