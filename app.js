const Database = require('./db_interaction');
const dotenv = require('dotenv').config();

// const express = require('express');
// const { body, validationResult } = require('express-validator');
// const ejs = require('ejs');
// const path = require('path');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');

const db = new Database({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE
});

db.readTable('gladiators_table').then(rows => {
    console.log(rows);
}).catch(err => {
    console.log(err);
});
/*
const obj = {}


const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

const 


app.get('/', (req,res) => {
    conn.query(`select * from users`, (err, result) => {
        if (err) throw err;
        obj.users = result;
        res.render('index', {obj:obj});
    })
})

app.get('/create', (req,res) => {
    res.render('create', {error: ''});
});

app.post('/submit', 
body('username').trim().isLength({min:3, max:15}).escape().withMessage('Username should be between 3 and 15 symbols!'),
body('surname').trim().isLength({min:5, max:15}).escape().withMessage('Surname should be between 5 and 15 symbols!'),
body('department').trim().escape(),
body('user_type').trim().escape(),
body('password').trim().isLength({min:8}).matches('[0-9]').matches('[A-Z]').matches('[a-z]').escape().withMessage('Password should be at least 8 symbols long and contain at least one digit, one lowercase and one uppercase symbol!'),
body('rpassword').trim().isLength({min:8}).matches('[0-9]').matches('[A-Z]').matches('[a-z]').escape().withMessage('Password should be at least 8 symbols long and contain at least one digit, one lowercase and one uppercase symbol!'), 
(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('create', {error: errors.array()[0].msg});
    } else {
        if (req.body.password !== req.body.rpassword) {
            res.render('create', {error: 'Passwords do not match!'});
        } 
        else {
            bcrypt.hash(req.body.password, 12).then(function(hashpass) {
                let sql = `INSERT INTO users (username, surname, department, password, user_type) VALUES (?, ?, ?, ?, ?)`;
                conn.query(sql, [req.body.username, req.body.surname, req.body.department, hashpass, req.body.user_type], function(err, result){
                    if(err) throw err;
                    res.redirect('/');
                });
            });
        }
    }    
})



app.get('/update/:id', (req,res) => {
    const id = req.params.id;
    res.render('update', {id:id, error: ''});
})

app.post('/update', 
body('username').trim().isLength({min:3, max:15}).escape().withMessage('Username should be between 3 and 15 symbols!'),
body('surname').trim().isLength({min:5, max:15}).escape().withMessage('Surname should be between 5 and 15 symbols!'),
body('department').trim().escape(),
body('user_type').trim().escape(),
body('password').trim().isLength({min:8}).matches('[0-9]').matches('[A-Z]').matches('[a-z]').escape().withMessage('Password should be at least 8 symbols long and contain at least one digit, one lowercase and one uppercase symbol!'),
body('rpassword').trim().isLength({min:8}).matches('[0-9]').matches('[A-Z]').matches('[a-z]').escape().withMessage('Password should be at least 8 symbols long and contain at least one digit, one lowercase and one uppercase symbol!'), 
(req,res) => {
    const id = req.body.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('update', {id:id, error: errors.array()[0].msg});
    } else {
        if (req.body.password !== req.body.rpassword) {
            res.render('update', {id:id, error: 'Passwords do not match!'});
        } 
        else {
            bcrypt.hash(req.body.password, 12).then(function(hashpass) {
                let sql = `UPDATE users SET username = ?, surname = ?, department = ?, password = ?, user_type = ? WHERE id = ?`;
                conn.query(sql, [req.body.username, req.body.surname, req.body.department, hashpass, req.body.user_type, req.body.id], function(err, result){
                    if(err) throw err;
                    res.redirect('/');
                });
            });
        }
    }
})



app.get('/delete/:id', (req,res) => {
    const id = req.params.id;
    let sql = `DELETE FROM users WHERE id = ?`;
    conn.query(sql, [id], function(err, result){
        if(err) throw err;
        res.redirect('/');
    });
})

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`running server! on http://localhost:${port}`);
*/

db.close()