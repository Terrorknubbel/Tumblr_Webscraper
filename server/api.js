const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();
const fs = require('fs');
const db = require('./db');

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

router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/tumblr/images', authenticateToken, async (req, res) => {
  let results = await db.getImagesBySub(req.user.sub);
  console.log(req.user.sub);
  let data = [];

  let path = '/tumblr/';

  results.forEach(function(result){
    if(!fs.existsSync(__dirname + '/assets/' + result.image)){  //only push to array if the image really exists
      return;
    }

    data.push({
      'owner': result.owner,
      'image': path + result.image,
      'date': result.date.toLocaleString()
    });
  })
  console.log(data);
  res.send(data);
})

router.get('/tumblr/:image', async (req, res) => {
  let image = req.params.image;
  let imagepath = __dirname + '/assets/' + image;
  if(fs.existsSync(imagepath)){
    res.sendFile(__dirname + '/assets/' + image);
  }else{
    res.sendStatus(404);
  }


});

router.post('/addImagesToDB', (req, res) => {
  fs.readdir(__dirname + "/assets", function(err, files){
    if(err){
      return console.log(err);
    }

    files.forEach((file) => {
      db.addImage(file, 1);
    })

    res.send();
  })
})

router.post('/userimage', async (req, res) => {
  let user_id = req.body.user_id;
  let image_name = req.body.image;

  if(typeof user_id === 'undefined' || typeof image_name === 'undefined'){
    res.sendStatus(400);
    return;
  }

  let image = await db.getImageByName(image_name);
  if(typeof image === 'undefined'){
    res.sendStatus(400);
    return;
  };

  let image_id = image["id"];
  let result = await db.insertUserImage(user_id, image_id);

  console.log(result);
  res.send(image_id.toString());
})

router.delete('/userimage/:id', (req, res) => {
  db.deleteAllImagesFromUser(req.params.id);
  res.send();
})

module.exports = router;