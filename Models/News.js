const mongoose = require('mongoose');

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
        type: String,
        required:true
    }],
    oficial: {
        type: Boolean,
        default: false
      }
});

const News = mongoose.model('News', NewsSchema);

module.exports = News;
