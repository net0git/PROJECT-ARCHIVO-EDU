"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    //parametros de la base de datos a la que nos vamos a conectar 
    //en este caso a una base de datos de postgres
    databaseUserParameters: {
        user: 'edu',
        password: '123456',
        host: 'localhost', //172.16.226.4
        port: 5432,
        database: 'db_archivo_usuario'
    },
    database_callao_Parameters: {
        user: 'edu',
        password: '123456',
        host: 'localhost', //172.16.226.4
        port: 5432,
        database: 'db_archivo_callao'
    },
    database_LimaNorte_Parameters: {
        user: 'edu',
        password: '123456',
        host: 'localhost', //172.16.226.4
        port: 5432,
        database: 'db_archivo_lima_norte'
    },
    database_ventanilla_Parameters: {
        user: 'edu',
        password: '123456',
        host: 'localhost', //172.16.226.4
        port: 5432,
        database: 'db_archivo_ventanilla'
    }
};
