"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const busquedaController_1 = __importDefault(require("../controllers/busquedaController"));
class BusquedaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/api/expediente/buscar-codigo/:codigoExpediente', busquedaController_1.default.buscarExpedienteCodigo);
        this.router.get('/api/expediente/buscar-nro-anio/:numero/:anio', busquedaController_1.default.buscarPorNumeroYAnio);
        this.router.get('/api/expediente/buscar-nombre-parte/:nombre_parte', busquedaController_1.default.buscarNombreParte);
    }
}
const busquedaRoutes = new BusquedaRoutes;
exports.default = busquedaRoutes.router;
