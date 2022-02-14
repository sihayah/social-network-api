const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionsSchema = new Schema (
    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtValue => dateFormat(createdAtVal)
        }
    },
    {
        toJson: {
            getters: true
        }
    }
)

const ThoughtsSchema = new Schema (
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
        reactions: [ReactionsSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

ThoughtsSchema.virtual('reactionCount').get( function() {
    return this.reactions.length
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;