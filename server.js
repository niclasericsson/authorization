// Initialize server
const express = require('express')
const next = require('next')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Parsers
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Custom middleware
const authMiddleware = require('./server/middleware');

// Set a secret - this could be improved!
var secret = new Buffer('tocabocasecret', 'base64');

// Initialize Firebase
var fb = require("firebase-admin");
var serviceAccount = require("./server/serviceAccount.json");
fb.initializeApp({
  credential: fb.credential.cert(serviceAccount),
  databaseURL: "https:/"+"/tocaboca-project.firebaseio.com",
  authDomain: "tocaboca-project.firebaseapp.com",
  projectId: "tocaboca-project"
});

app.prepare()
    .then(() => {
        const server = express();

        // Allow Authorization header
        server.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
            next();
        });

        // Use parsers
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(bodyParser.json());
        server.use(cookieParser());

        server.get('/api/verify', authMiddleware, function(req, res) {
            res.sendStatus(200);
        });

        server.get('/api/getuser', authMiddleware, function(req, res) {
            res.json({ user: req.email });
        });

        server.post('/api/login', function(req, res) {
            const { email, password } = req.body;
            console.log('Authorizing...')

            // Check Firebase for user
            fb.database().ref('users/' + email).once('value').then(function(snapshot) {
                var passwordToCheck = snapshot.val()

                // If user exists, check password
                if(passwordToCheck){
                    console.log('User exists, checking password...')
                    bcrypt.compare(password, passwordToCheck, function (err, result) {
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
                            console.log('Wrong password')
                            res.status(400).json({ error: true, message: 'Wrong password' });
                        }
                    });

                } else {
                    console.log('No user found')
                    res.status(400).json({ error: true, message: 'No user found' });
                }

            });

        });

        server.get('/api/logout', function(req, res) {
            res.clearCookie('token').status(200);
        });

        server.post('/api/register', function(req, res) {
            const { email, password } = req.body;

            // Hash the password and store the user
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, function (err, hash) {

                // Store user with password in Firebase
                fb.database().ref('users/' + email).set(hash);

                res.status(200).send("Stored!");
            });

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