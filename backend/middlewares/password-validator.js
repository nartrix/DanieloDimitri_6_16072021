const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) { // if the password form is not filled in correctly return an error
        return res.status(400).send({message: 'Mot de passe pas assez fort ! ' + passwordSchema.validate(req.body.password, {list:true})});
    } else {
        next();
    }
};