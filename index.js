
module.exports = function(sails) {

    const scan = require('./lib/scan.js');
    const init = require('./lib/init.js');
    const install = require('./lib/install.js');
    const uninstall = require('./lib/uninstall.js');
    const setup = require('./lib/setup.js');

    gladys.on('ready', function(){
        scan();
        init();
    });
    
    return {
        scan,
        setup,
        install: install,
        uninstall: uninstall
    };
};
