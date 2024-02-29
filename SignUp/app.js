const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const dbName = 'db1';
const dbUrl = `mongodb://localhost:27017/${dbName}`;

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/db1', {
     useNewUrlParser: true,
      useUnifiedTopology: true 
    });

    const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  // You can start your server or perform other operations here
});

// Configure Handlebars
const hbs = exphbs.create({ extname : 'hbs'});
app.engine('hbs',hbs.engine);
app.set('view engine', 'hbs');

// Configure body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// User model
const User = require('./models/user');

// Routes
app.get('/', (req, res) => {
    res.render('signup');
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.send('User created successfully!');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});