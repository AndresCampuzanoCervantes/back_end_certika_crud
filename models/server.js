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
            host: "localhost",
            port: 3306,
            user: 'root',
            password: '123456789',
            database:'monitorias'
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