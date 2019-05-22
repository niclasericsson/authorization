const secret = Buffer.from('supersecretkey', 'base64');
const jwt = require('jsonwebtoken');

const authMiddleware = function(req, res, next) {
 	const token = req.cookies.token || req.headers['x-access-token'] || req.body.token || req.query.token;
 	if(!token){
    	res.send(JSON.stringify({ error: true, message: 'No token' }));
  	} else {
    	jwt.verify(token, secret, function(error, decoded) {
	      	if(error){
	        	res.status(401).send(JSON.stringify({ error: true, message: 'Invalid token' }));
	      	} else {
	        	req.username = decoded.username;
	        	next();
	      	}
	    });
  	}
}

module.exports = authMiddleware;