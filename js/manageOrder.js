const React = require('react');
const Store = require('./store');
const AppLoadingBar = require('./appLoadingBar');
const Actions = require('./actions');
const RaisedButton = require('material-ui').RaisedButton;



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

	_getTotalFor(type){
		var sumUp = function(sum, user){
			 sum += (user.currentOrderDetailsForUser[type] || 0);
			return sum;
		};
		return this.state.data.reduce(sumUp, 0);

	},

	_getTotal(){
		return this.state.data.reduce((sum, user) => {
			sum += (user.currentOrderDetailsForUser.beef || 0) +
							(user.currentOrderDetailsForUser.veg || 0) +
							(user.currentOrderDetailsForUser.chicken || 0) +
							(user.currentOrderDetailsForUser.alfa || 0);
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
											<th>Chicken</th>
											<th>Veg</th>
											<th>Alfajores</th>
										</tr>
									</thead>
									<tbody>
										{this.state.data.map((user) => {
											return (
												<OrderRow key={user.uid} value={user}/>
											);
										})}
										<tr>
											<td>Total</td>
											<td>{this._getTotalFor('beef')}</td>
											<td>{this._getTotalFor('chicken')}</td>
											<td>{this._getTotalFor('veg')}</td>
											<td>{this._getTotalFor('alfa')}</td>
										</tr>
										<TotalStocks orderKey={this.props.params.key}/>
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
			<td>{this.props.value.currentOrderDetailsForUser.chicken}</td>
			<td>{this.props.value.currentOrderDetailsForUser.veg}</td>
			<td>{this.props.value.currentOrderDetailsForUser.alfa}</td>
		</tr>);
	}
});


const TotalStocks= React.createClass({
	getInitialState(){
		return Store.getStockDataByKey(this.props.orderKey);
	},

	componentDidMount() {
		Store.addChangeListener(this._onChange);
	},

	_onChange(){
		let orderData = Store.getOrderData();
		orderData.showEdit = false;
		this.setState(orderData);
	},

	_showEdit(){
		this.state.showEdit = true;
		this.setState(this.state);
	},

	componentWillUnmount() {
		Store.removeChangeListener(this._onChange);
	},

	beefChanges(event){
		this.state.beefStock = event.target.value;
		this.setState(this.state);
	},

	chickenChanges(event){
		this.state.chickenStock = event.target.value;
		this.setState(this.state);
	},

	vegChanges(event){
		this.state.vegStock = event.target.value;
		this.setState(this.state);
	},

	alfaChanges(event){
		this.state.alfaStock = event.target.value;
		this.setState(this.state);
	},

	_handleSave(){
		this.state.orderKey = this.props.orderKey;
		Actions.saveStockUpdate(this.state);
	},

	render(){
		if(!this.state.showEdit){
			return (
					<tr>
						<td>Total stocks:
							<RaisedButton label="Edit" primary={true} onClick={this._showEdit}/>
						</td>
						<td>{this.state.beefStock}</td>
						<td>{this.state.chickenStock}</td>
						<td>{this.state.vegStock}</td>
						<td>{this.state.alfaStock}</td>
					</tr>
			);
		}else{
			return (
					<tr>
						<td><RaisedButton style={{marginLeft: 10}}label="Save" primary={true} onClick={this._handleSave} /></td>
						<td><input onChange={this.beefChanges} key="beef" type="number" value={this.state.beefStock}/></td>
						<td><input onChange={this.chickenChanges} key="chicken" type="number" value={this.state.chickenStock}/></td>
						<td><input onChange={this.vegChanges} key="veg" type="number" value={this.state.vegStock}/></td>
						<td><input onChange={this.alfaChanges} key="alfa" type="number" value={this.state.alfaStock}/></td>
					</tr>);
		}

	}
});





module.exports = ManageOrder;