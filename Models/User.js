const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Por favor ingrese un correo electrónico válido']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  languages: [{
    type: String,
    required: false,
  }],
  birth_date: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  course: {
    type: String,
  },
  situationLaboral: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user"
  },
  tokens: [],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  gender: {
    type: String,
    required: false
  },
  eventsConfi: [{
    type: ObjectId
  }],
  imageUrl: {
    type: String,
  },
  firstOnBoard: {
    type: Boolean,
    default: true
  },
  conocimientos: [{
    type: String,
  }],
  quieroAprender: [{
    type:  String,
  }],
  interests: [{
    type: String,
  }]
});

module.exports = mongoose.model('User', UserSchema);