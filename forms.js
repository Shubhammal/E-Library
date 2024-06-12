const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Shu@9799',
    database: 'online_library'
});
app.use(express.static('C:/Users/shubh/Desktop/dbms/library_management_project/library_management_project'));
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});