## Adapter for express route handlers

Wrap route handler for THE BEST

Make it promisable bluebird/q

## Installation

```
npm install express-json-res
```

## Usage

```javascript
// todo
var app = require('express')();
var adapt = require('express-json-res').adaptOne;

app.get('/posts', adapt(function() {
	return Promise......... bla bla
}));
```

## License
MIT
