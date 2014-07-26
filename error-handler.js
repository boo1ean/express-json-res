module.exports = function errorHandler(res, log) {
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
