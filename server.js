const express = require('express')
const next = require('next')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Parsers
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Custom middleware
const authMiddleware = require('./server/middleware');

// This could be improved!
var secret = new Buffer('tocabocasecret', 'base64');
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Todo: Fix better storing of user data
var user = {
    email: 'null',
    password: 'null'
}

app.prepare()
    .then(() => {
        const server = express()



        server.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
            next();
        });



        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(bodyParser.json());
        server.use(cookieParser());

        server.get('/api/signin', function(req, res) {
            res.send('Server sent this to SignIn');
        });

        server.get('/api/signout', authMiddleware, function(req, res) {
            res.send('Secret site!');
        });

        server.get('/api/verify', authMiddleware, function(req, res) {
            res.sendStatus(200);
        });



        server.post('/api/login', function(req, res) {
            const { email, password } = req.body;
            console.log('Authenticating...')

            // Todo: Implement Firebase (or something) here

            // Check if user is correct
            if(email === user.email){

                bcrypt.compare(password, user.password, function (err, result) {
                    if (result === true) {

                        console.log('Success! Creating and setting JWT...')

                        // Let's create a token
                        let token = jwt.sign(
                            {email: email },
                            secret,
                            { expiresIn: 129600 }
                        );

                        // Store browser cookie
                        res.cookie('token', token, { httpOnly: true }).sendStatus(200);

                    } else {
                        res.status(400).json({ error: true, message: 'Incorrect credentials' });
                    }
                });

            } else {
              res.status(400).json({ error: true, message: 'Incorrect credentials' });
            }

        });

        server.post('/api/register', function(req, res) {
            const { email, password } = req.body;

            // Hash the password and store the user
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, function (err, hash) {
                // Todo: Fix better user storing
                user = { email: email, password: hash }
                res.status(200).send("Stored!");
            });

        });

        server.get('/api/getuser', function(req, res) {
            res.send(user);
        });

        server.get('*', (req, res) => {
            return handle(req, res)
        })
    
        server.listen(3000, (err) => {
        if (err) throw err
            console.log('Server is ready!')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })