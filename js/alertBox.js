const React = require('react');
const Snackbar = require('material-ui').Snackbar;

const AlterBox = React.createClass({
    render(){
        return (
            <Snackbar
                message={this.props.message}
                autoHideDuration={2500}
                openOnMount={true}
                />
        );
    }
});
module.exports = AlterBox;
