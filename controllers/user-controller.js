const User = require('../models/User');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        // .populate({
        //     path: 'thoughts',
        //     select: '-__v',
        //     sort: ({ _id: -1 })
        // })
            // .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        // .populate({
        //     path: 'thoughts',
        //     select: '-__v'
        // })
        //     .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this id' });
                return;
            }
            res.json(dbUserData)})
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id' });
                    return;
                }
                res.json(dbUserData)
                .catch(err => res.status(400).json(err));
            })
    },
    removeUser({ params }, res) {
        User.findByIdAndRemove({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id'});
                    return;
                }
                res.json(dbUserData)
                .catch(err => res.status(400).json(err));
            })
    },
    addFriend({ params, body }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            {$push: { friends: body } },
            { new: true }
            )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },
    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;