const React = require('react');
const Store = require('./store');
const AppLoadingBar = require('./appLoadingBar');;
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');

const ManageOrder = React.createClass({
	getInitialState(){
		return Store.getOrderDetailsByKeyFromLocal();
	},

	componentDidMount() {
		Store.addChangeListener(this._onChange);
		Store.getOrderDetailsByKeyFromRemote(this.props.params.key);
	},

	componentWillUnmount() {
		Store.removeChangeListener(this._onChange);
	},

	_getTotal(){
		return this.state.data.reduce((sum, user) => {
			sum += (user.currentOrderDetailsForUser.beef || 0) + (user.currentOrderDetailsForUser.veg || 0) + (user.currentOrderDetailsForUser.chicken || 0);
			return sum;
		}, 0);
	},

	_onChange() {
		this.setState(Store.getOrderDetailsByKeyFromLocal());
	},

	render() {
		if(this.state.isLoading){
			return (<AppLoadingBar />);
		}else{
			return (
				<div>
					<div className="row">
						<div className="col-lg-12">
							<h3>Orders for {this.state.date}</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">

								<table className="table">
									<thead>
										<tr>
											<th>Username</th>
											<th>Beef</th>
											<th>Veg</th>
											<th>Chicken</th>
										</tr>
									</thead>
									<tbody>
										{this.state.data.map((user) => {
											return (
												<OrderRow key={user.uid} value={user}/>
											);
										})}
									</tbody>
								</table>
						</div>
						<div className="row">
							<div className="col-lg-12">
								<h3>Total orders: {this._getTotal()}</h3>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
});

const OrderRow = React.createClass({
	render(){
		return (
		<tr>
			<td>{this.props.value.username}</td>
			<td>{this.props.value.currentOrderDetailsForUser.beef}</td>
			<td>{this.props.value.currentOrderDetailsForUser.veg}</td>
			<td>{this.props.value.currentOrderDetailsForUser.chicken}</td>
		</tr>);
	}
});




module.exports = ManageOrder;