const mysql = require('mysql');

const conn = mysql.createConnection({
    host      : process.env.DB_HOST,
    user      : process.env.DB_USER,
    password  : process.env.DB_PASSWORD,
    database  : process.env.DB_DATABASE,
    timezone  : process.env.DB_TIMEZONE,
    multipleStatements: true
  })
  
conn.connect();

function getImagesByUserId(user_id){
    return new Promise((resolve, reject) => {
        conn.query('SELECT image.name AS image, owner.name AS owner, image.date FROM image JOIN user_image ON image.id = user_image.image_id JOIN owner ON image.owner_id = owner.id WHERE user_image.user_id = ?', [user_id], function (error, results, fields) {
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
        conn.query('INSERT INTO user_image (user_id, image_id) VALUE (?, ?)', [user_id, image_id], function(error, results, fields){
            if (error) console.log(error);
            resolve(results);
        });
    })
}

function deleteAllImagesFromUser(user_id){
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM user_image WHERE user_id = ?', [user_id], function(error, results, fields){
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
        conn.query('INSERT INTO user_image (user_id, image_id) VALUES (?, ?)', [user_id, image_id], function(error, results, fields){
            if (error) console.log(error);
            resolve(results);
        });
    })
}

function getScraper(website_name, username, interval){
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM scraper WHERE website_name = ? AND username = ? AND `interval` = ? LIMIT 1;', [website_name, username, interval], function(error, results, fields){
            if (error) console.log(error);
            resolve(results[0]);
        });
    })
}

function addScraper(website_name, username, interval){
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO scraper (`website_name`, `username`, `interval`) VALUES (?, ?, ?); SELECT LAST_INSERT_ID() as id;', [website_name, username, interval], function(error, results, fields){
            if (error) console.log(error);
            resolve(results[1][0]["id"]);
        });
    })
}

function getAllUserScraper(user_id){
    return new Promise((resolve, reject) => {
        conn.query('SELECT scraper.username, scraper.interval, user_scraper.notification, user_scraper.paused FROM user_scraper JOIN scraper ON user_scraper.scraper_id = scraper.id WHERE user_scraper.user_id = ?', [user_id], function(error, results, fields){
            if (error) console.log(error);
            resolve(results);
        });
    })
}

function getUserScraper(user_id, website_name, username){
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM user_scraper JOIN scraper ON user_scraper.scraper_id = scraper.id WHERE user_scraper.user_id = ? AND scraper.website_name = ? AND scraper.username = ?', [user_id, website_name, username], function(error, results, fields){
            if (error) console.log(error);
            resolve(results[0]);
        });
    })
}

function addUserScraper(user_id, scraper_id, notification) {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO user_scraper (`user_id`, `scraper_id`, `notification`) VALUES (?, ?, ?);', [user_id, scraper_id, notification], function(error, results, fields){
            if (error) console.log(error);
            resolve(results);
        });
    })
}

module.exports = {
    getImagesByUserId,
    addImage,
    assignImageToUser,
    deleteAllImagesFromUser,
    getImageByName,
    insertUserImage,
    getScraper,
    addScraper,
    getUserScraper,
    addUserScraper,
    getAllUserScraper
}