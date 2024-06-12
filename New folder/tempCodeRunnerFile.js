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
app.use(express.static('public'));
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // query the database to check credentials
    connection.query('SELECT * FROM authentication_system WHERE username = ? AND password = ?', [username, password], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else if (results.length === 0) {
            res.status(401).send('Invalid Credentials');
        } else {
            res.send('Login Successful');
        }
    });
});

app.post('/ADDbook', (req, res) => {
    const title = req.body['title'];
    const author = req.body['author'];
    const publisher_id = req.body['publisher_id'];
    const publication_date = req.body['publication_date'];
    const isbn = req.body['isbn'];
    const description = req.body['description'];
    const genre = req.body['genre'];
    const total_copies = req.body['total_copies'];

    // Insert the user data into the database
    connection.query('INSERT INTO books (title, author, publisher_id, publication_date, isbn, description, genre,total_copies) VALUES (?, ?, ?, ?, ?, ?, ?,?)',
        [title, author, publisher_id, publication_date, isbn, description, genre, total_copies], (error, results) => {
            if (error) {
                throw error;
            }

            console.log('The BOOks is inserted');
            res.redirect('/');
        });
});


// start the server
app.listen(5555, () => {
    console.log('Server started on port 5555');
});
