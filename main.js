const express = require('express');
const bodyParser = require('body-parser');
//let parse = require('parse/node');


//const role = Parse.Object.extend('role');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
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
<<<<<<< HEAD
    const url = process.env.url;
    const options = {
        method: 'POST',
        auth: process.env.auth
=======
    const url = 'https://us9.api.mailchimp.com/3.0/lists/listid';
    const options = {
        method: 'POST',
        auth: 'Dara:Authorized_id'
>>>>>>> 4d01e5cf3fa2afc0e3f6d40c7dd71aac0c9a2501
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

<<<<<<< HEAD

=======
>>>>>>> 4d01e5cf3fa2afc0e3f6d40c7dd71aac0c9a2501

