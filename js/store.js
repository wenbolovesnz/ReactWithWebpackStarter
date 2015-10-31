var AppDispatcher = require('./appDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./constants');

var CHANGE_EVENT = 'change';

var _data = {};


var Store = Object.assign({}, EventEmitter.prototype, {

	getTotalOrders: function(){
		return _data.beef + _data.chicken + _data.veg;
	},

	getInitData: function() {
		return _data;
	},

	setInitData: function(data){
		_data = data;
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
		case Constants.MINUS:
			if(action.data.type === 'beef'){
				_data.beef--;
			}else if(action.data.type === 'chicken'){
				_data.chicken--;
			} else {
				_data.veg--;
			}
			_data.total = Store.getTotalOrders();
			Store.emitChange();
			break;
		case Constants.ADD:
			if(action.data.type === 'beef'){
				_data.beef++;
			}else if(action.data.type === 'chicken'){
				_data.chicken++;
			} else {
				_data.veg++;
			}
			_data.total = Store.getTotalOrders();
			Store.emitChange();
			break;
		default:
		// no op
	}
});

module.exports = Store;