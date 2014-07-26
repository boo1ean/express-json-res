## Adapter for express route handlers

Simplify express route handlers.  
Aggregate request params into single object (params, body, query).   
Takes care of response sending.   
Works with promises.   
You only need to return value from route handler.

## Installation

```
npm install express-json-res
```

## Usage

```javascript
var app = require('express')();
var adapt = require('express-json-res');
var bodyParser = require('body-parser');
var Q = require('q'); // or bluebird

app.use(bodyParser());

// Response body will be json array -> [1, 2, 3]
app.get('/numbers', adapt(function(params, req) {
	return [1,2,3];
}));

// Same with promise -> [1, 2, 3]
app.get('/numbers', adapt(function(params, req) {
	return Q([1,2,3]);
}));

// Use params
// GET /numbers?pivot=2 -> [3]
app.get('/numbers', adapt(function(params, req) {
	return [1, 2, 3].filter(function(n) {
		return n > params.pivot;
	});
}));

// POST /login
// Request body:
// username: johny
// password: qwerty
app.post('/login', adapt(function(params, req) {
	return someAsyncAuthChecker(params.username, params.password).then(function() {
		return { success: true };
	});
}));

// And so on..
```

## License
MIT
