"use-strict";

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const conn = require('../connection');
const response = require('../response');

module.exports = ( req, res, next ) => {
	//Get token
	const token = req.headers.authorization;
	jwt.verify(
		token,
		process.env.SECRET_KEY,
		(err, decoded) => {
			if (err) response.failed(res, 403, 'Ilegal access');
		 	else {
				//Query to db
				const sql = `SELECT username FROM users WHERE username = '${ decoded.username }' AND password = '${ decoded.password }'`;
				
				conn.query(sql, (err, rows) => {
					if (err) response.failed(res, 501, err);
					else {
						if (rows.length > 0) next(); //Token and user valid
						else response.faile(res, 403, 'Ilegal access');
					}
				});
			}
		}
	);
};