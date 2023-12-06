const Database = require('./db_interaction');
const dotenv = require('dotenv').config();
const express = require('express');
const { body, validationResult } = require('express-validator');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const db = new Database({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE
});

const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

const isAuthenticated = (req, res, next) => {
    if (req.session.loggedin) {
        next();
    } else {
        res.redirect('/login');
    }
};

const isAdmin = (req, res, next) => {
    if (req.session.loggedin && req.session.gladiator.gladiator_type === 'admin') {
        next();
    } else {
        res.redirect('/login');
    }
};

app.get('/', (req,res) => {
    res.render('index');
})

// Here anyone tries to login
app.get('/login', (req,res) => {
    res.render('login', {error: ''});
})

// Here if logged in then redirected to profile otherwise redirected to login. If it is admin then redirected to admin page
app.post('/login', 
    body('name').trim().escape(),
    body('password').trim().escape(),
    (req,res) => {
        db.login(req.body.name, req.body.password).then((result) => {
            if (result) {
                req.session.loggedin = true;
                req.session.gladiator = result; 
                res.redirect('/profile');
            } else {
                res.render('login', {error: 'Wrong name or password!'});
            }
        });
    }
);

app.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/');
});

// Accecible to anyone
app.get('/fights', isAuthenticated, (req,res) => {
    db.readTable('fights_table').then((rows) => {
        const promises = rows.map(element => {
            const name1Promise = db.getGladiatorByID(element.id_gladiator1).then((r) => {
                return r[0].name;
            });
            const name2Promise = db.getGladiatorByID(element.id_gladiator2).then((r) => {
                return r[0].name;
            });
            return Promise.all([name1Promise, name2Promise]).then(([name1, name2]) => {
                const new_element = {
                    id: element.id,
                    name1: name1,
                    name2: name2,
                    fight_date: element.fight_date,
                    arena: element.arena
                };
                return new_element;
            });
        });

        Promise.all(promises).then(fights => {
            res.render('fights', { fights: fights });
        });
    });
})

// to get info about gladiator
app.get('/profile', isAuthenticated, (req,res) => {
    if(req.session.gladiator){
        res.render('profile', {gladiator: req.session.gladiator})
    } else {
        res.redirect('/login');
    }
});

// Here anyone can register
app.get('/register', (req,res) => {
    res.render('register', {error: ''});
})

// Here if registered then redirected to login otherwise redirected to register
app.post('/register', 
body('name').trim().isLength({min:3, max:15}).escape().withMessage('Username should be between 3 and 15 symbols!'),
body('password').trim().isLength({min:8}).matches('[0-9]').matches('[A-Z]').matches('[a-z]').escape().withMessage('Password should be at least 8 symbols long and contain at least one digit, one lowercase and one uppercase symbol!'),
body('age').trim().escape(),
body('experience').trim().escape(),
body('gladiator_type').trim().escape(),
body('rpassword').trim().isLength({min:8}).matches('[0-9]').matches('[A-Z]').matches('[a-z]').escape().withMessage('Password should be at least 8 symbols long and contain at least one digit, one lowercase and one uppercase symbol!'),
(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('register', {error: errors.array()[0].msg});
    } else {
        if (req.body.password !== req.body.rpassword) {
            res.render('register', {error: 'Passwords do not match!'});
        }
        if (req.gladiator_type=='admin') { 
            res.render('register', {error: 'Wrong gladiator type!'});
        } // to prevent from registering like admin
        else {
            db.register(req.body.name, req.body.age, req.body.experience, req.body.password, req.body.gladiator_type).then((result) => {
                if (result) {
                    res.render('login', {error: ''});
                } else {
                    res.render('register', {error: 'Username already exists!'});
                }
            }).catch((err) => {
                res.render('register', {error: err});
            });
        }
    }
})

// Here admin can see all gladiators
app.get('/admin', isAdmin, (req,res) => {
    db.readTable('gladiators_table').then((rows) => {
        res.render('admin/', { gladiators: rows });
    });
})

// Gladiator Handler
app.post('/gladiators/delete/:id', isAdmin, (req,res) => {
    db.deleteGladiatorByID(req.params.id).then(() => {
        res.redirect('/admin');
    });
})

app.get('/gladiators/update/:id', isAdmin, (req,res) => {
    db.getGladiatorByID(req.params.id).then((rows) => {
        res.render('admin/update_gladiator', { gladiator: rows[0] });
    });
})

app.post('/gladiators/update/:id', isAdmin, (req,res) => {
    db.updateGladiator(req.params.id, req.body.name, req.body.age, req.body.experience, req.body.password, req.body.gladiator_type).then(() => {
        res.redirect('/admin');
    });
});

app.get('/gladiators/create', isAdmin, (req,res) => {
    res.render('admin/create_gladiator');
})

app.post('/gladiators/create', isAdmin,
body('name').trim().isLength({min:3, max:15}).escape().withMessage('Username should be between 3 and 15 symbols!'),
body('password').trim().isLength({min:8}).matches('[0-9]').matches('[A-Z]').matches('[a-z]').escape().withMessage('Password should be at least 8 symbols long and contain at least one digit, one lowercase and one uppercase symbol!'),
body('age').trim().escape(),
body('experience').trim().escape(),
body('gladiator_type').trim().escape(),
(req,res) => {
    db.addGladiator(req.body.name, req.body.age, req.body.experience, req.body.password, req.body.gladiator_type).then(() => {
        res.redirect('/admin');
    });
})

// Fight Handler
app.get('/admin/fights', isAdmin, (req,res) => {
    db.readTable('fights_table').then((rows) => {
        res.render('admin/fights', { fights: rows });
    });
})

app.post('/fights/delete/:id1/:id2', isAdmin, (req,res) => {
    db.deleteFightByID(req.params.id1, req.params.id2).then(() => {
        res.redirect('/admin/fights');
    });
})

app.get('/fights/update/:id1/:id2', isAdmin, (req,res) => {
    db.getFightByID(req.params.id1, req.params.id2).then((rows) => {
        res.render('admin/update_fight', { fight: rows[0] });
    });
})

app.post('/fights/update/:id1/:id2', isAdmin,
body('fight_date').trim().escape(),
body('arena').trim().escape(),
(req,res) => {
    db.updateFight(req.params.id1, req.params.id2, req.body.fight_date, req.body.arena).then(() => {
        res.redirect('/admin/fights');
    });
});

app.get('/fights/create', isAdmin, (req,res) => {
    res.render('admin/create_fight');
})

app.post('/fights/create', isAdmin, 
body('id_gladiator1').trim().escape(),
body('id_gladiator2').trim().escape(),
body('fight_date').trim().escape(),
body('arena').trim().escape(),
(req,res) => {
    db.addFight(req.body.id_gladiator1, req.body.id_gladiator2, req.body.fight_date, req.body.arena).then(() => {
        res.redirect('/admin/fights');
    });
})

// 404
app.use((req,res) => {
    res.status(404).render('404');
})

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`running server! on http://localhost:${port}`);