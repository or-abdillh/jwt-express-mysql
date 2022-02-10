'use-trict';

require('dotenv').config();
const mysql = require('mysql');

const conn = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

conn.connect(err => {
	if (err) throw err;
	console.log('MySQL Connected!!');
})

module.exports = conn;
