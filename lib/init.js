const scan = require('./scan.js');

module.exports = function init(){

    // get network scanner frequency
    return gladys.param.getValue('NETWORK_SCANNER_FREQUENCY_IN_MINUTE')
        .then((networkScannerFrequency) => {

            sails.log.debug(`NetworkScanner will scan network each ${networkScannerFrequency} minutes.`);

            // scan at the given frequency
            setInterval(function(){
                scan();
            }, parseInt(networkScannerFrequency)*60*1000);
        });
};