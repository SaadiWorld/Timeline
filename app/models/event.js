'use strict';

let mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

// Timeline Schema
var eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    post_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

eventSchema.plugin(mongoosePaginate);

let Event = module.exports = mongoose.model('Event', eventSchema);
