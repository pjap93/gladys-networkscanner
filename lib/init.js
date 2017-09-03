const scan = require('./scan.js');
const checkUsersPrensence = require('./checkUsersPresence.js');

//https://github.com/merencia/node-cron
var cron = require('node-cron');

module.exports = function init(){

    // get network scanner frequency
    return gladys.param.getValues(['NETWORK_SCANNER_FREQUENCY_IN_MINUTE','NETWORK_SCANNER_CHECKUSERPRESENCE_IN_MINUTE'])
        .spread((networkScannerFrequency, networkScannerCheckUserPresence) => {

            sails.log.debug(`NetworkScanner will scan network each ${networkScannerFrequency} minutes.`);
            // scan network at the given frequency
            setInterval(function(){
                scan();
                }, parseInt(networkScannerFrequency)*60*1000);

            sails.log.debug(`Checkuserspresence will scan network each ${networkScannerCheckUserPresence} minutes.`);
            // scan checkuserspresence at the given frequency
            setInterval(function(){
                checkUsersPrensence();
                }, parseInt(networkScannerCheckUserPresence)*60*1000);

    });
};
