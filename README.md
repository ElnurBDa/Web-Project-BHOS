# Task Description
WEB PROJECT ---------------------------------------------------------------------
Create 'CRUD based app' (or 'security simulation app') by following requirements:
---------------------------------------------------------------------------------
- Web topic should be unique ; +
- Use front-end (template engine + css framework) ; +
- CRUD operations ; +
- Simple Authentification as user and admin ; +
- Some Application security measures : +
	- use validation and sanitization ; +
	- use sessions/cookies ; +
	- use environment variable ; +
	- secure connection to DB/tables (prevent sql injection, use hashing ...) +

# Task Solution Plan
- Topic: Gladiators Fight Management (GFM)
- Front-end: ejs + skeleton.css + custom css
	- index.ejs - overall info about project
	- login.ejs - user gets into account
	- register.ejs - user creates account
	- fights.ejs - user views fights schedule
	- 404.ejs - 404
	- admin/
		- index.ejs - admin dashboard, can see list of users to update and delete
		- fights.ejs - admin dashboard, can see list of fights to update and delete
		- create_fight.ejs
		- create_gladiator.ejs
		- update_fight.ejs
		- update_gladiator.ejs
- DB:
	- gladiators_table
		- id
		- name
		- age
		- experience
		- hashed password
		- type
	- fights_table
		- id_gladiator1
		- id_gladiator2
		- Date
		- Arena
- CRUD:
	1. Create 
		+ add gladiators into gladiators_table
		+ add fights into fights_table
	2. Read
		+ read gladiators_table
		+ read fights_table
		+ read gladiator by ID
		+ read fight by ID
	3. Update
		+ update gladiators at gladiators_table
		+ update fights at fights_table
	4. Delete
		+ remove gladiators from gladiators_table
		+ remove fights from fights_table
- Auth:
	- user: 
		- after auth he is added as gladiator
		- he can see other gladiators
		- he can se scheduled fights
	- admin: `Bear-Leader:qweads123!@#B`
		- adds
		- updates
		- removes
- Endpoints:
```
GET  / - anyone
GET  /fights - logged in gladiators
GET  /login - anyone
POST /login - anyone
GET  /profile - logged in gladiators
GET  /register - anyone
POST /register - anyone
GET  /admin - admin
POST /gladiators/delete/:id - admin
GET  /gladiators/update/:id - admin
POST /gladiators/update/:id - admin
GET  /gladiators/create - admin
POST /gladiators/create - admin
GET  /admin/fights - admin
POST /fights/delete/:id1/:id2 - admin
GET  /fights/update/:id1/:id2 - admin
POST /fights/update/:id1/:id2 - admin
GET  /fights/create - admin
POST /fights/create - admin
```

# Run
```bash
# mysql
source sample_values.sql;
source tables.sql
# bash/cmd
npm i
node app.js
# add .env file
PORT=8000
DB_HOST="localhost"
DB_USER=""
DB_PASS=""
DATABASE="gladiators_db"
SESSION_SECRET=""
```

# Notes
1) Admin: `Bear-Leader:qweads123!@#B`
2) This project is developed as project for Web Development Course in BHOS. Do not copy and full your teacher!!!