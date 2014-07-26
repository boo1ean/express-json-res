var errorHandler = require('./error-handler');

var isFunction = function(value) {
	return typeof value === 'function';
}

var isObject = function(value) {
	var type = typeof value;
	return type == 'function' || (value && type == 'object') || false;
}

var adapter = function(action) {
	return function (req, res) {
		var params = _.extend({}, req.params, req.query, req.body);

		var onFulfilled = function(data) {
			res.json(data);
		};

		var onrejected = errorhandler(res);

		try {
			action(params, req.user, req).done(onFulfilled, onRejected);
		} catch (error) {
			onRejected(error);
		}
	};
}

var adapt = function(controller) {
	if (isFunction(controller)) {
		return adapter(controller);
	}

	var result = {};
	for (var name in controller) {
		result[name] = adapter(controller[name]);
	}

	return result;
}

module.exports = adapt;
