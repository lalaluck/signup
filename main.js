 const express = require('express');
 const bodyParser = require('body-parser');
 const dotenv = require('dotenv').config();
 const https = require('https');
 const url = require('url');
 //let parse = require('parse/node');


 //const role = Parse.Object.extend('role');
 const app = express();

 app.use(express.static('public'));
 //在server中找到public file
 app.use(bodyParser.urlencoded({extended: true}));

 app.get('/', (req, res) => {
     res.sendFile(__dirname + '/signup.html');
 })

 app.post('/', (req, res) => {
     const firstName = req.body.fName;
     const lastName = req.body.lName;
     const email = req.body.email;
     //對應html輸入資料
     const data = {
         'members': [
             {
                 email_address: email,
                 status: 'subscribed',
                 merge_fields: {
                     FNAME: firstName,
                     LNAME: lastName
                 }                
             }
         ]
     }

     const jsonData = JSON.stringify(data);
     const url = 'https://us9.api.mailchimp.com/3.0/lists/91e6fdcc89';
     const options = {
         url: 'https://us9.api.mailchimp.com/3.0/lists/91e6fdcc89',
         method: 'POST',
         auth: process.env.AUTH
     }
     const request = https.request(url, options, (response) => {

         if (response.statusCode === 200){
             res.sendFile(__dirname + '/success.html');
         } else {
             res.sendFile(__dirname + '/failure.html');
         }

         response.on('data', (data) => {
             console.log(JSON.parse(data));
         })
     })

     request.write(jsonData);
     request.end();
 })

 app.post('/failure', (req, res) => {
     res.redirect('/');
 })

 const port = process.env.PORT || 3000;

 app.listen(port, () => {
    console.log('Server is running on port ' + port + '.');
 })

