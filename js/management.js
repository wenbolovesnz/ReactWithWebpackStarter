const React = require('react');
const Store = require('./store');
const Mui = require('material-ui');
import { Router, Route, History, Link } from 'react-router'
const List = Mui.List;
const ListItem = Mui.ListItem;

const ManageOrders = React.createClass({
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
				<h3>Orders Management</h3>
				<div className="row">
					<div className="col-lg-12">
						<List>
							{this.state.orders.map((order) => {
								return(<li key={order.key}><Link to={`/manageOrders/${order.key}`}>{order.value.date}</Link></li>)
							})}
						</List>
					</div>
					<div className="col-lg-10">
						{this.props.children}
					</div>
				</div>
			</div>)
		}

});

module.exports = ManageOrders;