const res = require('express/lib/response');
const Thoughts = require('../models/Thoughts');
const User = require('../models/User');

const thoughtControllers = {
    getAllThoughts(req, res) {
        Thoughts.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err))
    },
    getThoughtById({ params }, res) {
        Thoughts.findOne({ id: params.thoughtId })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err))
    },
    createThought({ body }, res) {
        Thoughts.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err))
    },
    removeThought({ params }, res ) {
        Thoughts.findOneAndDelete({ _id: params.thoughtId }) 
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id found' });
                } 
                return User.findOneAndUpdate(
                    { _id: params.id },
                    { $pull: { thoughts: params.thoughtId }},
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    addReaction({ params, body }, res) {
        Thoughts.findOneByIdAndUpdate(
            { _id: params.thoughtId },
            { $push: { replies: body } },
            { new: true}
        )
            .then(dbReactionData => res.json(dbReactionData))
            .catch(err => res.status(400).json(err))
    },
    removeReaction({ params }, res) {
        Thoughts.findByIdAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId }}}
            )
            .then(dbReactionData => res.json(dbReactionData))
            .catch(err => res.status(400).json(err))
    }
}

module.exports = thoughtControllers;