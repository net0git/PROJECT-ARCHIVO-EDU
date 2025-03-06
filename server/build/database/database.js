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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pools = void 0;
const pg_1 = require("pg"); // Importamos la librería de PostgreSQL
const key_1 = __importDefault(require("../database/key")); // Importamos los registros de conexión
// Definimos las configuraciones de conexión en un objeto
const dbConfigs = {
    user: key_1.default.databaseUserParameters,
    limaNorte: key_1.default.database_LimaNorte_Parameters,
    callao: key_1.default.database_callao_Parameters,
    ventanilla: key_1.default.database_ventanilla_Parameters
};
// Creamos los pools de conexión dinámicamente
const pools = Object.fromEntries(Object.entries(dbConfigs).map(([name, config]) => [name, new pg_1.Pool(config)]));
exports.pools = pools;
// Función para verificar la conexión de todas las bases de datos
const testConnections = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Promise.all(Object.entries(pools).map((_a) => __awaiter(void 0, [_a], void 0, function* ([name, pool]) {
            const client = yield pool.connect();
            console.log(`✅ Conexión exitosa a la base de datos: ${name}`);
            client.release(); // Liberamos el cliente de la conexión
        })));
    }
    catch (error) {
        console.error('❌ Error en la conexión a una de las bases de datos:', error);
    }
});
// Ejecutamos la prueba de conexión
testConnections();
