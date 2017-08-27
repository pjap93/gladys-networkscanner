const queries = require('./queries.js');
const Promise = require('bluebird');

module.exports = function checkUsersPresence(){
    sails.log.debug(`House : checkUsersPresence`);

    // first, get the time a user is considered not at home anymore
    return gladys.param.getValue('USER_TIME_BEFORE_CONSIDERING_LEFT_HOME')
        .then((timeBeforeLeftInMinute) => {

            // get all houses
            return [timeBeforeLeftInMinute, gladys.house.getAll()];
        })
        .spread((timeBeforeLeftInMinute, houses) => {

            return [houses, 
                Promise.map(houses, function(house) {  
                    return gladys.utils.sql(queries.getUserAtHomeAndNotSeenSince, [house.id, house.id, timeBeforeLeftInMinute,'networkscanner']);
                })
            ];
        })
        .spread((houses, usersArray) => {

            // foreach house
            return Promise.map(houses, function(house, index) {

                // foreach user in this house and not put as 
                return Promise.map(usersArray[index], function(user) {
                    sails.log.debug(`House : checkUserPresence : Putting user ${user.id} as left house : ${house.id}`);
                    return gladys.event.create({code: 'left-home', user: user.id, house: house.id});
                });
            });
        });
};
