const {  deletes , login , create , addProduct } = require('../controllers/Admin');

const router = require('express').Router();

router.post('/login', login );
router.post('/create', create );
router.delete('/delete' , deletes );
router.post('/addProduct/:id', addProduct);

module.exports = router ;