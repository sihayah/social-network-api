const res = require('express/lib/response');
const Thoughts = require('../models/Thoughts');

const thoughtControllers = {
    getAllThoughts(req, res) {
        Thoughts.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err))
    },
    getThought({ params }, res) {
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
    }
}

module.exports = thoughtControllers;