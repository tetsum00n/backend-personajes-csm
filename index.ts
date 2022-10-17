import Server from "./classes/server";
import defaultRoutes from "./routes/default.routes";
import mongoose from "mongoose";
import personajeRoutes from "./routes/personaje.routes";
import bodyParser from "body-parser";

const server = new Server();

var express = require('express')
var cors = require('cors')
var app = express()

server.app.use(cors());
app.get('/products/:id', function (req: any, res: { json: (arg0: { msg: string; }) => void; }, next: any) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
   
  app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
  })
server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use('/',defaultRoutes);
server.app.use('/personaje',personajeRoutes);


mongoose.connect('mongodb+srv://csm_personajes:feliford19@cluster0.jd3zj3t.mongodb.net/personajeDb',(error)=>{
    if(error){
        throw error;
    }
    console.log("Base de datos online");
})

server.Start(()=>{
    console.log(`Servidor corriendo en el puerto:${server.port}`)
})
