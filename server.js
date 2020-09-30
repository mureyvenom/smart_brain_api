const express =  require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db_conn = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'postgres',
        database : 'smart_brain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// app.get('/', (req, res) => {
    
// });

app.post('/signin', (req, res)=>{
    signin.handleSignin(req, res, db_conn, bcrypt)
})

app.post('/register', (req, res) => { 
    register.handleRegister(req, res, db_conn, bcrypt) 
});

app.get('/profile/:id', (req, res) => {        
    profile.handleProfile(req, res, db_conn) 
})

app.put('/image', (req, res) => {
    image.handleImage(req, res, db_conn)
});

app.post('imageUrl', (req, res) => {
    image.handleApiCall(req, res)
})

const DATABASE_URL = process.env.DATABASE_URL
app.listen('3001', () => {
    console.log(`Server is running on port ${DATABASE_URL}`);
});

