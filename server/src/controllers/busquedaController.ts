import { Request, Response } from 'express';
import { pools } from '../database/database'; // Traemos los pools de conexión

class BusquedaController {
    
    public async buscarExpediente(req: Request, res: Response): Promise<any> {
        const { codigoExpediente } = req.params; // Obtenemos el código de expediente desde los parámetros de la URL
        
        if (!codigoExpediente) {
            return res.status(400).json({ error: 'Falta el parámetro codigoExpediente' });
        }

        // Listamos todas las bases de datos disponibles en el objeto pools
        const basesDeDatos = Object.keys(pools); 
        let expedienteEncontrado = null;
        console.log(basesDeDatos)

        try {
            // Recorremos cada base de datos para buscar el expediente
            for (let i = 1; i < basesDeDatos.length; i++) {  // Comenzamos en el índice 1 (omitiendo el primer elemento)
                const base = basesDeDatos[i]; // Accedemos al nombre de la base de datos
                const pool = pools[base]; // Obtenemos el pool de conexión
          
                const consulta = `
                    SELECT *, current_database() AS base_de_datos 
                    FROM t_archivo 
                    WHERE codg_expediente = $1;
                `

                // Realizamos la consulta en la base de datos seleccionada
                const result = await pool.query(consulta, [codigoExpediente]);

                // Si encontramos el expediente, lo almacenamos y terminamos la búsqueda
                if (result.rows.length > 0) {
                    expedienteEncontrado = result.rows[0];
                    break; // Salimos del bucle al encontrar el expediente
                }
            }

            // Si no encontramos el expediente en ninguna base de datos, respondemos con un mensaje
            if (expedienteEncontrado) {
                res.json(expedienteEncontrado); // Retornamos el expediente encontrado
            } else {
                res.status(404).json({ error: 'Expediente no encontrado en ninguna base de datos' });
            }
        } catch (error) {
            console.error('Error al buscar expediente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

const busquedaController = new BusquedaController();
export default busquedaController;