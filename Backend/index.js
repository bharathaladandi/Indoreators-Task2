const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8080;


var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'node_db'
});





app.get('/getNotes', (req, res) => {
    db.query('node_db', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error while fetching notes');
        } else {
            res.status(200).json(result);
        }
    });
});


app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    const insertQuery = 'node_db';
    db.query(insertQuery, [title, content], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error while adding');
        } else {
            res.status(200).send('Note added successfully');
        }
    });
});

app.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const deleteQuery = node_db
    db.query(deleteQuery, [noteId], (err, result) => {
        if (err) {
            console.error('Error deleting note:', err);
            res.status(500).send('Error deleting note');
        } else {
            res.status(200).send('Note deleted successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
});
