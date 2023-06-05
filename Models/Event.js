const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    interest: {
        type: String,
        required: true,
    },

    imageUrl: [{
        type: String,
        required: false,
    }],
    
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
