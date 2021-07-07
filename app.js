const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Import ROUTES
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//Ability to create ROUTES
app.get('/', (req,res) => {
  res.send('We are on home!');
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('connected to DB');
});

//Listening to the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started at Port", PORT);
});
