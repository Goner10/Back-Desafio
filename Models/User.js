const mongoose = require('mongoose');
const { Schema } = mongoose;

// Crea un nuevo Schema para User
const UserSchema = new Schema({
  username: {
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
  language: { 
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  interests: [{
    type: String,
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  },
});

// Compila el Schema en un modelo y lo exporta
module.exports = mongoose.model('User', UserSchema);

