# Task Description
WEB PROJECT ---------------------------------------------------------------------
Create 'CRUD based app' (or 'security simulation app') by following requirements:
---------------------------------------------------------------------------------
- Web topic should be unique ;
- Use front-end (template engine + css framework) ;
- CRUD operations ;
- Simple Authentification as user and admin ;
- Some Application security measures :
	- use validation and sanitization ;
	- use sessions/cookies ;
	- use environment variable ;
	- secure connection to DB/tables (prevent sql injection, use hashing ...) 

# Task Solution Plan
- Topic: Gladiators Fight Management (GFM)
- Front-end: ejs + skeleton.css
	- index.ejs - overall info about project
	- login.ejs - user gets into account
	- register.ejs - user creates account
	- fights.ejs - user views fights schedule
	- admin.ejs - admin dashboard, can see list of users and fight and can delete them
		- create.ejs
		- update.ejs
- DB:
	- gladiators_table
		- id
		- name
		- age
		- experience
		- hashed password
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
	- admin:
		- adds
		- updates
		- removes