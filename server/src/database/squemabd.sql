-- base de datos de uruarios
CREATE TABLE t_usuario (
    id_usuario SERIAL PRIMARY KEY,
    usuario VARCHAR(12) NOT NULL,
    password VARCHAR(60) NOT NULL,
    perfil varchar(25) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    archivo_sede VARCHAR(50),
    nombre VARCHAR(50) NOT NULL,
    ap_paterno VARCHAR(50) NOT NULL,
    ap_materno VARCHAR(50) NOT NULL,
    dni VARCHAR(8) UNIQUE
);

-- NOMBRES DE BASES DE DATOS
-- BD USER : db_archivo_usuario
-- BD LIMA NORTE : db_archivo_lima_norte
-- BD CALLAO : db_archivo_callao
-- BD VENTANILLA : db_archivo_ventanilla

--  BD LIMA NORTE,  CALLAO, VENTANILLA
CREATE TABLE t_archivo (
    codigo SERIAL PRIMARY KEY,
    expediente VARCHAR(150) NOT NULL,
    tipo_expediente VARCHAR(50) NOT NULL,
    instancia VARCHAR(50) NOT NULL,
    materia VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(50) NOT NULL,
    A NUMERIC ,
    F NUMERIC ,
    C NUMERIC ,
    P NUMERIC ,
    estado VARCHAR(50) NOT NULL,
    fecha_movimiento DATE NOT NULL
);

-- agregarmos usuario ADMIN 123456

INSERT INTO public.t_usuario(
	 usuario, password, estado, archivo_sede, nombre, ap_paterno, ap_materno, dni)
	VALUES ('ADMIN', '$2a$10$kf9.Ik6AMJpssGabR61doekpX9gJDZUTZuQVhTVzTSwlvgP/5dt8a', TRUE , 'CALLAO', 'EDUARDO', 'CARNDAS', 'LOAIZA', '89562341'); 



