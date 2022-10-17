import Server from "./classes/server";
import defaultRoutes from "./routes/default.routes";
import mongoose from "mongoose";
import personajeRoutes from "./routes/personaje.routes";
import bodyParser from "body-parser";

const server = new Server();

server.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
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
