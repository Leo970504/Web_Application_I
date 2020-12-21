const express = require('express');
const morgan = require('morgan');
const {check, validationResult} = require('express-validator');
const dao = require('./dao.js');
const { fstat } = require('fs');

const app = express();
const port = 3000;

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('exams.sqlite', (err) => {
    if (err)
        console.error(err);
});

app.use(morgan('tiny'));

app.use(express.json());

app.use(express.static('client'));
app.get('/', (req, res) => res.redirect('client/index.html'));

const dbErrorObj = {
    errors: [
        {
            'param': 'Server',
            'msg': 'Database error'
        }
    ]
};

app.get('/courses', (req, res) => {
    const sql = 'select * from course';
    db.all(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.log(rows);
        const courses = rows.map((row) => ({
            code: row.code,
            name: row.name,
            CFU: row.CFU
        }));
        res.json(courses);
    });
});

app.get('/courses/:code', (req, res) => {
    const sql = 'select * from course where Code = ?';
    const code = req.params.code;
    db.get(sql, [code], (err, row) => {
        if (err) {
            throw err;
        }
        if (row) {
            res.json({code: row.code, name: row.name, CUF: row.CFU});
        } else {
            res.json({});
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});