
var AppDispatcher = require('./appDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./constants');
const FirebaseRef = require('./firebaseRef');
var CHANGE_EVENT = 'change';

var _data = {};


var Store = Object.assign({}, EventEmitter.prototype, {

	getTotalOrders: function(){
		return _data.beef + _data.chicken + _data.veg;
	},

	getInitData: function() {
		FirebaseRef.child('orders').limitToLast(1).on('child_added', (snapShot) => {
			let keyFromOders = snapShot.key();
			let orderData = snapShot.val();

			let initData = {
				beef: 0,
				veg: 0,
				chicken: 0,
				date: snapShot.val().date,
				image: require('../images/pic1.jpg')
			};

			let userAuthData = FirebaseRef.getAuth();

			FirebaseRef.child('users').child(userAuthData.uid).child('orders').limitToLast(1).on('child_added', (orderSnap) => {
				var order = orderSnap.val();
				var keyFromUser;

				if(order){
					keyFromUser = orderSnap.key();
				}

				if(keyFromUser === keyFromOders){
					var userOrder = orderData.entries[userAuthData.uid];
					initData.beef = userOrder.beef || 0;
					initData.chicken = userOrder.chicken || 0;
					initData.veg = userOrder.veg || 0;
				}

				this.setInitData(initData);
				this.emitChange()

			});

			console.log(FirebaseRef.getAuth());


		});
	},

	getData: function(){
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
			Store.emitChange();
			break;
		default:
		// no op
	}
});

module.exports = Store;