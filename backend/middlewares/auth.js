const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // check the token
    const userId = decodedToken.userId; 
    if (req.body.userId && req.body.userId !== userId) { // checks the user and his token and if it does not match is redirected to the error
      throw 'Invalid user ID'; 
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};