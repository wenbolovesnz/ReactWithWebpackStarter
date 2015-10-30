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

	addBeef: function(eventData) {
		AppDispatcher.dispatch({
			actionType: Constants.ADD_BEEF,
			data: eventData
		});
	}
};

module.exports = Actions;