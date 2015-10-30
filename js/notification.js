const React = require('react');


const Notification = React.createClass({
	render(){
		return(
			<div className='container' id='notification'>
				<h2> Next deliver date : {this.props.date}</h2>
			</div>
		)
	}
});

module.exports = Notification;
