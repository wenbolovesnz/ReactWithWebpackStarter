const React = require('react');
const Logo = require('../images/logo.png');

const AppHeader = React.createClass({
	render(){
		return (
			<div id='appHeader'>
					<div className="logo-holder">
						<image src={Logo} className="img-responsive center-block logo" alt="logo"></image>
					</div>
			</div>
		);
	}
});
module.exports = AppHeader;