"use-strict";

const response = require('../response');
const control = require('../controller');
const auth = require('../middleware/auth.js');

module.exports = app => {

	app.route('/').get(auth, ( req, res ) => response.success(res));

	//Login
	app.route('/login').post(control.login);

}
