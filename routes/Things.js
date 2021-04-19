const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const thingsController = require('../controllers/ThingsController');

router.get('/', auth, thingsController.getAllThings);
router.post('/', auth, thingsController.createThing);
router.get('/:id', auth, thingsController.getOneThing);
router.put('/:id', auth, thingsController.modifyThing);
router.delete('/:id', auth, thingsController.deleteThing);

module.exports = router;