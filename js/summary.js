const React = require('react');

const Summary = React.createClass({
	render(){
		return(
			<div id='summary' className="col-lg-4 col-md-4 col-sm-12">
				<div>
					<h3>Order Summary</h3>
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
							<b>Total</b>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							* {this.props.total}
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Summary;
