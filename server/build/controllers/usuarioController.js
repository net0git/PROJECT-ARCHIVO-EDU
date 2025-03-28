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
const encryptor_1 = require("../encrytor/encryptor");
const database_1 = require("../database/database");
class UsuarioController {
    CrearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario, password, estado, archivo_sede, nombre, ap_paterno, ap_materno, dni, perfil } = req.body;
                const passwordcifrado = yield (0, encryptor_1.encriptar)(password);
                const consulta = `
                    INSERT INTO public.t_usuario(
                        usuario, password, estado, archivo_sede, nombre, ap_paterno, ap_materno, dni, perfil)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
                `;
                const valores = [usuario, passwordcifrado, estado, archivo_sede, nombre, ap_paterno, ap_materno, dni, perfil];
                database_1.pools.user.query(consulta, valores, (error) => {
                    if (error) {
                        console.error(`Error al crear usuario ${usuario}:`, error);
                    }
                    else {
                        console.log(`usuario ${usuario} creado correctamente`);
                        res.json({ text: `El usuario se creó correctamente ${usuario}` });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al crear usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    listarUsuariosDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consulta = `
                    SELECT
                        *
                    FROM
                        t_usuario
                    ORDER BY t_usuario.estado, t_usuario.perfil ASC;
            `;
                const usuarios = yield database_1.pools.user.query(consulta);
                res.json(usuarios['rows']);
            }
            catch (error) {
                console.error('Error fatal al obtener detalle de usuarios:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_usuario } = req.params;
                const consulta = 'select * from t_usuario where id_usuario = $1';
                const usuario = yield database_1.pools.user.query(consulta, [id_usuario]);
                if (usuario && usuario['rows'].length > 0) {
                    res.json(usuario['rows'][0]);
                }
                else {
                    res.status(404).json({ text: 'El usuario no existe' });
                }
            }
            catch (error) {
                console.error('Error fatal al obtener usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ObtenerUsuarioPorNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre_usuario } = req.params;
                const consulta = 'select * from t_usuario where nombre_usuario = $1';
                const usuario = yield database_1.pools.user.query(consulta, [nombre_usuario]);
                if (usuario && usuario['rows'].length > 0) {
                    res.status(200).json(usuario['rows']);
                }
                else {
                    res.status(404).json({ text: 'El usuario no existe' });
                }
            }
            catch (error) {
                console.error('Error fatal al obtener usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ValidarLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validación de los datos de entrada
                const { usuario, password } = req.body;
                if (!usuario || !password) {
                    res.status(400).json({ error: 'Debe proporcionar nombre de usuario y contraseña.' });
                    return; // Asegúrate de retornar después de cada res.status()
                }
                // Verificar si el usuario existe
                const usuarioQuery = 'SELECT * FROM t_usuario WHERE usuario = $1';
                const usuarioResult = yield database_1.pools.user.query(usuarioQuery, [usuario]);
                if (usuarioResult.rows.length !== 1) {
                    res.status(404).json({ error: 'Usuario no encontrado.' });
                    return;
                }
                const usuarioRest = usuarioResult.rows[0];
                // Verificar estado del usuario
                if (!usuarioRest.estado) {
                    res.status(403).json({ error: 'El usuario no está activo.' });
                    return;
                }
                // Comparar contraseñas
                const esPasswordCorrecto = yield (0, encryptor_1.comparar)(password, usuarioRest.password);
                if (!esPasswordCorrecto) {
                    res.status(401).json({ error: 'Contraseña incorrecta.' });
                    return; // Agrega el return aquí para evitar continuar con el código
                }
                // Si todo está correcto, responder con datos del usuario
                res.json({
                    success: true,
                    id_usuario: usuarioRest.id_usuario,
                    usuario: usuarioRest.usuario,
                    nombre: usuarioRest.nombre,
                    perfil: usuarioRest.perfil,
                    ap_paterno: usuarioRest.ap_paterno,
                    ap_materno: usuarioRest.ap_materno,
                    dni: usuarioRest.dni,
                    estado: usuarioRest.estado,
                    archivo_sede: usuarioRest.archivo_sede
                });
            }
            catch (error) {
                console.error('Error fatal al validar el login:', error);
                res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });
    }
    ModificarDatosUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_usuario } = req.params;
                const { usuario, estado, nombre, ap_paterno, ap_materno, dni, perfil, archivo_sede } = req.body;
                const consulta = `
                UPDATE t_usuario 
                    SET usuario = $1, estado = $2, nombre = $3, ap_paterno = $4, ap_materno = $5, dni = $6, perfil = $7, archivo_sede = $8
                WHERE id_usuario=$9`;
                const valores = [usuario, estado, nombre, ap_paterno, ap_materno, dni, perfil, archivo_sede, id_usuario];
                database_1.pools.user.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al modificar usuario:', error);
                    }
                    else {
                        console.log('usuario modificado correctamente');
                        res.json({ text: 'El usurio se modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al modificar usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    ModificarUsuarioPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_usuario } = req.params;
                const { password } = req.body;
                const passwordcifrado = yield (0, encryptor_1.encriptar)(password);
                const consulta = `
                UPDATE t_usuario 
                    SET password= $1 
                WHERE id_usuario=$2
                `;
                const valores = [passwordcifrado, id_usuario];
                database_1.pools.user.query(consulta, valores, (error) => {
                    if (error) {
                        console.error('Error al modificar password usuario:', error);
                    }
                    else {
                        console.log('password modificado correctamente');
                        res.json({ text: 'El password del usuario modifico correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al modificar password de usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    EliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_usuario } = req.params;
                const consulta = `
                DELETE FROM public.t_usuario
                WHERE id_usuario=$1
                `;
                database_1.pools.user.query(consulta, [id_usuario], (error) => {
                    if (error) {
                        console.error('Error al eliminar usuario:', error);
                    }
                    else {
                        console.log('usuario eliminado correctamente');
                        res.json({ text: 'Usuario eliminado correctamente' });
                    }
                });
            }
            catch (error) {
                console.error('Error fatal al eliminar usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
const usuarioController = new UsuarioController();
exports.default = usuarioController;
