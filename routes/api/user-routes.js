const router = require('express').Router();

const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    removeUser
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route(':userid')
    .get(getUser)
    .put(updateUser)
    .delete(removeUser);

module.exports = router;