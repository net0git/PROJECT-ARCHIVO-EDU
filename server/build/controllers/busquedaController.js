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
    buscarExpedienteCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codigoExpediente } = req.params; // Obtenemos el código de expediente desde los parámetros de la URL
            if (!codigoExpediente) {
                return res.status(400).json({ error: 'Falta el parámetro codigoExpediente' });
            }
            // Listamos todas las bases de datos disponibles en el objeto pools
            const basesDeDatos = Object.keys(database_1.pools);
            let expedientesEncontrados = []; // Lista para almacenar los resultados encontrados
            console.log(basesDeDatos);
            try {
                // Recorremos cada base de datos para buscar el expediente
                for (let i = 1; i < basesDeDatos.length; i++) { // Comenzamos en el índice 1 (omitiendo el primer elemento)
                    const base = basesDeDatos[i]; // Accedemos al nombre de la base de datos
                    const pool = database_1.pools[base]; // Obtenemos el pool de conexión
                    const consulta = `
                    SELECT *, current_database() AS base_de_datos 
                    FROM t_expediente 
                    WHERE codg_expediente = $1;
                `;
                    // Realizamos la consulta en la base de datos seleccionada
                    const result = yield pool.query(consulta, [codigoExpediente]);
                    // Si encontramos expedientes, los añadimos a la lista
                    if (result.rows.length > 0) {
                        expedientesEncontrados = expedientesEncontrados.concat(result.rows);
                    }
                }
                // Si encontramos expedientes en alguna base de datos, los retornamos
                if (expedientesEncontrados.length > 0) {
                    res.json(expedientesEncontrados);
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
    buscarPorNumeroYAnio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numero, anio } = req.params; // Obtenemos el número y el año desde los parámetros de la URL
            const basesDeDatos = Object.keys(database_1.pools);
            let expedientesEncontrados = [];
            console.log(basesDeDatos);
            if (!numero || !anio) {
                return res.status(400).json({ error: 'Faltan los parámetros numero o anio' });
            }
            try {
                for (let i = 1; i < basesDeDatos.length; i++) {
                    const base = basesDeDatos[i];
                    const pool = database_1.pools[base];
                    const consulta = `
                    SELECT * , current_database() AS base_de_datos
                    FROM t_expediente 
                    WHERE ltrim(substring(nro_expediente from 1 for 5), '0') = $1
                    AND substring(nro_expediente from 7 for 4) = $2
                    ORDER BY nro_expediente ASC;
                `;
                    // Realizamos la consulta en la base de datos seleccionada
                    const result = yield pool.query(consulta, [numero, anio]);
                    // Si encontramos el expediente, lo almacenamos y terminamos la búsqueda
                    if (result.rows.length > 0) {
                        expedientesEncontrados = expedientesEncontrados.concat(result.rows);
                    }
                }
                // Si no encontramos el expediente en ninguna base de datos, respondemos con un mensaje
                if (expedientesEncontrados) {
                    res.json(expedientesEncontrados); // Retornamos el expediente encontrado
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
    buscarNombreParte(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre_parte } = req.params; // Obtenemos el nombre desde los parámetros de la URL
            if (!nombre_parte) {
                return res.status(400).json({ error: 'Falta el parámetro nombre parte' });
            }
            const basesDeDatos = Object.keys(database_1.pools); // Lista de bases de datos
            let expedientesEncontrados = [];
            try {
                for (let i = 1; i < basesDeDatos.length; i++) { // Recorremos todas las bases de datos
                    const base = basesDeDatos[i];
                    const pool = database_1.pools[base];
                    const consulta = `
                    SELECT * , current_database() AS base_de_datos
                    FROM t_expediente
                    WHERE parte_demanda ILIKE $1 
                    OR parte_demandado ILIKE $1;
                `;
                    // Agregamos los '%' en el código, no en la consulta directamente
                    const result = yield pool.query(consulta, [`%${nombre_parte}%`]);
                    if (result.rows.length > 0) {
                        expedientesEncontrados = expedientesEncontrados.concat(result.rows);
                    }
                }
                if (expedientesEncontrados) {
                    res.json(expedientesEncontrados);
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
