import {Document, model , Schema} from "mongoose";

const personajeSchema = new Schema({
    nombre:{
        type:String,
        require : [true,'El campo nombre es requerido']
    },
    nombreRomaji:{
        type:String
    },
    estado:{
        type:String
    },
    edad:{
        type:String
    },
    especie:{
        type:String
    },
    imagen:{
        type:String
    }
})

interface IPersonaje extends Document{
    nombre:string;
    nombreRomaji:string;
    estado:string;
    edad:string;
    especie:string;
    imagen:string;
}

export const Personaje = model<IPersonaje>('Personaje',personajeSchema);