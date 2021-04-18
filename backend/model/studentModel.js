const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({

    firstName: { type: String },
    lastName: { type: String },
    className: { type: Number },
    subject: { type: String },
    marks: { type: String }


});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;