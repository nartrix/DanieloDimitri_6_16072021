const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const mongoose = require('mongoose');
const helmet = require("helmet");   
const path = require('path');
const sauceRoute = require('./routes/sauce');
const userRoute = require('./routes/user'); 

require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN_USERNAME}:${process.env.DB_ADMIN_PASSWORD}@cluster0.valxr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
   })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(helmet());

app.use(cors({origin: 'http://localhost:4200'})); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoute);
app.use('/api/auth', userRoute);

module.exports = app;