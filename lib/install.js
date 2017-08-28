var Promise = require('bluebird');
//var box = require('./boxContent.js');
//var shared = require('./shared.js');
var fse = require('fs-extra');

module.exports = function() {

	var dy = new Date().toISOString().slice(0,10);
	var dh = new Date().toISOString().slice(12,19);

	var optionscron = {
		name: "CheckPresence",
		cronrule: '*/2 * * * *',
		user: '1'
	}

	//gladys.alarm.create(optionscron)
	//.then(() => {console.log("Alarm cron CheckPrence created");});
	

	// NETWORK_SCANNER_HOSTS à définir par l'utilisateur
	gladys.param.setValue({name: 'NETWORK_SCANNER_HOSTS', value: '192.168.0.1'});
	// Durée de scrutations en minutes du réseau
	gladys.param.setValue({name: 'NETWORK_SCANNER_FREQUENCY_IN_MINUTE', value: '5'});
	// USER_TIME_BEFORE_CONSIDERING_LEFT_HOME en minutes pour la passage auto en mode sorti
	gladys.param.setValue({name: 'USER_TIME_BEFORE_CONSIDERING_LEFT_HOME', value: '10'});
	
	sails.log.info('networkscanner : Module installed');
	return Promise.resolve();

};
