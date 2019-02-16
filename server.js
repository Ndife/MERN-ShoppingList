const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/item');

const app = express();

//BodyParser Middleware 
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI; 
// const db = "mongodb://localhost:27017/items"; 

// Connect to Mongo
mongoose
.connect(db, {useNewUrlParser: true})
.then(() => console.log('Mongodb Connected'))
.catch((err)=> console.log(err));

// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    
    // Set static folder
    app.use(express.static('client/build'));

    app.get('/*', (req, res) =>{
        res.sendFile(patch.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))