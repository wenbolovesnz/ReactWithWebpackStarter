var AppDispatcher = require('./appDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./constants');

var CHANGE_EVENT = 'change';

var _data = {};


var Store = Object.assign({}, EventEmitter.prototype, {

	getInitData: function() {
		return _data;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},


	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

	switch(action.actionType) {
		case Constants.APP_INIT:
				_data = action.appInitData;
				Store.emitChange();
			break;
		case Constants.ADD_BEEF:
			_data.quantity++;
			Store.emitChange();
			break;
		default:
		// no op
	}
});

module.exports = Store;