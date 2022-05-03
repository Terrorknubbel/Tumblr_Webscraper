const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();
const fs = require('fs');
const db = require('../db');
const path = require('path');

router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
    
    let secret = process.env.SECRET.replace(/\\n/g, '\n');
  
    jwt.verify(token, secret, { algorithm: 'RS256' }, (err, user) => {
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }

router.get('/images', authenticateToken, async (req, res) => {
    let results = await db.getImagesByUserId(req.user.sub);
    let data = [];
  
    let path = '/tumblr/images/';
  
    results.forEach(function(result){
      if(!fs.existsSync(__dirname + '/../assets/' + result.image)){  //only push to array if the image really exists
        return;
      }
  
      data.push({
        'owner': result.owner,
        'image': path + result.image,
        'date': result.date.toLocaleString()
      });
    })

    res.send(data);
});

router.get('/images/:image', async (req, res) => {
    let image = req.params.image;
    console.log(image);
    let imagepath = __dirname + '/../assets/' + image;
    if(fs.existsSync(imagepath)){
        res.sendFile(path.resolve(__dirname + '/../assets/' + image));
    }else{
        res.sendStatus(404);
    }
});

router.get('/scraper', authenticateToken, async (req, res) => {
    let all_user_scraper = await db.getAllUserScraper(req.user.sub);
    res.send(all_user_scraper);
})

router.post('/scraper', authenticateToken, async (req, res) => {
    let username = req.body.username;
    let interval = req.body.interval;
    let notification = req.body.notification;

    if(typeof username === 'undefined' || typeof interval === 'undefined' || typeof notification === 'undefined') { 
        res.sendStatus(400);
        return;
    };

    let user_scraper = await db.getUserScraper(req.user.sub, 'tumblr', username);
    
    if(typeof user_scraper === 'undefined'){
        let scraper = await db.getScraper('tumblr', username, interval);
        if(typeof scraper === 'undefined'){
            let scraper_id = await db.addScraper('tumblr', username, interval);
            await db.addUserScraper(req.user.sub, scraper_id, notification);

        }else{
            await db.addUserScraper(req.user.sub, scraper["id"], notification);
        }
    }else{
        res.sendStatus(400);
        return;
    }

    let all_user_scraper = await db.getAllUserScraper(req.user.sub);
    res.send(all_user_scraper);
})

module.exports = router;