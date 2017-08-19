const nmap = require('node-nmap');
const Promise = require('bluebird');
var ping = require ("net-ping");

module.exports = function scan() {

    // get the range of IP address
    return gladys.param.getValue('NETWORK_SCANNER_HOSTS')
        .then((networkScannerHost) => {

            return new Promise(function(resolve, reject){
				var session = ping.createSession ();

					session.pingHost (networkScannerHost, function (error, target) {
					if (error)
						console.log (target + ": " + error.toString ());
					else
						console.log (target + ": Alive");
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
                    types: []
                })
                .then((device) => {
                    if(!device.device || !device.device.user) return null;

                    // the user has been seen, save it
                    return gladys.house.userSeen({house: house.id, user: device.device.user});
                });
            });
        });
};