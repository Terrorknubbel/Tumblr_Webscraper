const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
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

router.get('/tumblr/images', authenticateToken, async (req, res) => {
  let results = await db.getImagesBySub(req.user.sub);
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

module.exports = router;