var Promise = require('bluebird');

module.exports = function() {
 
	// NETWORK_SCANNER_HOSTS à définir par l'utilisateur
	gladys.param.delete({name: 'NETWORK_SCANNER_HOSTS'});
	// Durée de scrutations en minutes du réseau
	gladys.param.delete({name: 'NETWORK_SCANNER_FREQUENCY_IN_MINUTE'});
	// USER_TIME_BEFORE_CONSIDERING_LEFT_HOME en minutes pour la passage auto en mode sorti
	gladys.param.delete({name: 'USER_TIME_BEFORE_CONSIDERING_LEFT_HOME'});
	
  sails.log.info('networkscanner : Module uninstalled');
  return Promise.resolve();

};
