const React = require('react');
const ReactDOM = require('react-dom');
const Store = require('./store');
const AppLoadingBar = require('./appLoadingBar');
const Summary = require('./summary');
const Notification = require('./notification');
const FoodType = require('./foodType');
const TweenMax = require('gsap');

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
			return <OrderSection value = {this.state} />
		}
	}
});

const OrderSection = React.createClass({

	componentDidMount() {

		let foodTypeDomElements = [
			ReactDOM.findDOMNode(this.refs.beef),
			ReactDOM.findDOMNode(this.refs.chicken),
			ReactDOM.findDOMNode(this.refs.veg),
			ReactDOM.findDOMNode(this.refs.alfa),
			ReactDOM.findDOMNode(this.refs.aji),
			ReactDOM.findDOMNode(this.refs.manJar)
		];

		TweenMax.staggerFrom(foodTypeDomElements, 1, {opacity: 0, scale: 0, delay:0.5, ease: Bounce.easeOut}, 0.2);
	},

	render(){
			return <div>
				<Notification  date={this.props.value.date}/>
				<div className="row">
					<Summary beef={this.props.value.beef} chicken={this.props.value.chicken} veg={this.props.value.veg} alfa={this.props.value.alfa}
						aji={this.props.value.aji} manJar={this.props.value.manJar}
						isSubmitting= {this.props.value.isSubmitting}
						alterBox= {this.props.value.alterBox } username={this.props.value.username}/>
					<div id='products' className="col-lg-8 col-md-8 col-sm-12">
						<FoodType ref="beef" image= {this.props.value.image} title='Beefy' type='beef' subtitle='Premium NZ beef mince, potato and spices.' beef={this.props.value.beef}/>
						<FoodType ref="chicken" image= {this.props.value.image} title='Chicky' type='chicken' subtitle='Made of fresh chicken, ginger and spring onions.' beef={this.props.value.chicken}/>
						<FoodType ref="veg" image= {this.props.value.image} title='Veggie' type='veg' subtitle='Delicious NZ sweet corn with mushrooms and tasty cheese.' beef={this.props.value.veg}/>
						<FoodType ref="alfa" image= {this.props.value.image2} title='Alfajores' type='alfa' subtitle='Hand-made shortbread filled with Manjar and covered with delicious dark and white chocolate.' beef={this.props.value.alfa}/>
						<FoodType ref="aji" image= {this.props.value.imageAji} title='Aji' type='aji' subtitle='South American style chili sauce made with fresh ingredients and preservatives FREE.' beef={this.props.value.aji}/>
						<FoodType ref="manJar" image= {this.props.value.imageManJar} title='Manjar' type='manJar' subtitle='South American style Caramel made with reduced milk and brown sugar.' beef={this.props.value.manJar}/>
					</div>
				</div>
			</div>
	}
});

module.exports = Order;