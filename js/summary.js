const React = require('react');
const ReactDOM = require('react-dom');
const RaisedButton = require('material-ui').RaisedButton;
const CircularProgress = require('material-ui').CircularProgress;
const AlterBox = require('./alertBox');
const TweenMax = require('gsap');
const Actions = require('./actions');
const Summary = React.createClass({

	componentDidMount() {
		TweenMax.from(ReactDOM.findDOMNode(this), 1, {opacity: 0, scale: 0, delay:0.5, ease: Bounce.easeOut});
	},

	_handleSubmit(){
		Actions.submitOrder();
	},

	_getTotalCost(){
		let cheapOnes = (this.props.beef + this.props.chicken + this.props.veg) * 2.5 + (this.props.alfa * 3);
		let dearOnes = (this.props.aji + this.props.manJar) * 6;
		return cheapOnes + dearOnes;
	},

	render(){
		return(
			<div id='summary' className="col-lg-4 col-md-4 col-sm-12">
				<div>
					<h4>Good day, {this.props.username}</h4>
					<h4>Order Summary</h4>
					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							Beef
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							{this.props.beef} * $ 2.50
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							Chicken
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							{this.props.chicken} * $ 2.50
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							Vegatable
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							{this.props.veg} * $ 2.50
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							Alfajores
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							{this.props.alfa} * $ 3.00
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							Aji
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							{this.props.aji} * $ 6.00
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							Manjar
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							{this.props.manJar} * $ 6.00
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							<b>Total cost:</b>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							${this._getTotalCost()}
						</div>
					</div>

					<div className="submitOder">
						<RaisedButton  type="submit" label="Submit" primary={true} onClick={this._handleSubmit} disabled={this.props.isSubmitting}/>
					</div>
              {this.props.alterBox ? (<AlterBox  message="Your order has been saved."/>) : ''}
				</div>
			</div>
		)
	}
});

module.exports = Summary;
