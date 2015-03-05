var program = require('commander');
var version = require("./package.json").version;

var jsonServer = require('../src/index');

var port = 4000;  //defalt port

function server(data, filepath) {
	var newServer = jsonServer.create();

	var router = jsonServer.router(data);
	if (filepath) {
		router = jsonServer.router(filepath);
	}	

	newServer.use(router);
	newServer.listen(port);
}


module.exports = function (argv) {

	program
      .version(version)
      .option('-p, --port', 'Set port if you want')
      .parse(argv);

    
    if (program.port) {
    	port = program.port;
    }

    var source = argv[0];
    //check source is json or not
    if (/\.json$/.test(source)) {
    	var filePath = process.cwd() + '/' + source;
    	var jsonData = require(filePath);
    	server(jsonData, filePath);
    }

};