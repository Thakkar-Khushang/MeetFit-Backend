const express = require('express');
const {addCenter, getAllCenters,  deleteCenter} = require('../controllers/centerController');
const router = express.Router();

router.post('/center', addCenter);
router.get('/centers',getAllCenters);
router.delete('/center/:id',deleteCenter);

module.exports = router;
