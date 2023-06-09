const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;
const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    tags:[{
        type:String,
    }],
    oficial: {
        type: Boolean,
        default: false
      }
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;