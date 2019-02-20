const express = require('express')
const next = require('next')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
console.log('Init server')

app.prepare()
.then(() => {
  const server = express()

  server.get('/api/home', function(req, res) {
    res.send('Hello and welcome to Home!');
  });
  server.get('/api/page2', function(req, res) {
    res.send('Server sent this to page 2');
  });
    
  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})