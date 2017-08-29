const scan = require('./scan.js');
const checkUsersPrensence = require('./checkUsersPresence.js');

module.exports = function init(){

    // get network scanner frequency
    return gladys.param.getValue('NETWORK_SCANNER_FREQUENCY_IN_MINUTE')
        .then((networkScannerFrequency) => {

            sails.log.debug(`NetworkScanner will scan network each ${networkScannerFrequency} minutes.`);

            // scan network at the given frequency
            setInterval(function(){
                scan();
                }, parseInt(networkScannerFrequency)*60*1000);

            // scan checkuserspresence at the given frequency
            setInterval(function(){
                checkUsersPrensence();
                }, (2*60*1000));

    });
};
