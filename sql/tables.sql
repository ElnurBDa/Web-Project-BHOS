CREATE DATABASE gladiators_db;
USE gladiators_db;

-- Creating gladiators_table
CREATE TABLE gladiators_table (
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(255) NOT NULL,
    age INT,
    experience INT,
    hashed_password VARCHAR(255) NOT NULL,
    gladiator_type VARCHAR(255) NOT NULL
);

-- Creating fights_table
CREATE TABLE fights_table (
    id_gladiator1 INT,
    id_gladiator2 INT,
    fight_date DATE,
    arena VARCHAR(255),
    FOREIGN KEY (id_gladiator1) REFERENCES gladiators_table(id) ON DELETE CASCADE,
    FOREIGN KEY (id_gladiator2) REFERENCES gladiators_table(id) ON DELETE CASCADE
);
