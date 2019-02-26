var secret = new Buffer('tocabocasecret', 'base64');
const jwt = require('jsonwebtoken');

const authMiddleware = function(req, res, next) {
 	const token = req.cookies.token || req.headers['x-access-token'] || req.body.token || req.query.token;
 	if(!token){
    	res.status(401).send('No token');
  	} else {
    	jwt.verify(token, secret, function(error, decoded) {
	      	if(error){
	        	res.status(401).send('Invalid token');
	      	} else {
	        	req.email = decoded.email;
	        	next();
	      	}
	    });
  	}
}
module.exports = authMiddleware;