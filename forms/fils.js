const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Shu@9799',
    database: 'online_library'
});

app.use(express.static('public'));
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

const query = 'SELECT COUNT(*) as book_count FROM books';
connection.query(query, (error, results, fields) => {
    if (error) throw error;
    const bookCount = results[0].book_count;
    bookCountElement = `You have ${bookCount} books in your database.`;
});


app.listen(5555, () => {
    console.log('Server started on port 5555');
});

