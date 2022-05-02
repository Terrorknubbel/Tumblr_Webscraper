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

function addImage(name, owner_id){
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO image (name, owner_id) VALUE (?, ?) ON DUPLICATE KEY UPDATE owner_id = ?', [name, owner_id, owner_id], function(error, results, fields){
            if (error) console.log(error);
            resolve(results);
        });
    })
}

function assignImageToUser(user_id, image_id){
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO user_image (sub, image_id) VALUE (?, ?)', [user_id, image_id], function(error, results, fields){
            if (error) console.log(error);
            resolve(results);
        });
    })
}

function deleteAllImagesFromUser(user_id){
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM user_image WHERE sub = ?', [user_id], function(error, results, fields){
            if (error) console.log(error);
            resolve(results);
        });
    })
}

function getImageByName(image){
    return new Promise((resolve, reject) => {
        conn.query('SELECT * from image WHERE name = ? LIMIT 1', [image], function(error, results, fields){
            if (error) console.log(error);
            resolve(results[0]);
        });
    })
}

function insertUserImage(user_id, image_id){
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO user_image (sub, image_id) VALUES (?, ?)', [user_id, image_id], function(error, results, fields){
            if (error) console.log(error);
            resolve(results);
        });
    })
}

module.exports = {
    getImagesBySub,
    addImage,
    assignImageToUser,
    deleteAllImagesFromUser,
    getImageByName,
    insertUserImage
}