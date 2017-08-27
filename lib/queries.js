

module.exports = {
  delete: 'DELETE FROM house WHERE id = ?;',
  get: `SELECT * FROM house LIMIT ? OFFSET ?;`,
  getById: 'SELECT * FROM house WHERE id = ?;',
  getAll: `SELECT * FROM house;`,
  getUsers: `
    SELECT user.*,
      ( 
        SELECT eventtype.code
        FROM event 
        JOIN eventtype ON event.eventtype = eventtype.id
        WHERE 
        ( eventtype.code = 'back-at-home' OR eventtype.code = 'left-home' )
        AND user = user.id
        AND house = ?
        ORDER BY datetime DESC LIMIT 1 ) AS lastHouseEvent
      FROM user 
      HAVING lastHouseEvent = 'back-at-home'
  `,
  isUserAtHome: `
    SELECT user.*,
      ( 
        SELECT eventtype.code
        FROM event 
        JOIN eventtype ON event.eventtype = eventtype.id
        WHERE 
        ( eventtype.code = 'back-at-home' OR eventtype.code = 'left-home' )
        AND user = user.id 
        AND house = ?
        ORDER BY datetime DESC LIMIT 1 ) AS lastHouseEvent
      FROM user 
      WHERE user.id = ?
      HAVING lastHouseEvent = 'back-at-home'
  `,
  getUserAtHomeAndNotSeenSince: 
  `
    SELECT user.id,user.firstname,MAX(event.datetime) as datetime  
    FROM user
    JOIN event ON event.user = user.id
    JOIN eventtype ON event.eventtype = eventtype.id
    WHERE ( eventtype.code = 'back-at-home' OR eventtype.code = 'user-seen-at-home' )
    AND event.house = ?
    AND user.id IN (
        SELECT device.user
        FROM device
        WHERE ( 
            SELECT eventtype.code
            FROM event 
            JOIN eventtype ON event.eventtype = eventtype.id
            WHERE 
            ( eventtype.code = 'back-at-home' OR eventtype.code = 'left-home' )
            AND event.user = device.user
            AND event.house = ?
            ORDER BY datetime DESC LIMIT 1 ) = 'back-at-home'
        AND device.service = ?
        GROUP BY device.user
    )
    GROUP BY user.id 
    HAVING datetime < DATE_SUB(NOW(), INTERVAL ? MINUTE)
  `
};
