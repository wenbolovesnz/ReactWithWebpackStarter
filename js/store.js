
var AppDispatcher = require('./appDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('./constants');
const FirebaseRef = require('./firebaseRef');
const R = require('ramda');
var CHANGE_EVENT = 'change';

var findByKey = (key) => { return R.find(R.propEq('key', key))};
var sortByOrder = R.sortBy(R.prop('order'));

var _data = {};
var _ordersData = [];
var _orderDetailsByKey = { isLoading: true, data: []};
var _orderData = {
    beefStock : 0,
    chickenStock : 0,
    vegStock : 0,
    alfaStock : 0,
		manJarStock: 0,
		ajiStock: 0
};

var Store;
Store = Object.assign({}, EventEmitter.prototype, {

    getOrderData: function () {
        return _orderData;
    },

    getStockDataByKey: function (orderKey) {

        var ref = FirebaseRef.child('orders').child(orderKey);
        ref.once('value', (dataSnap) => {
            _orderData = dataSnap.val();

            this.emitChange();
        });

        return _orderData;
    },

    updateStock: function (data) {
        var ref = FirebaseRef.child('orders').child(data.orderKey);
        ref.once('value', (dataSnap) => {
            var order = dataSnap.val();
            order.beefStock = data.beefStock;
            order.chickenStock = data.chickenStock;
            order.vegStock = data.vegStock;
            order.alfaStock = data.alfaStock;
            order.manJarStock = data.manJarStock;
            order.ajiStock = data.ajiStock;

            ref.set(order, ()=> {
                _orderData = order;
                this.emitChange();
            });
        });
    },

    createAnewOderDate: function (dateString) {

	    FirebaseRef.child('products').once('value', (snapShot) =>{
		    var value = snapShot.val();

		    var newOrderKeyRef = FirebaseRef.child('orders').push();
		    newOrderKeyRef.set({
			    date: dateString,
			    products: value
		    }, ()=> {
			    this.emitChange();
		    });

	    });


    },

    submitOrder: function () {
        var data = this.getData();
        data.isSubmitting = true;
        data.alterBox = false;
        this.setInitData(data);
        this.emitChange;

	      var order = {
		      date: data.date,
		      hasOrder: true
	      };

				data.products.forEach((product) => {
					order[product.key] = product.quantity;
				});

        FirebaseRef.child('users').child(FirebaseRef.getAuth().uid).child('orders').child(data.currentOrderKey)
            .set(order, ()=> {
                data.isSubmitting = false;
                data.alterBox = true;
                this.setInitData(data);
                this.emitChange();
            });
    },

    getOrderDetailsByKeyFromLocal: function () {
        return _orderDetailsByKey;
    },

    getOrderDetailsByKeyFromRemote: function (orderKey) {
        _orderDetailsByKey.isLoading = true;
        FirebaseRef.child('users').on('value', (userSnap) => {
            _orderDetailsByKey.data = [];
            var usersData = userSnap.val();
            Object.keys(usersData).forEach((key) => {
                var userData = usersData[key];

                if (userData.orders && userData.orders[orderKey] && userData.orders[orderKey].hasOrder) {
                    userData.currentOrderDetailsForUser = userData.orders[orderKey];
                    _orderDetailsByKey.data.push(userData);
                    _orderDetailsByKey.date = userData.currentOrderDetailsForUser.date;
                }
            });
            _orderDetailsByKey.isLoading = false;
            this.emitChange();
        });
    },

    getDataForManagement: function () {
        var orders = [];
        FirebaseRef.child('orders').on('child_added', (snapShot) => {
            let key = snapShot.key();
            let value = snapShot.val();
            orders.push({
                key: key,
                value: value
            });

            this.setOrdersData(orders);
            this.emitChange();
        });
    },

    getInitData: function () {
        FirebaseRef.child('orders').limitToLast(1).on('child_added', (snapShot) => {
            let keyFromOders = snapShot.key();
	          let orderData = snapShot.val();

            let initData = {
	              products: sortByOrder(R.values(orderData.products)),
                isSubmitting: false,
                date: snapShot.val().date,
                currentOrderKey: keyFromOders
            };

            let userAuthData = FirebaseRef.getAuth();

            FirebaseRef.child('users').child(userAuthData.uid).on('value', (userDataSnap) => {
                var userData = userDataSnap.val();

                var userCurrentOrder;
                if (userData.orders) {
                    userCurrentOrder = userData.orders[keyFromOders];
                }

                if (userCurrentOrder) {
	                  initData.products.forEach((product) => {
		                  product.quantity = userCurrentOrder[product.key] || 0;
	                  });
                } else {
		                initData.products.forEach((product) => {
			                product.quantity = 0;
		                });
                }
                initData.username = userData.username;

                this.setInitData(initData);
                this.emitChange()

            });
        });
    },

    getData: function () {
        return _data;
    },

    setInitData: function (data) {
        _data = data;
    },

    getOrdersData: function () {
        return _ordersData;
    },

    setOrdersData: function (data) {
        _ordersData = data;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },


    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
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
			let product = findByKey(action.data.type)(_data.products);
			product.quantity--;
			Store.emitChange();
			break;
		case Constants.SUBMIT_ORDER:
			Store.submitOrder.call(Store);
			Store.emitChange();
			break;
		case Constants.ADD_ORDER_DATE:
			Store.createAnewOderDate.call(Store, action.data);
			break;
		case Constants.UPDATE_STOCK:
			Store.updateStock.call(Store, action.data);
			break;
		case Constants.ADD:
			let product = findByKey(action.data.type)(_data.products);
			product.quantity++;
			Store.emitChange();
			break;
		default:
		// no op
	}
});

module.exports = Store;