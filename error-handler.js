var log = {
	error: console.error.bind(console);
};

module.exports = function errorHandler(res) {
	return function (error) {
		if (error && error.errors) {
			res.json(error);
		} else {
			log.error(error);
			res.status(500);
			res.end();
		}
	};
};
