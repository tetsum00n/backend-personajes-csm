import { Request, Response, Router } from 'express';
import { Personaje } from '../models/personaje.model';

const personajeRoutes = Router();

personajeRoutes.get('/pages', async (req:Request,res:Response)=>{

    let perPage = 3;
    let page = Number(req.query.page) || 1;
    let skip = page-1;
    skip = skip*perPage;
    const personajes = await Personaje.find().skip(skip).limit(perPage);

    return res.json({
        ok:true,
        personajes
    })
});

personajeRoutes.get('/',async (req:Request,res:Response)=>{

    const personajes = await Personaje.find();

    return res.json({
        ok:true,
        personajes
    })
});

personajeRoutes.post('/',(req:Request,res:Response)=>{

    const data = req.body;

    const personaje = {
        nombre : data.nombre,
        nombreRomaji : data.nombreRomaji,
        estado : data.estado,
        edad : data.edad,
        especie : data.especie,
        imagen: data.imagen
    }

    Personaje.create(personaje).then(personajeDb=>{
        console.log(personajeDb);
        return res.json({
            ok:true,
            msj:"Registro creado correctamente",
            personajeDb
            
        })
    }).catch(err=>{
        return res.json({
            ok:false,
            msj:"Ocurrio un error al crear el registro",
            err
        })
    })
    
});

personajeRoutes.put('/:id', (req:Request,res:Response)=>{
    
    const personajeId = req.params.id;
    const personaje = {
        nombre : req.body.nombre,
        nombreRomaji : req.body.nombreRomaji,
        estado : req.body.estado,
        edad : req.body.edad,
        especie : req.body.especie,
        imagen : req.body.imagen
    }

    Personaje.findByIdAndUpdate(personajeId,personaje).then(personajeDb=>{
        return res.json({
            ok:true,
            personajeDb
        })
    })
});

personajeRoutes.delete('/', (req:Request,res:Response)=>{

    const personajeId = req.query.id;
    Personaje.findByIdAndDelete(personajeId).then(personajeDb=>{
        return res.json({
            ok:true,
            personajeDb
        })
    });

   
});

export default personajeRoutes;