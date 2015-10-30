const React = require('react');


const FoodType = React.createClass({

	render(){
		return <div className="row">
						<div className="col-lg-4 col-md-4 hidden-xs">
							<ItemList items = { this.state.items }/>
						</div>
					</div>
	}
});