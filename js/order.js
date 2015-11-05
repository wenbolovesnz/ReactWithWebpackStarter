const React = require('react');
const Store = require('./store');
const AppLoadingBar = require('./appLoadingBar');;
const Summary = require('./summary');;
const Notification = require('./notification');;
const FoodType = require('./foodType');


const Order = React.createClass({

	getInitialState(){
		return {
			loading: true
		}
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
			return <div>
				<Notification  date={this.state.date}/>
				<div className="row">
					<Summary total={this.state.total} beef={this.state.beef} chicken={this.state.chicken} veg={this.state.veg} />
					<div id='products' className="col-lg-8 col-md-8 col-sm-12">
						<FoodType image= {this.state.image} title='Beef' type='beef' subtitle='Beef mince with potato.' beef={this.state.beef}/>
						<FoodType image= {this.state.image} title='Chicken' type='chicken' subtitle='Soft chicken meat with potato.' beef={this.state.chicken}/>
						<FoodType image= {this.state.image} title='Vegetables' type='veg' subtitle='Fresh vegetables.' beef={this.state.veg}/>
					</div>
				</div>
			</div>
		}
	}
});

module.exports = Order;