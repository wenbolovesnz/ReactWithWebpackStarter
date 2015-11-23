const React = require('react');
const RaisedButton = require('material-ui').RaisedButton;
const CircularProgress = require('material-ui').CircularProgress;
const AlterBox = require('./alertBox');

const Actions = require('./actions');
const Summary = React.createClass({
	_handleSubmit(){
		Actions.submitOrder();
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
							* {this.props.beef}
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							Chicken
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							* {this.props.chicken}
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							Vegatable
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							* {this.props.veg}
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							Alfajores
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							* {this.props.alfa}
						</div>
					</div>

					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							<b>Total</b>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							* {this.props.beef + this.props.chicken + this.props.veg + this.props.alfa}
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
