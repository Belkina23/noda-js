const mongoose = require('mongoose');

const app = require('./app')

const DB_HOST = 'mongodb+srv://MilD:DqgNyh0jAQmYie4D@cluster1.6oeqb7m.mongodb.net/contacts?retryWrites=true&w=majority';

mongoose.connect(DB_HOST)
.then(() => app.listen(3000))
.catch(error => console.log(error.message));