const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;
const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profesional:{
    type:Boolean,
    default:false
  },
  
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;