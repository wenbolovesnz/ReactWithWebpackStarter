const React = require('react');
const Snackbar = require('material-ui').Snackbar;

const AlterBox = React.createClass({
    render(){
        return (
	        <div>
		        <Snackbar
			        message={this.props.message}
			        autoHideDuration={2500}
			        openOnMount={true} />
	        </div>);
    }
});
module.exports = AlterBox;
