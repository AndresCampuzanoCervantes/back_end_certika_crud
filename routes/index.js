    const express = require('express')
    const router = express.Router()

    router.use('/user',require('./user'))
    router.use('/monitor',require('./monitor'))
    router.use('/monitoring',require('./monitoring'))
    router.use( express.static('public') );
    module.exports = router;