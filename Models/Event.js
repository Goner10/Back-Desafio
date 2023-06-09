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
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    },
    startDate:{
        type:String,
        required:true,
      },//añadir por input
      endDate:{
        type:String,
        required:true,
      },//añadir por input
      localization:{
        type:String,
        required:false,
      },
    attendees: [{
        type: ObjectId,
        ref: 'User',
    }],
    imageUrl: {
        type: String,
        required: false,
    },
    tags:[
        {
            type: String
        }
    ],
    oficial: {
        type: Boolean,
        default: false
      }
    
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
