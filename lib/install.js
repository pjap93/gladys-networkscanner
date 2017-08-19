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

	gladys.alarm.create(optionscron)
	.then(() => {console.log("Alarm cron CheckPrence created");});
	

	// NETWORK_SCANNER_HOSTS à définir par l'utilisateur
	gladys.param.setValue({name: 'NETWORK_SCANNER_HOSTS', value: 'NULL'});
	// Durée de scrutations en minutes du réseau
	gladys.param.setValue({name: 'NETWORK_SCANNER_FREQUENCY_IN_MINUTE', value: '2'});
	// USER_TIME_BEFORE_CONSIDERING_LEFT_HOME en minutes pour la passage auto en mode sorti
	gladys.param.setValue({name: 'USER_TIME_BEFORE_CONSIDERING_LEFT_HOME', value: '10'});
	
	//Ajout du script CheckPrence dans la base
	gladys.utils.sql("INSERT INTO script (name, text, user) VALUES ('CheckPresence', 'gladys.house.checkUsersPresence();','1');");
	
	sails.log.info('networkscanner : Module installed');
	return Promise.resolve();

}