const {Router} = require('express')
const { check } = require('express-validator')

const monitorController= require('../controllers/monitor.controller')
const { validarCampos } = require('../middlewares/validar-campos')


const router = Router()


router.get('/findAllMonitores',monitorController.findAllMonitores)

router.post('/createMonitor',[
    check('identification','La identificación es obligatorio').not().isEmpty(),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('lastName','El apellido es obligatorio').not().isEmpty(),
    check('photo','La foto es obligatorio').not().isEmpty(),
    check('program','El programa es obligatorio').not().isEmpty(),
    check('semester','El semestre es obligatorio').not().isEmpty(),
    //check('phoneNumber','El numero de telefono es obligatorio').not().isEmpty(),
    check('email','Ingrese un email válido').isEmail(),
    validarCampos
],monitorController.createMonitor)

router.put('/editMonitor/:id',[
    check('identification','La identificación es obligatorio').not().isEmpty(),
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('lastName','El apellido es obligatorio').not().isEmpty(),
    check('photo','La foto es obligatorio').not().isEmpty(),
    check('program','El programa es obligatorio').not().isEmpty(),
    check('semester','El semestre es obligatorio').not().isEmpty(),
    //check('phoneNumber','El numero de telefono es obligatorio').not().isEmpty(),
    check('email','Ingrese un email válido').isEmail(),
    validarCampos
],monitorController.editMonitor)


router.delete('/deleteMonitor/:id', monitorController.deleteMonitor)

module.exports = router;
