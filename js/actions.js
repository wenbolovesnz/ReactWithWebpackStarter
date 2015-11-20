let AppDispatcher = require('./appDispatcher');
let Constants = require('./constants');
let Store = require('./store');
const Actions = {
	appInit: function(callback) {
		AppDispatcher.dispatch({
			actionType: Constants.APP_INIT,
			appInitData: Store.getInitData()
		});
		callback()
	},

	add: function(eventData) {
		AppDispatcher.dispatch({
			actionType: Constants.ADD,
			data: eventData
		});
	},

	minus: function(eventData) {
		AppDispatcher.dispatch({
			actionType: Constants.MINUS,
			data: eventData
		});
	},

	submitOrder: function(){
		AppDispatcher.dispatch({
			actionType: Constants.SUBMIT_ORDER
		});
	}

};

module.exports = Actions;