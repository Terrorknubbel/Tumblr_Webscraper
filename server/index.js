const express = require('express');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)
  
//     let secret = `-----BEGIN CERTIFICATE-----
// MIIDDTCCAfWgAwIBAgIJGAqENad14lREMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
// BAMTGWRldi1kNnd2M240ci51cy5hdXRoMC5jb20wHhcNMjIwNDE3MTcyMjIyWhcN
// MzUxMjI1MTcyMjIyWjAkMSIwIAYDVQQDExlkZXYtZDZ3djNuNHIudXMuYXV0aDAu
// Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0B4SxdHkgWPr3Dq7
// u6AxIeliad7ek9SfLH1HjN3Mqzn/fh01X5A9+DsD1y70+uQRzn6JK2bmnKw/IKts
// 6I9udKciu/yEJBGshjBZV71zFhR33J5iBPfrAGT36kX45egxDzPL6BIekSZrii+4
// DFA122q77e7AQlKbOKxQioLsPxZ1Vk07LMgMJVjmv4g9iHYpDAGx5mgBqr4oSdzm
// hIWheFhmGRbC/ijMEDx7f6SAjO/3kyd0MnCc6XFkzXMLciMrw7YeKjAuCPNJy7Ay
// CoI58Lt/R/c6WuFodDi9y00fuZ94oUkOA5Hc2lRtnK/JeW9ZjIzr3W324+q6YZd4
// twb0UQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTpHs/arw24
// qwKL6074MSMJPJtL0TAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
// AMi/XFJKdTtKaXjpcAcRIt3iAcM2BijSCXUJ66npagIBIcjMkrFXf0iP4Pd1R0/R
// 4rAdxelY/67u66uj8utLV/HoY0QsmtcNqC/AWGofL/Vnq+bZub7iH/D44y4CiZGx
// Ov636oQa7+5FS0YEytnRWseap0gAONQOooZGBXsR4jwvYmI4Np7IfW6L3hXeLklw
// 9vtyw3ZFIU9AUbevi2giuGrHkNGAZdiTJ3jxtsKwD0ElQgIIbgMpBT/+EOQ6vXFS
// NzkVIeOAnQ45+cNmgMAsNwQXpOUPq5B5/gvSvv/nwbHBcu5ytJ7jJRObwOhF7Za+
// x/UANg5CAo5W32HMlZvrGDA=
// -----END CERTIFICATE-----
//     `
var secret = process.env.SECRET.replace(/\\n/g, '\n');
  //let secret = process.env.SECRET;
  console.log(secret);

  jwt.verify(token, secret, { algorithm: 'RS256' }, (err, user) => {

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

app.use(cors())

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});
  
  // This route needs authentication
app.get('/api/private', authenticateToken, function(req, res) {
  console.log(req.user);

    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});
  app.listen(3001, () => {
      console.log("Listening on Port: " + 3001);
  });