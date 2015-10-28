let AppDispatcher = require('./appDispatcher');
let Constants = require('./constants');

const Actions = {
	appInit: function(callback) {
		AppDispatcher.dispatch({
			actionType: Constants.APP_INIT,
			appInitData: {
				items: [{text:'1', key: '1'}, {text:'2', key:'2'}],
				quantity: 0
			}
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