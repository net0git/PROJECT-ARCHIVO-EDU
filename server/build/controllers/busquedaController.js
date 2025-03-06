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
const database_1 = require("../database/database"); // Traemos los pools de conexión
class BusquedaController {
    buscarExpediente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codigoExpediente } = req.params; // Obtenemos el código de expediente desde los parámetros de la URL
            if (!codigoExpediente) {
                return res.status(400).json({ error: 'Falta el parámetro codigoExpediente' });
            }
            // Listamos todas las bases de datos disponibles en el objeto pools
            const basesDeDatos = Object.keys(database_1.pools);
            let expedienteEncontrado = null;
            console.log(basesDeDatos);
            try {
                // Recorremos cada base de datos para buscar el expediente
                for (let i = 1; i < basesDeDatos.length; i++) { // Comenzamos en el índice 1 (omitiendo el primer elemento)
                    const base = basesDeDatos[i]; // Accedemos al nombre de la base de datos
                    const pool = database_1.pools[base]; // Obtenemos el pool de conexión
                    const consulta = `
                    SELECT *, current_database() AS base_de_datos 
                    FROM t_archivo 
                    WHERE codg_expediente = $1;
                `;
                    // Realizamos la consulta en la base de datos seleccionada
                    const result = yield pool.query(consulta, [codigoExpediente]);
                    // Si encontramos el expediente, lo almacenamos y terminamos la búsqueda
                    if (result.rows.length > 0) {
                        expedienteEncontrado = result.rows[0];
                        break; // Salimos del bucle al encontrar el expediente
                    }
                }
                // Si no encontramos el expediente en ninguna base de datos, respondemos con un mensaje
                if (expedienteEncontrado) {
                    res.json(expedienteEncontrado); // Retornamos el expediente encontrado
                }
                else {
                    res.status(404).json({ error: 'Expediente no encontrado en ninguna base de datos' });
                }
            }
            catch (error) {
                console.error('Error al buscar expediente:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const busquedaController = new BusquedaController();
exports.default = busquedaController;
