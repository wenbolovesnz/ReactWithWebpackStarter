const React = require('react');
const Paper = require('material-ui').Paper;
const AppHeader = React.createClass({
	render(){
		return (
			<div id='appHeader'>
				<Paper zDepth={1}>
					<h2>Maria Mulata</h2>
				</Paper>
			</div>
		);
	}
});
module.exports = AppHeader;