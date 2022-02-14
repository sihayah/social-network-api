const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    addReaction,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts);

router
    .route('/:id')
    .get(getThoughtById)
    .post(createThought);

router  
    .route('/:id/:thoughtId')
    .delete(removeThought)
    .put(addReaction)

router
    .route('/:id/:thoughtId/:reactionId')
    .put(removeReaction)


module.exports = router; 