const express = require('express')
const next = require('next')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
console.log('Init server')

app.prepare()
.then(() => {
  const server = express()

  server.get('/page2', function(req, res) {
    res.send('Server sent this to page 2');
  });
  server.get('/page3', function(req, res) {
    res.send('Server sent this to page 3');
  });



  server.post('/login', function(req, res) {
    const { email, password } = req.body;
    //const user = new User({ email, password });
    res.status(200).send("Signed in");
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