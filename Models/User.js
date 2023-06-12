const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const { Schema } = mongoose;


// Crea un nuevo Schema para User
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
    type: ObjectId,
    path: 'Course',
    required: false,
  },
  courseYear: {
    type: String
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
  //no se si habria que añadir algo rollo eventos donde ha confirmado asistencia
  gender: {
    type: String,
    required: false
  },
  eventsConfi: [{
    type: ObjectId
  }],
  imageUrl: {
    type: String
  },
  firstOnBoard: {
    type: Boolean,
    default: true
  },
  conocimientos: [{
    type: ObjectId,
    path: 'Tag'
  }],

  quieroAprender: [{
    type: ObjectId,
    path: 'Tag'
  }],
  interests: {
    type: String,
    path: 'Tag'
  }
});

// Compila el Schema en un modelo y lo exporta
module.exports = mongoose.model('User', UserSchema);

