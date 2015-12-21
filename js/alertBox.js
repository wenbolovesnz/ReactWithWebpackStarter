const React = require('react');
const Snackbar = require('material-ui').Snackbar;

const AlterBox = React.createClass({
    render(){
        return (
	        <div>
		        <Snackbar
			        style={{'position': 'relative'}}
			        message={this.props.message}
			        autoHideDuration={3000}
			        openOnMount={true} />
	        </div>);
    }
});
module.exports = AlterBox;
