const {Router} = require('express');
const pool = require('../db')
const { getAllCargo } = require('../controllers/controller')
const { getCargo } = require('../controllers/controller')
const { createCargo } = require('../controllers/controller')
const { deleteCargo } = require('../controllers/controller')
const { updateCargo } = require('../controllers/controller')

const router = Router();

router.get('/task', getAllCargo) 


router.get('/task/:id', getCargo)

router.post('/task/',  createCargo)

router.delete('/task/:id', deleteCargo)

router.put('/task/:id', updateCargo)



module.exports = router;