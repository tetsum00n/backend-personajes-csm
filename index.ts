import Server from "./classes/server";
import defaultRoutes from "./routes/default.routes";
import mongoose from "mongoose";
import personajeRoutes from "./routes/personaje.routes";
import bodyParser from "body-parser";

const server = new Server();

server.app.use(bodyParser.json());
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use('/',defaultRoutes);
server.app.use('/personaje',personajeRoutes);

mongoose.connect('mongodb://localhost:27017/personajesDb',(error)=>{
    if(error){
        throw error;
    }
    console.log("Base de datos online");
})

server.Start(()=>{
    console.log(`Servidor corriendo en el puerto:${server.port}`)
})