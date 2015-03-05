var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var serveStatic = require('serve-static');
var cors = require('cors');


var fs = require('fs');

module.exports = function () {
	//http://expressjs.com/api.html#express
	var server = express();

	//https://www.npmjs.com/package/body-parser#bodyparserjsonoptions
	//Controls the maximum request body size. Defaults to '100kb'.
	server.use(bodyParser.json({limit: '10mb'}));

	//https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions
	//@See: This object will contain key-value pairs, where the value can be a string or array (when extended is false)
	// or any type (when extended is true).
	server.use(bodyParser.urlencoded({extended: false}));
	server.use(methodOverride());

	var cwd = process.cwd();
	//TODO Support static
	if (fs.existsSync(cwd + '/public')) {
		server.use(serveStatic(cwd + '/public'));
	} else {
		server.use(serveStatic(__dirname + '/public'));
	}

	//https://www.npmjs.com/package/cors#configuration-options
	//origin: Configures the Access-Control-Allow-Origin CORS header. Set to true to reflect the request origin, as defined by req.header('Origin'). 
	//credentials: Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
	server.use(cors({
		origin: true,
		credentials: true
	}));

	return server;

};