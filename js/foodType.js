const React = require('react');
const Mui = require('material-ui');
const RaisedButton = Mui.RaisedButton;
const Actions = require('./actions');
const TweenMax = require('gsap');

const FoodType = React.createClass({

    handleAdd(){
        Actions.add({type: this.props.type});
    },
    handleMinus(){
        if(this.props.beef > 0){
            Actions.minus({type: this.props.type});
        }
    },
	render(){
		return(
            <div className="row foodType">
                <div className="col-lg-4 col-md-4 hidden-xs">
                    <img src={this.props.image} className="img-responsive" alt="simple" />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12">
                    <div className="foodTypePanel">
                        <h3>{this.props.title}</h3>
                        <p>{this.props.subtitle}</p>
                        <div className="row">
                            <RaisedButton label="-" primary={true} onClick={this.handleMinus} />
                            <span className="orderCount">{this.props.beef}</span>
                            <RaisedButton label="+" primary={true} onClick={this.handleAdd} />

                        </div>
                    </div>
                </div>
            </div>
            )
	    }
});

module.exports = FoodType;