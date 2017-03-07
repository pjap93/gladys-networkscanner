const nmap = require('node-nmap');
const Promise = require('bluebird');

module.exports = function scan() {

    // get the range of IP address
    return gladys.param.getValue('NETWORK_SCANNER_HOSTS')
        .then((networkScannerHost) => {

            return new Promise(function(resolve, reject){
                var quickscan = new nmap.nodenmap.QuickScan(networkScannerHost);

                quickscan.on('complete', function(data){
                    sails.log.debug(`Network scan completed. Found ${data.length} devices.`);
                    resolve(data);
                });

                quickscan.on('error', function(error){
                    sails.log.error('Network Scanner Error :' + error);
                    reject(error);
                });
            });
        })
        .then((data) => {

            // get house only if there is devices connected
            if(data.length === 0) return [data];    
        
            return [data, gladys.machine.getMyHouse()];
        })
        .spread((data, house) => {

            return Promise.map(data, function(item){
                return gladys.device.create({
                    device: {
                        name: item.hostname,
                        identifier: item.hostname,
                        protocol: 'network',
                        service: 'networkscanner'
                    },
                    types: []
                })
                .then((device) => {
                    if(!device.user) return null;

                    // the user has been seen, save it
                    return gladys.house.userSeen({house: house.id, user: device.user});
                });
            });
        });
};