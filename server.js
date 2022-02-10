"use-strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./router");
const connection = require('./connection');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router(app);

app.listen(PORT, err => {
	if (err) throw err;
	console.log(`Server running at PORT ${PORT}`);
});
