const React = require('react');
const ReactDOM = require('react-dom');
const Store = require('./store');
const AppLoadingBar = require('./appLoadingBar');
const Summary = require('./summary');
const Notification = require('./notification');
const FoodType = require('./foodType');

const Order = React.createClass({

	getInitialState(){
		return {
			loading: true
		};
	},

	componentDidMount() {
		Store.addChangeListener(this._onChange);
		Store.getInitData();
	},

	componentWillUnmount() {
		Store.removeChangeListener(this._onChange);
	},

	_onChange() {
		let newStates = Store.getData();
		newStates.loading = false;
		this.setState(newStates);
	},

	render(){
		if(this.state.loading === true){
			return (<AppLoadingBar />);
		}else{
			return <OrderSection value = {this.state} />
		}
	}
});

const OrderSection = React.createClass({

	render(){
			return <div>
				<Notification  date={this.props.value.date}/>
				<div className="row">
					<Summary products= {this.props.value.products}
						isSubmitting= {this.props.value.isSubmitting}
						alterBox= {this.props.value.alterBox } username={this.props.value.username}/>
					<div id='products' className="col-lg-8 col-md-8 col-sm-12">
						{this.props.value.products.map((product)=>{
							return <FoodType key= {product.key} image= {product.url} title={product.name} type={product.key} subtitle={product.desc} beef={product.quantity}/>
						})}
					</div>
				</div>
			</div>
	}
});

module.exports = Order;