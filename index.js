var program = require('commander');
var chalk = require('chalk');
var version = require("./package.json").version;

var jsonServer = require('./src/index');

var port = 4000;  //defalt port

function server(data, filepath) {

    console.log(
      '\nWelcome brother, we give you ' + chalk.grey('a json server\n');
    )

    for (var prop in data) {
      console.log(chalk.grey('  http://localhost:' + port + '/') + chalk.cyan(prop))
    }

    console.log(
      '\nOpen your browser, and enter ' + chalk.grey('http://localhost:' + port + '/\n')
    )


    var newServer = jsonServer.create();

    if (filepath) {
      var router = jsonServer.router(filepath);
    } else {
      var router = jsonServer.router(data);
    }

    newServer.use(router);
    newServer.listen(port);
}


module.exports = function (argv) {

    function setPort (val) {
      port = val;
    }

    program
      .version(version)
      .option('-p, --port <port number>', 'Set port if you want', setPort)
      .parse(argv);


    var source = 'db.json';

    //fix like: js a.json
    if (argv.length > 2){
        if (/\.json$/.test(argv[2])) {
          source = argv[2];
        }
    }

    //check source is json or not
    if (/\.json$/.test(source)) {
      var filePath = process.cwd() + '/' + source;
      var jsonData = require(filePath);
      server(jsonData, filePath);
    }

};