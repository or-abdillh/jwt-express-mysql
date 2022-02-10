'use-strict';

const conn = require('../connection');
const response = require('../response');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

module.exports = ( req, res ) => {

	//Get form login
	if ( req.body.username === undefined || req.body.password === undefined ) {
		response.failed(res, 403, 'Empty body');
	}

	const username = req.body.username;
	const password = md5(req.body.password);

	//Query to DB
	const sql = `SELECT username FROM users WHERE username = '${ username }' AND password = '${ password }'`;
	conn.query(sql, (err, rows) => {
	
		if (err) response.failed(res, 501, err);
		else {
			if (rows.length > 0) { // Login success
				//Create new token
				const token = jwt.sign(
					{ username, password },
					process.env.SECRET_KEY,
					{ expiresIn: '300s' }
				);
				//Send token to client
				response.success(res, { token });
			} else response.failed(res, 403, 'invalid username or pasword'); //Login failed
		}
	})
}
