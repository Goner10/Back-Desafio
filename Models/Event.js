const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
        required: true,
    },
    createdBy:{
        type: ObjectId, ref: "User",
        required:true,
    },
    date: {
        type: Date,
        required: true,
    },

    attendees: [{
        type: ObjectId,
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
