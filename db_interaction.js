const mysql = require('mysql2');
const bcrypt = require('bcrypt');

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
        this.connection.connect(err => {
            if (err)
                throw err;
            console.log('Connected to database');
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }

    // This is a helper function to make it easier to use transactions
    readTable(table, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(`select * from ${table}`, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    addGladiator(name, age, experience, password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    return reject(err);
                this.connection.query(`insert into gladiators_table (name, age, experience, hashed_password) values (?, ?, ?, ?)`, [name, age, experience, hash], (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(rows);
                });
            });
        });
    }

    addFight(id_gladiator1, id_gladiator2, fight_date, arena) {
        return new Promise((resolve, reject) => {
            this.connection.query(`insert into fights_table (id_gladiator1, id_gladiator2, fight_date, arena) values (?, ?, ?, ?)`, [id_gladiator1, id_gladiator2, fight_date, arena], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    updateGladiator(id_gladiator, name, age, experience, password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    return reject(err);
                this.connection.query(`update gladiators_table set name=?, age=?, experience=?, hashed_password=? where id_gladiator=?`, [name, age, experience, hash, id_gladiator], (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(rows);
                });
            });
        });
    }

    updateFight(id_fight, id_gladiator1, id_gladiator2, fight_date, arena) {
        return new Promise((resolve, reject) => {
            this.connection.query(`update fights_table set id_gladiator1=?, id_gladiator2=?, fight_date=?, arena=? where id_fight=?`, [id_gladiator1, id_gladiator2, fight_date, arena, id_fight], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    deleteGladiatorByID(id_gladiator) {
        return new Promise((resolve, reject) => {
            this.connection.query(`delete from gladiators_table where id_gladiator=?`, [id_gladiator], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    deleteFightByID(id_fight) {
        return new Promise((resolve, reject) => {
            this.connection.query(`delete from fights_table where id_fight=?`, [id_fight], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    getGladiatorByID(id_gladiator) {
        return new Promise((resolve, reject) => {
            this.connection.query(`select * from gladiators_table where id_gladiator=?`, [id_gladiator], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    getFightByID(id_fight) {
        return new Promise((resolve, reject) => {
            this.connection.query(`select * from fights_table where id_fight=?`, [id_fight], (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
}

module.exports = Database;