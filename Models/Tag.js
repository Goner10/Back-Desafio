const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profesional:{
    type:Boolean,
    default:false
  },
  course:{
    type:String,
    required:false
  }
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;