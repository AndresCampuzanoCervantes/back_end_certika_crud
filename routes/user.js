const {Router} = require('express')
const { check } = require('express-validator')

const userController= require('../controllers/user.controller')
const { validarCampos } = require('../middlewares/validar-campos')


const router = Router()

router.post('/createUser',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('lastName','El apellido es obligatorio').not().isEmpty(),
    check('email','Ingrese un email válido').isEmail(),
    check('password','La Contraseña tiene que tener almenos 6 caracteres').isLength({min:6}),
    validarCampos
],userController.createUser)

router.post('/login',[
    check('email','Ingrese un email válido').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],userController.login)

module.exports = router;
