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
    const url = 'https://us9.api.mailchimp.com/3.0/lists/91e6fdcc89';
    const options = {
        method: 'POST',
        auth: 'Dara:64e51ef0e2f6d2c31a2fb3a0b3b0dee8-us9'
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

//listid 91e6fdcc89

