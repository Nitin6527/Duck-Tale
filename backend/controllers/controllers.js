const Student = require('../model/studentModel');

exports.postHome = (req, res, next) => {
    console.log(req.body)
    var newStudent = Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        className: req.body.className,
        subject: req.body.subject,
        marks: req.body.marks
    })
    newStudent.save()
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            res.json(err);
        })
}

exports.getData = (req, res, next) => {
    Student.find({}, (err, found) => {
        if (found) {
            return res.json(found);
        }
        return res.json(err)
    })

}

exports.deleteData = (req, res, next) => {
    console.log("delete")
    console.log(req.params.id)
    Student.find({}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            console.log("data====>>>>", data[req.params.id])
            Student.findByIdAndRemove(data[req.params.id]._id, (err, found) => {
                if (!err) {
                    return res.json(found)
                }
                return res.send(err)
            })
        }
    })

}