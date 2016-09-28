var path = require('path');

function buildConfig() {
    var type = 'react';
    var argv = process.argv;
    if (argv && argv.length > 0) {
        if (/^-angular$/i.test(argv[argv.length - 1])) {
            type = 'angular';
        }
    }
    var config = require(path.join(__dirname, 'webpack_cfg/' + type + '.config'));
    return config;
}
module.exports = buildConfig();
