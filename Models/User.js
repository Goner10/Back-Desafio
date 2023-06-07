const mongoose = require('mongoose');
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

  course: {
    type: String,
    required: false,
  },
  startDate:{},//añadir por input
  endDate:{},//añadir por input
  localization:{},
  interests: [{
    type: String,
  }],

  role: { type: String, default: "user" },
  
  tokens: [],
  dateCreated: {
    type: Date,
    default: Date.now
  },

  gender:{
  type: String,
  required: false
}
});

// Compila el Schema en un modelo y lo exporta
module.exports = mongoose.model('User', UserSchema);

