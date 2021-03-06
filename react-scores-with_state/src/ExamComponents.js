import React from 'react';
import {iconAdd, iconDelete, iconEdit} from "./svgIcons";

class ExamTable extends React.Component {

    render() {
        return <table className='table ' style={{marginBottom: 0}}>
            <thead>
            <tr>
                <th className='col-6'>Exam</th>
                <th className='col-2'>Score</th>
                <th className='col-2'>Date</th>
                <th className='col-2'>Actions</th>
            </tr>
            </thead>
            <tbody>{
                this.props.exams.map((e) => <ExamRow key={e.coursecode}
                                                    exam={e}
                                                    examName={this.props.courseNames[e.coursecode]}
                                                    requireEditExam={this.props.requireEditExam}
                                                    deleteExam={this.props.deleteExam}
                                                    mode={this.props.mode}
                />)
                /* NOTE: exam={{...e, name: this.props.courseNames[e.coursecode]}} could be a quicker (and dirtier) way
                to add the .name property to the exam, instead of passing the examName prop */
            }
            </tbody>
            <caption style={{captionSide: 'top'}}>My exams...</caption>
        </table>
    }
}

function ExamRow(props) {
    return <tr>
        <ExamRowData exam={props.exam} examName={props.examName}/>
        <RowControls exam={props.exam} requireEditExam={props.requireEditExam}
                    deleteExam={props.deleteExam} mode={props.mode}/>
    </tr>
}

function ExamRowData(props) {
    return <>
        <td>{props.examName}</td>
        <td>{props.exam.score}</td>
        <td>{new Date(props.exam.date).toLocaleDateString()}</td>
    </>;
}

function RowControls(props) {
    return <td>
        {(props.mode === 'view') && <>
            <span onClick={() => props.requireEditExam(props.exam)}>{iconEdit}</span>
            <span onClick={() => props.deleteExam(props.exam)}>{iconDelete}</span>
        </>}
    </td>
}

function TableControls(props) {
    if (props.mode === 'view')
        return <div align={'right'}>
            <button type='button' className='btn btn-default btn-lg' style={{padding: 0}}
                    onClick={() => props.openExamForm()}>
                {iconAdd}
            </button>
        </div>
    else return null;
}

function ExamScores(props) {
    const courseNames = {};
    for (const c of props.courses)
        courseNames[c.coursecode] = c.name;
    return <>
        <ExamTable exams={props.exams} courseNames={courseNames}
                requireEditExam={props.requireEditExam}
                deleteExam={props.deleteExam}
                mode={props.mode}/>
        <TableControls mode={props.mode} openExamForm={props.openExamForm}/>
    </>;
}

function OptionalExamForm(props) {
    if (props.mode === 'view')
        return null;
    else {
        return <div className={'jumbotron'}>
            <ExamForm exam={props.exam} courses={props.courses}
                    mode={props.mode}
                    addOrEditExam={props.addOrEditExam}
                    cancelExam={props.cancelExam}/>
        </div>;
    }
}

class ExamForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.exam ? {...this.props.exam} : {coursecode: null, score: null, date: null};
    }

    /*
    updateCourse = (coursecode) => {
        this.setState({coursecode: coursecode});
    }

    updateScore = (score) => {
        this.setState({score: score});
    }

    updateDate = (date) => {
        this.setState({date: new Date(date)});
    }
    */

    updateField = (name, value) => {
        this.setState({[name]: value});
    }

    doInsertExam = (exam) => {
        if (this.form.checkValidity()) {
            this.props.addOrEditExam(exam);
        } else {
            this.form.reportValidity();
        }
    }

    doCancel = () => {
        this.props.cancelExam();
    }

    validateForm = (event) => {
        event.preventDefault();
    }

    render() {
        return <form className='' onSubmit={this.validateForm} ref={form => this.form = form}>
            <ExamFormData exam={{
                coursecode: this.state.coursecode || '',
                score: this.state.score || '',
                date: this.state.date || ''
            }}
            courses={this.props.courses}
            updateField={this.updateField}
            mode={this.props.mode}
            />
            {/* if you want to handle each field separately:
            updateCourse={this.updateCourse}
                        updateScore={this.updateScore}
                        updateDate={this.updateDate}*/}
            <ExamFormControls insert={() => this.doInsertExam(this.state)} cancel={this.doCancel}
                            mode={this.props.mode}/>
        </form>;
    }
}

function ExamFormData(props) {
    return <div className={'form-row'}>
        <div className={'form-group'}>
            <label htmlFor='selectCourse'>Course</label>
            <select id='selectCourse' className={'form-control'} required={true}
                    name='coursecode'
                    value={props.exam.coursecode}
                    disabled={props.mode === 'edit'}
                    onChange={(ev) => props.updateField(ev.target.name, ev.target.value)}>

                {props.courses.map((c) => <option key={c.coursecode}
                                                value={c.coursecode}>{c.name} ({c.coursecode})</option>)}
            </select></div>
        {/* ALTERNATIVE: onChange={(ev) => props.updateCourse(ev.target.value)}>*/}

        &nbsp;
        <div className={'form-group'}>
            <label htmlFor='inputScore'>Score</label>
            <input id='inputScore' className={'form-control'} type='number' min={18} max={31} required={true}
                name='score'
                value={props.exam.score}
                onChange={(ev) => props.updateField(ev.target.name, ev.target.value)}
            />
            {/*onChange={(ev) => props.updateScore(ev.target.value)}*/}
        </div>
        &nbsp;
        <div className={'form-group'}>
            <label htmlFor='inputDate'>Date</label>
            <input id='inputDate' className={'form-control'} required={true}
                type='date'
                name='date'
                value={props.exam.date}
                onChange={(ev) => props.updateField(ev.target.name, ev.target.value)}
            />
            {/*onChange={(ev) => props.updateDate(ev.target.value)}*/}

        </div>
    </div>
        ;
}

function ExamFormControls(props) {
    return <div className={'form-row'}>
        <button type="button" className="btn btn-primary"
                onClick={props.insert}>{props.mode === 'add' ? 'Insert' : 'Modify'}</button>
        &nbsp;
        <button type="button" className="btn btn-secondary" onClick={props.cancel}>Cancel</button>
    </div>;
}

export {ExamScores, OptionalExamForm};
