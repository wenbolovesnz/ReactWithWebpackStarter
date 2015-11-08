
var AppDispatcher = require('./appDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./constants');
const FirebaseRef = require('./firebaseRef');
var CHANGE_EVENT = 'change';

var _data = {};


var Store = Object.assign({}, EventEmitter.prototype, {

	submitOrder: function(){
		var data = this.getData();
		data.isSubmitting = true;
		data.alterBox = false;
		this.setInitData(data);
		this.emitChange;
		FirebaseRef.child('orders').child(data.currentOrderKey).child('entries').child(FirebaseRef.getAuth().uid)
		.set({
					username: data.username,
					beef: data.beef,
					chicken: data.chicken,
					veg: data.veg
				}, () => {
				FirebaseRef.child('users').child(FirebaseRef.getAuth().uid).child('orders').child(data.currentOrderKey)
				.set({date:data.date}, ()=>{
						data.isSubmitting = false;
						data.alterBox = true;
						this.setInitData(data);
						this.emitChange();
					});
			});
	},

	getInitData: function() {
		FirebaseRef.child('orders').limitToLast(1).on('child_added', (snapShot) => {
			let keyFromOders = snapShot.key();
			let orderData = snapShot.val();

			let initData = {
				beef: 0,
				veg: 0,
				chicken: 0,
				isSubmitting: false,
				date: snapShot.val().date,
				currentOrderKey: keyFromOders,
				image: require('../images/pic1.jpg')
			};

			let userAuthData = FirebaseRef.getAuth();

			FirebaseRef.child('users').child(userAuthData.uid).on('value', (userDataSnap) => {
				var userData = userDataSnap.val();

				var userCurrentOrder;
				if(userData.orders){
					userCurrentOrder = userData.orders[keyFromOders];
				}

				if(userCurrentOrder){
					var userOrder = orderData.entries[userAuthData.uid];
					initData.beef = userOrder.beef || 0;
					initData.chicken = userOrder.chicken || 0;
					initData.veg = userOrder.veg || 0;
				}else{
					initData.beef = 0;
					initData.chicken =  0;
					initData.veg = 0;
				}
				initData.username = userData.username;

				this.setInitData(initData);
				this.emitChange()

			});

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
		case Constants.SUBMIT_ORDER:
			Store.submitOrder.call(Store);
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