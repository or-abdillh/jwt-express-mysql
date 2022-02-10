'use-trict';

const createJson = ( status, message, results = [] ) => {
	return {
		status,
		message,
		results,
		createAt: new Date().toLocaleString('id')
	};
};

const success = ( res, results ) => {
	res.status(200);
	res.json( createJson(true, 'sucess', results) );
	res.end();
}

const failed = ( res, code, msg ) => {
	res.status(code);
	res.send( createJson(false, msg) );
	res.end();
}

module.exports = {
	success,
	failed
}
