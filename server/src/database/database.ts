import { Pool, PoolConfig } from 'pg'; // Importamos la librería de PostgreSQL
import key from '../database/key'; // Importamos los registros de conexión

// Definimos las configuraciones de conexión en un objeto
const dbConfigs: Record<string, PoolConfig> = {
    user: key.databaseUserParameters,
    limaNorte: key.database_LimaNorte_Parameters,
    callao: key.database_callao_Parameters,
    ventanilla: key.database_ventanilla_Parameters
};

// Creamos los pools de conexión dinámicamente
const pools: Record<string, Pool> = Object.fromEntries(
    Object.entries(dbConfigs).map(([name, config]) => [name, new Pool(config)])
);

// Función para verificar la conexión de todas las bases de datos
const testConnections = async () => {
    try {
        await Promise.all(
            Object.entries(pools).map(async ([name, pool]) => {
                const client = await pool.connect();
                console.log(`✅ Conexión exitosa a la base de datos: ${name}`);
                client.release(); // Liberamos el cliente de la conexión
            })
        );
    } catch (error) {
        console.error('❌ Error en la conexión a una de las bases de datos:', error);
    }
};

// Ejecutamos la prueba de conexión
testConnections();

// Exportamos los pools para su uso en otras partes del proyecto
export { pools };