const {Router} = require('express')
const { check } = require('express-validator')

const monitoringController= require('../controllers/monitoring.controller')
const { validarCampos } = require('../middlewares/validar-campos')


const router = Router()


router.get('/findAllMonitoring',monitoringController.findAllMonitoring)

router.post('/createMonitoring',[
    check('course','El curso es obligatorio').not().isEmpty(),
    check('idMonitor','El nombre es obligatorio').not().isEmpty(),
    check('date','La foto es obligatorio').not().isEmpty(),
    check('classroom','El programa es obligatorio').not().isEmpty(),
    validarCampos
],monitoringController.createMonitoring)

router.put('/editMonitoring/:id',[
    check('course','El curso es obligatorio').not().isEmpty(),
    check('idMonitor','El nombre es obligatorio').not().isEmpty(),
    check('date','La foto es obligatorio').not().isEmpty(),
    check('classroom','El aula de clase es obligatorio').not().isEmpty(),
    validarCampos
],monitoringController.editMonitoring)


router.delete('/deleteMonitoring/:id', monitoringController.deleteMonitoring)

router.post('/notifyMonitor/',[
    check('course','El curso es obligatorio').not().isEmpty(),
    check('idMonitor','El nombre es obligatorio').not().isEmpty(),
    check('date','La foto es obligatorio').not().isEmpty(),
    check('classroom','El programa es obligatorio').not().isEmpty(),
    check('message','El mensaje es obligatorio').not().isEmpty(),
    validarCampos
], monitoringController.notifyMonitor)

module.exports = router;
