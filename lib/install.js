var Promise = require('bluebird');
//var box = require('./boxContent.js');
//var shared = require('./shared.js');
var fse = require('fs-extra');

module.exports = function() {
	var today = new Date();
	var optionscron = {
		name: "CheckPrence",
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
	gladys.utils.sql("INSERT INTO script (name, text, user,createdAt,updatedAt) VALUES ('CheckPrence', 'gladys.house.checkUsersPresence();','1',${today},${today});");
	
	// Emplacement où seront sauvegardée toutes les vidéos
	gladys.param.setValue({name: 'GUARD_SAVE_LOCATION', value: '/home/pi/gladysGuardVideos/'});
	// Création du répertoire s'il n'existe pas
	fse.mkdirsSync('/home/pi/gladysGuardVideos/');
	// Résolution de la vidéo : width
	gladys.param.setValue({name: 'GUARD_RES_WIDTH', value: '1280'});
	// Résolution de la vidéo : height
	gladys.param.setValue({name: 'GUARD_RES_HEIGHT', value: '720'});
	// Nombre d'images par seconde
	gladys.param.setValue({name: 'GUARD_VID_FPS', value: '12'});
	
	sails.log.info('networkscanner : Module installed');
	return Promise.resolve();

}