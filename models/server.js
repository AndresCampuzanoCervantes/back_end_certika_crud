const express = require('express')
const cors = require('cors');
const mysql = require('mysql');
const myconn = require('express-myconnection');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.pathApi='../routes/index'
        this.dbConnection ={
            host: process.env.HOST_DATABASE,
            port: process.env.PORT_DATABASE,
            user: process.env.USER_DATABASE,
            password: process.env.PASSWORD_DATABASE,
            database: process.env.SCHEMA_DATABASE
        }

        this.middlewares();
        this.routes()

        
    }

    middlewares(){
        this.app.use(myconn(mysql,this.dbConnection,'single'))
        this.app.use(cors())
        this.app.use(express.json({limit: '50mb'}))
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use('/api',require(this.pathApi))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }

}

module.exports = Server;