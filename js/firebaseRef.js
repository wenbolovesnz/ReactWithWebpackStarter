const dbUrl = window.config.dbUrl;
const Firebase = require('firebase');
const FirebaseRef  = new Firebase(dbUrl);
module.exports = FirebaseRef;
