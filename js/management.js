const React = require('react');
const Store = require('./store');
const Actions = require('./actions');
const Mui = require('material-ui');
import { Router, Route, History, Link } from 'react-router'
const List = Mui.List;
const ListItem = Mui.ListItem;
const ListDivider = Mui.ListDivider;
const RaisedButton = Mui.RaisedButton;
const TextField = Mui.TextField;

const ManageOrders = React.createClass({
	mixins: [ History ],

	getInitialState(){
		return {
			orders: []
		}
	},

	componentDidMount() {
		Store.addChangeListener(this._onChange);
		Store.getDataForManagement();
	},

	componentWillUnmount() {
		Store.removeChangeListener(this._onChange);
	},

	_onChange() {
		let newStates = {
			orders: Store.getOrdersData(),
            showCreateNew: false
		};

		this.setState(newStates);
	},

    _handleCreateNew(){
      this.state.showCreateNew = true;
      this.setState(this.state);
    },

	render(){
      var buttonStyle = { marginBottom: '10px'};
			return (<div>
				<div className="row">
					<div className="col-lg-12">
						<h3>Orders Management</h3>
                        <div style={buttonStyle}>
                            <RaisedButton label="Create new order date" primary={true} onClick={this._handleCreateNew} />
                        </div>

					</div>
				</div>
                {this.state.showCreateNew ? <CreateNewOrder /> : ''}
				<div className="row">
					<div className="col-lg-12">
						<List>
							{this.state.orders.map((order) => {
								return(<OrderDateLink order={order} key={order.key}/>);
							})}
						</List>
					</div>
				</div>
			</div>)
		}
});


const CreateNewOrder = React.createClass({

    getInitialState(){
      return {
          newDate: ''
      };
    },

    _handleChange(event){
        this.state.newDate = event.target.value;
        this.setState(this.state);
    },

    _handleSave(){
        if(this.state.newDate){
            Actions.createNewOrder(this.state.newDate);
        }
    },

    render(){
        var buttonStyle = { marginBottom: '10px'};

        return(<div className="row">
            <div className="newOrderForm col-lg-12">
                <TextField
                    fullWidth={true}
                    hintText="eg. day/month/year"
                    floatingLabelStyle={{color:'whitesmoke'}}
                    floatingLabelText="Date"
                    value={this.state.newDate}
                    type="email"
                    hintStyle={{color: 'whitesmoke'}}
                    onChange={this._handleChange} />

                <div style={buttonStyle}>
                    <RaisedButton label="Save" primary={true} onClick={this._handleSave} />
                </div>
            </div>
        </div>);
    }
});

const OrderDateLink = React.createClass({
	mixins: [ History ],

	_handleClick(){
		let newLink = '/manageOrders/' + this.props.order.key;
		this.history.pushState(null, newLink);
	},

	render(){
		return(<div><ListItem key={this.props.key} primaryText={this.props.order.value.date} onClick={this._handleClick}/><ListDivider/></div>);
	}
});

module.exports = ManageOrders;