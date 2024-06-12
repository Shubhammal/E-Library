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
app.use(express.static('C:/Users/shubh/Desktop/library_management_project/library_management_project/forms'));
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});
app.post('/add-book', (req, res) => {
    const title = req.body('title');
    const author = req.body('author');
    const publisher_id = req.body('publisher_id');
    const publication_date = req.body('publication_date');
    const isbn = req.body('isbn');
    const description = req.body('description');
    const genre = req.body('genre');
    const total_copies = req.body('total_copies');
    const available_copies = req.body('available_copies');

    const query = `INSERT INTO books (title, author, publisher_id, publication_date, isbn, description, genre, total_copies, available_copies) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [title, author, publisher_id, publication_date, isbn, description, genre, total_copies, available_copies];

    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error inserting data into the database');
        } else {
            console.log('Successfully inserted data into the database');
            res.send('Book added successfully');
        }
    });
});

app.listen(5555, () => {
    console.log('Server started on port 5555');
});

