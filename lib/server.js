const express = require("express");
// const morgan = require("morgan");

class Server{
    constructor(port){
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.static("./www"));
    
        this.app.listen(port, ()=>{
            console.log(`Listening on port: ${port}`);
        })
    }

}

module.exports = new Server(3003)