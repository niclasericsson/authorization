const express = require('express')
const next = require('next')
const parser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Not a nice solution...
const secret = 'tocabocasecret';
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
console.log('Init server')

var user = {
    email: 'null',
    password: 'null'
}

app.prepare()
    .then(() => {
        const server = express()

  server.use(parser.urlencoded({ extended: false }));
  server.use(parser.json());

  server.get('/api/signin', function(req, res) {
    res.send('Server sent this to SignIn');
  });
  server.get('/api/signout', function(req, res) {
    res.send('Server sent this to page 3');
  });



    server.post('/api/login', function(req, res) {
        const { email, password } = req.body;
        console.log('Authenticating...')

        //console.log(email)
        //console.log(password)
        //const user = new User({ email, password });

        // Todo: Implement Firebase here
        // Check if user is correct

        if(email === user.email && password === user.password){
            const token = jwt.sign({email}, password, {expiresIn: '2h'});
            console.log('Success! Creating and setting JWT...')
            console.log(jwt)
            res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        } else {
          res.status(400).json({ error: true, message: 'Incorrect credentials' });
        }


    });



    server.post('/api/register', function(req, res) {
      const { email, password } = req.body;

      // Todo: Fix better storing here

      user = { email: email, password: password }
      res.status(200).send("Stored!");
    });

    server.get('/api/getuser', function(req, res) {
        res.send(user);
    });



    
  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http:/'+'/localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})