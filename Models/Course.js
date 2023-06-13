const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;
const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courseYear: {

        type: String
    },
    alumnos: [{
        type: ObjectId,
        ref: 'User'
    }],
});

const Course = mongoose.model('Course', TagSchema);

module.exports = Course;