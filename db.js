// src/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'hangman_user',
  host: 'localhost',
  database: 'hangman_db',
  password: 'mysecurepassword',
  port: 5432,
});

module.exports = pool;
