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
		TweenMax.staggerFrom('.foodType', 2, {opacity: 0, scale: 0, ease: Bounce.easeOut})
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
					<Summary beef={this.state.beef} chicken={this.state.chicken} veg={this.state.veg} alfa={this.state.alfa}  isSubmitting= {this.state.isSubmitting}
							 alterBox= {this.state.alterBox } username={this.state.username}/>
					<div id='products' className="col-lg-8 col-md-8 col-sm-12">
						<FoodType image= {this.state.image} title='Beefy' type='beef' subtitle='Premium NZ beef mince, potato and spices.' beef={this.state.beef}/>
						<FoodType image= {this.state.image} title='Chicky' type='chicken' subtitle='Made of fresh chicken, ginger and spring onions.' beef={this.state.chicken}/>
						<FoodType image= {this.state.image} title='Veggie' type='veg' subtitle='Delicious NZ sweet corn with mushrooms and tasty cheese.' beef={this.state.veg}/>
						<FoodType image= {this.state.image2} title='Alfajores' type='alfa' subtitle='Hand-made shortbread filled with Manjar and covered with delicious dark and white chocolate.' beef={this.state.alfa}/>
					</div>
				</div>
			</div>
		}
	}
});

module.exports = Order;