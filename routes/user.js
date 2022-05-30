const {Router} = require('express')
const { check } = require('express-validator')

const userController= require('../controllers/user.controller')
const { validarCampos } = require('../middlewares/validar-campos')


const router = Router()

//router.put('/updateUser/:id', userController.userPut)

router.post('/createUser',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','Ingrese un email válido').isEmail(),
    check('password','La Contraseña tiene que tener almenos 6 caracteres').isLength({min:6}),
    // check('rol','No es un rol válido').isIn(['COORDINATOR','MONITOR']),
    validarCampos
],userController.createUser)

router.post('/login',[
    check('email','Ingrese un email válido').isEmail(),
    check('password','La Contraseña tiene que tener almenos 6 caracteres').isLength({min:6}),
    // check('rol','No es un rol válido').isIn(['COORDINATOR','MONITOR']),
    validarCampos
],userController.login)

//router.delete('/', userController.userDelete)

module.exports = router;
