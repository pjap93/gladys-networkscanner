var nmap = require('node-nmap');
var Promise = require('bluebird');
var glob = [];
var queries = require('./queries.js');

//http://github.com/danielzzz/node-ping
var ping = require('ping');



module.exports = function scan() {

    // get the range of IP address
    return gladys.utils.sql(queries.getIPDevice)
        .then((networkScannerHost) => {
	
            return new Promise(function(resolve, reject){
                networkScannerHost.forEach(function(host){

                    ping.sys.probe(host.identifier, function(isAlive){
                    var msg = isAlive ? 'host ' + host.identifier + ' is alive' : 'host ' + host.identifier + ' is dead';
                    console.log(msg);
	                    if(isAlive) {
	                    glob.push({
	                        'hostname': null,
                                'ip': host.identifier,
                                'mac': null});
	                    };
                    });
	                resolve(glob);
                });

	        });
        })
        .then((data) => {
	        glob=[];
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
                    if(!device.device || !device.device.user) return null;

                    // the user has been seen, save it
                    return gladys.house.userSeen({house: house.id, user: device.device.user});
                });
            });
        });
};