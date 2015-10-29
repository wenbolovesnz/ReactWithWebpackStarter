const React = require('react');
const CircularProgress = require('material-ui').CircularProgress;


const AppLoadingBar = React.createClass({
	render(){
		return(
			<div id='appLoadingBarContainer'>
				<CircularProgress mode="indeterminate" size={2} />
			</div>
		)
	}
});

module.exports = AppLoadingBar;
