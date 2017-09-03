const nmap = require('node-nmap');
const Promise = require('bluebird');

module.exports = function() {

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
                
                var name = item.hostname || item.ip || item.mac;
                
                // if no name has been found
                // don't save device
                if(!name) return null;

                return gladys.device.create({
                    device: {
                        name: name,
                        identifier: name,
                        protocol: 'network',
                        service: 'networkscanner'
                    },
                    types: [
                      {
                        name:'Presence',
                        identifier:'Presence',
                        type:'binary',
                        sensor: true,
                        min: 0,
                        max: 255,
                        value: 0
                     }
                   ]
                })
                .then((device) => {
                    if(!device.device || !device.device.user) return null;

                    // the user has been seen, save it
                    return gladys.house.userSeen({house: house.id, user: device.device.user});
                });
            });
        });
};