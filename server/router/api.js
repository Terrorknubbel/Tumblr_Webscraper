const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require('dotenv').config();
const fs = require('fs');
const db = require('../db');
const tumblrRouter = require('./tumblrRouter');

router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use('/tumblr', tumblrRouter);

router.patch('/addImagesToDB', (req, res) => {
  fs.readdir(__dirname + "/../assets", function(err, files){
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