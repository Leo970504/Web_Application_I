const express = require('express');
const morgan = require('morgan');
const {check, validationResult} = require('express-validator');
const dao = require('./dao.js');

const app = express();
const port = 3000;

app.use(morgan('tiny'));

app.use(express.json());

app.use(express.static('client'));
app.get('/', (req, res) => res.redirect('/index.html'));

const dbErrorObj = {
    errors: [
        {
            'param': 'Server',
            'msg': 'Database error'
        }
    ]
};

app.get('/courses', (req, res) => {
    dao.listCourses()
    .then((courses) => res.json(courses))
    .catch((err) => res.status(503).json(dbErrorObj));
});

app.get('/courses/:code', (req, res) => {
    dao.getCourseByCode(req.params.code)
    .then((course) => res.json(course))
    .catch((err) => res.status(503).json(dbErrorObj));
});

app.get('/exams', (req, res) => {
    dao.listExams()
    .then((exams) => res.json(exams))
    .catch((err) => res.status.json(dbErrorObj));
});

app.post('/exams', [
    check('score').isInt({min: 18, max:30}),
    check('coursecode').isLength({min: 7, max: 7}),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    dao.createExam({
        coursecode: req.body.coursecode,
        score: req.body.score,
        date: req.body.date
    }).then((result) => res.end())
    .catch((err) => res.status(503).json(dbErrorObj));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});