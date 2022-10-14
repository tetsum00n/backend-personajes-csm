"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personaje_model_1 = require("../models/personaje.model");
const personajeRoutes = (0, express_1.Router)();
personajeRoutes.get('/pages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let perPage = 3;
    let page = Number(req.query.page) || 1;
    let skip = page - 1;
    skip = skip * perPage;
    const personajes = yield personaje_model_1.Personaje.find().skip(skip).limit(perPage);
    return res.json({
        ok: true,
        personajes
    });
}));
personajeRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const personajes = yield personaje_model_1.Personaje.find();
    return res.json({
        ok: true,
        personajes
    });
}));
personajeRoutes.post('/', (req, res) => {
    const data = req.body;
    const personaje = {
        nombre: data.nombre,
        nombreRomaji: data.nombreRomaji,
        estado: data.estado,
        edad: data.edad,
        especie: data.especie,
        imagen: data.imagen
    };
    personaje_model_1.Personaje.create(personaje).then(personajeDb => {
        console.log(personajeDb);
        return res.json({
            ok: true,
            msj: "Registro creado correctamente",
            personajeDb
        });
    }).catch(err => {
        return res.json({
            ok: false,
            msj: "Ocurrio un error al crear el registro",
            err
        });
    });
});
personajeRoutes.put('/:id', (req, res) => {
    const personajeId = req.params.id;
    const personaje = {
        nombre: req.body.nombre,
        nombreRomaji: req.body.nombreRomaji,
        estado: req.body.estado,
        edad: req.body.edad,
        especie: req.body.especie,
        imagen: req.body.imagen
    };
    personaje_model_1.Personaje.findByIdAndUpdate(personajeId, personaje).then(personajeDb => {
        return res.json({
            ok: true,
            personajeDb
        });
    });
});
personajeRoutes.delete('/', (req, res) => {
    const personajeId = req.query.id;
    personaje_model_1.Personaje.findByIdAndDelete(personajeId).then(personajeDb => {
        return res.json({
            ok: true,
            personajeDb
        });
    });
});
exports.default = personajeRoutes;
