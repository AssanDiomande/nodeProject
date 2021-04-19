const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');


router.post("/",messageController.sendMessage);
router.get("/",messageController.getAll);
router.get("/:id",messageController.getOne);
router.put("/:id",messageController.updateMessage);
router.delete("/:id",messageController.deleteMessage);

module.exports = router;