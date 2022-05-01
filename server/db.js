const mysql = require('mysql');

const conn = mysql.createConnection({
    host      : process.env.DB_HOST,
    user      : process.env.DB_USER,
    password  : process.env.DB_PASSWORD,
    database  : process.env.DB_DATABASE,
    timezone  : process.env.DB_TIMEZONE
  })
  
conn.connect();

function getImagesBySub(sub){
    return new Promise((resolve, reject) => {
        conn.query('SELECT image.name AS image, owner.name AS owner, image.date FROM image JOIN user_image ON image.id = user_image.image_id JOIN owner ON image.owner_id = owner.id WHERE user_image.sub = ?', [sub], function (error, results, fields) {
            if (error) console.log(error);
            resolve(results);
          });
    })
}

module.exports = {
    getImagesBySub
}