'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database('exams.sqlite', (err) => {
    if (err) throw err;
});

exports.listCourses = function() {
    return new Promise((resolve, reject) => {
        const sql = 'select * from course';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const courses = rows.map((row) => ({
                code: row.code,
                name: row.name,
                CFU: row.CFU
            }));
            resolve(courses);
        });
    });
};

exports.getCourseByCode = function(code) {
    return new Promise((resolve, reject) => {
        const sql = 'select * from course where Code = ?';
        db.get(sql, [code], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({});
            } else {
                const course = {code: row.code, name: row.name, CFU: row.CFU};
                resolve(course);
            }
        });
    });
};

exports.listExams = function() {
    return new Promise((resolve, reject) => {
        const sql = 'select course_code, score, date, name ' +
        'from exam, course where course_code = code';

        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            const exams = rows.map((e) => (
                {
                    coursecode: e.course_code,
                    score: e.score,
                    date: e.date,
                    coursename: e.name,
                }
            ));
            resolve(exams);
        });
    });
};

exports.createExam = function(exam) {
    return new Promise((resolve, reject) => {
        const sql = 'insert into exam(course_code, date, score) values(?, DATE(?), ?)';
        db.run(sql, [exam.coursecode, exam.date, exam.score], function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};
