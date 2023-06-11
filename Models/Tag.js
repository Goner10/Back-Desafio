const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  id: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    get: arr => arr.length > 0 ? arr[0] : null,
    set: id => [id]
  },
  name: {
    type: [String],
    default: []
  }
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
