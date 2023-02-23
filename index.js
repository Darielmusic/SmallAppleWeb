const exp = require('express')
const cluster = require('cluster')
const cors = require('cors')
const numCpu = require('os').cpus().length;
require('dotenv').config();
if(cluster.isMaster){
    require("./lib/server")
    for(let i = 0; i < numCpu; i++){
        cluster.fork();
    }
}else{
    const app = exp();
    app.use(exp.json());
    app.use(cors());
    const routes = require('./routes/routes');
    app.use(routes);
    app.listen(3005, ()=>{
        console.log('Listening in port 3005');
    })
}