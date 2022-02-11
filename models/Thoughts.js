const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtsSchema = (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        }, 
        reactions: [{ type: Schema.Types.ObjectId, ref: 'Reactions'}]
    }
);

ThoughtsSchema.virtual('reactionCount').get( function() {
    return this.reactions.length
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;