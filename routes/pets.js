const express = require('express');
const router = express.Router();

const { petsById, create, remove, list } = require('../controllers/pets');

const { petsValidator } = require('../validators/index')

router.post('/create', petsValidator, create)
router.delete('/:petsId', remove)
router.get('/', list)

router.param('petsId', petsById);
 
module.exports = router;