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
        this.router.get('/api/expediente/buscar/:codigoExpediente', busquedaController_1.default.buscarExpediente);
    }
}
const busquedaRoutes = new BusquedaRoutes;
exports.default = busquedaRoutes.router;
