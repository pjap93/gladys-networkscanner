
module.exports = function(sails) {

    const scan = require('./lib/scan.js');
    const init = require('./lib/init.js');
    const install = require('./lib/install.js');
    const uninstall = require('./lib/uninstall.js');

    gladys.on('ready', function(){
        scan();
        init();
    });
    
    return {
        scan,
        install: install,
        uninstall: uninstall
    };
};
