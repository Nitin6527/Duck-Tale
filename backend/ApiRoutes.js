const express = require('express');
const router = express.Router();
const appController = require('./controllers/controllers')

router.post('/', appController.postHome);
router.get('/', appController.getData);
router.delete('/delete/:id', appController.deleteData)

module.exports = router;