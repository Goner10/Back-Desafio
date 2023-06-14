const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;
const CanalDifSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    description: {
        type: String
    },
    events: [{
        type: ObjectId,
        ref: 'Event'
    }],
    participantes: [{
        type: ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: ObjectId,
        ref: 'User'
    },
    oficial: {
        type: Boolean,
        default: false
      }
});

const CanalDifusion = mongoose.model('CanalDifusion', CanalDifSchema);

module.exports = CanalDifusion;
