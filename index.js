var program = require('commander');
var version = require("./package.json").version;

var jsonServer = require('./src/index');

var port = 4000;  //defalt port

function server(data, filepath) {

    console.log(
      '\nWelcome brother, we give you ' + chalk.grey('a json server/\n')
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

    program
      .version(version)
      .option('-p, --port', 'Set port if you want')
      .parse(argv);

    
    if (program.port) {
       port = program.port;
    }

    var source = argv[2] || 'db.json';

    //check source is json or not
    if (/\.json$/.test(source)) {
      var filePath = process.cwd() + '/' + source;
      var jsonData = require(filePath);
      server(jsonData, filePath);
    }

};