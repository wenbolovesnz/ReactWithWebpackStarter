const React = require('react');
const ReactDOM = require('react-dom');
const RaisedButton = require('material-ui').RaisedButton;
const Checkbox = require('material-ui').Checkbox;
const CircularProgress = require('material-ui').CircularProgress;
const AlterBox = require('./alertBox');
const Actions = require('./actions');
const Store = require('./store');

const Summary = React.createClass({

	_handleSubmit(){
		Actions.submitOrder();
	},

	_getTotalCost(){
		return this.props.products.reduce((sum, product) =>{
			sum += product.price * product.quantity;
			return sum;
		}, 0);
	},

	render(){
		return(
			<div id='summary' className="col-lg-4 col-md-4 col-sm-12">
				<div>
					<h4>Good day, {this.props.username}</h4>
					<h4>Order Summary</h4>
					{
						this.props.products.map((product)=>{
							return (
								<div className="row" key={product.key}>
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
										{product.name}
									</div>
									<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
										{product.quantity} * $ {product.price/100}
									</div>
								</div>
							)
						})
					}
					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							<b>Total cost:</b>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							${this._getTotalCost()/100}
						</div>
					</div>

					{this.props.customOrder ? (<Instruction specialInstruction={this.specialInstruction}/>): ''}

					<div className="row submitOder">
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
								<RaisedButton  type="submit" label="Submit" primary={true} onClick={this._handleSubmit} disabled={this.props.isSubmitting}/>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
							<CheckBoxComponent customOrder={this.props.customOrder}/>
						</div>
					</div>
					{this.props.alterBox ? (<AlterBox  message="Your order has been saved."/>) : ''}
				</div>
			</div>
		)
	}
});


const Instruction = React.createClass({
	handleChange(event){
		Actions.setSpecialInstruction(event.target.value);
	},
	render(){
		return(
			<div>
				<h4>Spcial instruction</h4>
				<textarea className="textArea" rows="4" cols="30"
					value={this.props.specialInstruction}
					onChange={this.handleChange}>
				</textarea>
			</div>
		)
	}
});

const CheckBoxComponent = React.createClass({
	_handleCheck(){
		var toggleValue = !this.props.customOrder;
		Actions.handleToggleCustomOrder(toggleValue);
	},

	render(){
		return(
			<Checkbox
				iconStyle={{
					fill: '#b71c1c'
				}}
				labelStyle={{
					color:'#B09F47'
				}}
				onCheck={this._handleCheck}
				name="customizeIt"
				value={this.props.customOrder}
				label="Message?"/>
		)
	}
});

module.exports = Summary;
