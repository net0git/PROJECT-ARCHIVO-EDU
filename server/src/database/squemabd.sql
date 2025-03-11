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
    nro_expediente VARCHAR(150) NOT NULL,
    codg_expediente BIGINT PRIMARY KEY,  -- Cambié SERIAL por BIGINT
    parte_demanda VARCHAR,
    parte_demandado VARCHAR,
    cod_anio_origen VARCHAR(4) NOT NULL,
    nro_folios NUMERIC NOT NULL,
    fecha_conclu DATE NOT NULL,
    estado VARCHAR(50) NOT NULL,
    codg_anaquel NUMERIC,
    codg_fila NUMERIC,
    codg_column NUMERIC,
    codg_paquet NUMERIC
);

-- agregarmos usuario ADMIN 123456


INSERT INTO public.t_usuario(
	 usuario, password,perfil, estado, archivo_sede, nombre, ap_paterno, ap_materno, dni)
	VALUES ('ADMIN', '$2a$10$kf9.Ik6AMJpssGabR61doekpX9gJDZUTZuQVhTVzTSwlvgP/5dt8a', 'ADMINISTRADOR', TRUE , 'CALLAO', 'EDUARDO', 'CARNDAS', 'LOAIZA', '89562341'); 



-- registro de datos en base de datos b1
INSERT INTO t_archivo (
    nro_expediente,
    codg_expediente,
    parte_demanda,
    parte_demandado,
    cod_anio_origen,
    nro_folios,
    fecha_conclu,
    estado,
    codg_anaquel,
    codg_fila,
    codg_column,
    codg_paquet
) VALUES
('07285-2019-0-3398-JR-PE-01', 012023004486, 'denan_1', 'denandado_1', '2019', 164, '2023-01-13', 'archivado', 57, 1, 1, 8),
('00588-2019-0-3394-JR-PE-03', 012023004487, 'denan_2', 'denandado_2', '2019', 82, '2023-03-28', 'archivado', 57, 1, 1, 8),
('04204-2018-6-3394-JR-PE-11', 012023004488, 'denan_3', 'denandado_3', '2018', 200, '2023-01-13', 'archivado', 57, 1, 1, 8),
('04204-2018-4-3394-JR-PE-11', 012023004489, 'denan_4', 'denandado_4', '2018', 400, '2023-01-13', 'archivado', 57, 1, 1, 8),
('02211-2019-1-3398-JR-PE-01', 012023004490, 'denan_5', 'denandado_5', '2019', 10, '2023-01-13', 'archivado', 57, 1, 1, 8),
('02211-2019-0-3398-JR-PE-01', 012023004491, 'denan_6', 'denandado_6', '2019', 193, '2023-01-13', 'archivado', 57, 1, 1, 8),
('02211-2019-2-3398-JR-PE-01', 012023004492, 'denan_7', 'denandado_7', '2019', 93, '2022-01-13', 'archivado', 57, 1, 1, 8),
('01818-2020-4-3398-JR-PE-01', 012023004493, 'denan_8', 'denandado_8', '2020', 31, '2023-01-14', 'archivado', 57, 1, 1, 8),
('01818-2020-2-3398-JR-PE-01', 012023004494, 'denan_9', 'denandado_9', '2020', 18, '2023-01-14', 'desarchivado', 57, 1, 1, 8),
('01818-2020-6-3398-JR-PE-01', 012023004495, 'denan_10', 'denandado_10', '2020', 73, '2022-05-19', 'desarchivado', 57, 1, 1, 8),
('01818-2020-5-3398-JR-PE-01', 012023004496, 'denan_11', 'denandado_11', '2020', 16, '2023-01-14', 'desarchivado', 57, 1, 1, 8),
('01818-2020-7-3398-JR-PE-01', 012023004497, 'denan_12', 'denandado_12', '2020', 31, '2023-01-14', 'desarchivado', 57, 1, 1, 8),
('03634-2014-0-3398-JR-CI-01', 012021003500, 'denan_13', 'denandado_13', '2014', 287, '2020-07-30', 'desarchivado', 56, 4, 1, 37),
('05459-2018-0-3398-JR-CI-01', 012021003501, 'denan_14', 'denandado_14', '2018', 17, '2020-09-22', 'desarchivado', 56, 4, 1, 37),
('05447-2018-0-3398-JR-CI-01', 012021003502, 'denan_15', 'denandado_15', '2018', 49, '2020-11-24', 'desarchivado', 56, 4, 1, 37),
('00782-2019-0-3398-JR-CI-01', 012021003503, 'denan_16', 'denandado_16', '2019', 26, '2020-09-22', 'desarchivado', 56, 4, 1, 37),
('04628-2019-0-3398-JR-CI-01', 012021003504, 'denan_17', 'denandado_17', '2019', 39, '2020-09-22', 'desarchivado', 56, 4, 1, 37),
('04283-2019-0-3398-JR-CI-01', 012021003505, 'denan_18', 'denandado_18', '2019', 35, '2020-09-22', 'desarchivado', 56, 4, 1, 37),
('01314-2018-0-3398-JR-CI-01', 012021003506, 'denan_19', 'denandado_19', '2018', 59, '2020-09-22', 'archivado', 56, 4, 1, 37),
('03059-2015-0-3398-JR-CI-01', 012021003507, 'denan_20', 'denandado_20', '2015', 114, '2020-09-22', 'archivado', 56, 4, 1, 37),
('04354-2019-0-3398-JR-CI-01', 012021003508, 'denan_21', 'denandado_21', '2019', 120, '2021-01-22', 'desarchivado', 56, 4, 1, 37),
('02479-2019-0-3398-JR-CI-01', 012021003509, 'denan_22', 'denandado_22', '2019', 16, '2020-09-22', 'desarchivado', 56, 4, 1, 37),
('01583-2019-0-3398-JR-CI-01', 012021003510, 'denan_23', 'denandado_23', '2019', 50, '2020-11-24', 'desarchivado', 56, 4, 1, 37),
('01823-2018-0-3398-JR-CI-01', 012021003511, 'denan_24', 'denandado_24', '2018', 37, '2020-09-22', 'desarchivado', 56, 4, 1, 37),
('05095-2018-0-3398-JR-CI-01', 012021003512, 'denan_25', 'denandado_25', '2018', 47, '2020-09-22', 'desarchivado', 56, 4, 1, 37),
('05693-2018-0-3398-JR-CI-01', 012021003513, 'denan_26', 'denandado_26', '2018', 30, '2021-03-04', 'desarchivado', 56, 4, 1, 37),
('01115-2019-0-3398-JR-CI-01', 012021003514, 'denan_27', 'denandado_27', '2019', 30, '2020-09-22', 'desarchivado', 56, 4, 1, 37),
('02019-2019-0-3398-JP-CI-02', 012021003515, 'denan_28', 'denandado_28', '2019', 36, '2020-09-22', 'desarchivado', 56, 4, 1, 37),
('03075-2019-0-3398-JR-CI-01', 012021003516, 'denan_29', 'denandado_29', '2019', 31, '2020-09-22', 'desarchivado', 56, 4, 1, 37),
('02955-2019-0-3398-JR-CI-01', 012021003517, 'denan_30', 'denandado_30', '2019', 55, '2020-09-22', 'desarchivado', 56, 4, 1, 37),
('05076-2017-0-3398-JR-CI-01', 012021003518, 'denan_31', 'denandado_31', '2017', 126, '2020-11-14', 'archivado', 56, 4, 1, 37),
('01111-2019-0-3398-JR-CI-01', 012021003519, 'denan_32', 'denandado_32', '2019', 36, '2020-09-22', 'archivado', 56, 4, 1, 37),
('00783-2019-0-3398-JR-CI-01', 012021003520, 'denan_33', 'denandado_33', '2019', 38, '2020-09-22', 'archivado', 56, 4, 1, 37),
('02286-2019-0-3398-JR-CI-01', 012021003521, 'denan_34', 'denandado_34', '2019', 108, '2020-11-02', 'archivado', 56, 4, 1, 37),
('01155-2016-0-3398-JR-CI-01', 012021003522, 'denan_35', 'denandado_35', '2016', 30, '2021-01-24', 'archivado', 56, 4, 1, 37),
('03631-2014-0-3398-JR-CI-01', 012021003523, 'denan_36', 'denandado_36', '2014', 29, '2021-01-24', 'archivado', 56, 4, 1, 37);


-- registro de datos en bd2
INSERT INTO t_archivo (
    nro_expediente, 
    codg_expediente, 
    parte_demanda, 
    parte_demandado, 
    cod_anio_origen, 
    nro_folios, fecha_conclu, estado, 
    codg_anaquel, 
    codg_fila, 
    codg_column, 
    codg_paquet) VALUES
('03203-2019-0-3398-JR-CI-01', 012021003460, 'denant_1', 'demando_1', '2019', 111, '2020-09-22 12:27:40', 'desarchivado', 56, 4, 1, 34),
('02590-2019-0-3398-JR-CI-01', 012021003461, 'denant_2', 'demando_2', '2019', 25, '2020-09-22 12:27:40', 'desarchivado', 56, 4, 1, 34),
('03269-2012-0-3398-JR-CI-01', 012021003462, 'denant_3', 'demando_3', '2012', 106, '2020-09-22 12:27:40', 'desarchivado', 56, 4, 1, 34),
('05347-2018-0-3398-JR-CI-01', 012021003463, 'denant_4', 'demando_4', '2018', 62, '2020-09-22 12:27:40', 'archivado', 56, 4, 1, 34),
('04940-2018-0-3398-JR-CI-01', 012021003464, 'denant_5', 'demando_5', '2018', 41, '2020-09-22 12:27:40', 'archivado', 56, 4, 1, 34),
('01397-2018-0-3398-JR-CI-01', 012021003465, 'denant_6', 'demando_6', '2018', 32, '2020-09-22 12:27:40', 'archivado', 56, 4, 1, 34),
('02059-2018-0-3398-JR-CI-01', 012021003466, 'denant_7', 'demando_7', '2018', 88, '2020-09-22 12:27:40', 'archivado', 56, 4, 1, 34),
('03894-2019-0-3398-JR-CI-01', 012021003467, 'denant_8', 'demando_8', '2019', 56, '2020-04-19 13:34:28', 'archivado', 56, 4, 1, 34),
('00455-2018-0-3398-JR-CI-01', 012021003468, 'denant_9', 'demando_9', '2018', 180, '2020-09-22 12:27:40', 'desarchivado', 56, 4, 1, 34),
('01251-2015-0-3398-JR-CI-01', 012021003469, 'denant_10', 'demando_10', '2015', 15, '2020-09-22 12:27:40', 'desarchivado', 56, 4, 1, 34),
('01789-2019-0-3398-JR-CI-01', 012021003470, 'denant_11', 'demando_11', '2019', 38, '2020-09-22 12:27:40', 'archivado', 56, 4, 1, 34),
('00913-2018-0-3398-JR-CI-01', 012021003471, 'denant_12', 'demando_12', '2018', 26, '2020-09-22 12:27:40', 'archivado', 56, 4, 1, 34),
('03249-2018-0-3398-JR-CI-01', 012021003472, 'denant_13', 'demando_13', '2018', 28, '2020-09-22 12:27:40', 'desarchivado', 56, 4, 1, 34),
('04931-2018-0-3398-JR-CI-01', 012021003473, 'denant_14', 'demando_14', '2018', 129, '2021-01-27 15:39:43', 'desarchivado', 56, 4, 1, 34),
('02128-2019-0-3398-JR-CI-01', 012021003474, 'denant_15', 'demando_15', '2019', 35, '2020-09-22 12:27:40', 'archivado', 56, 4, 1, 34),
('05284-2018-0-3398-JR-CI-01', 012021003475, 'denant_16', 'demando_16', '2018', 81, '2020-09-22 12:27:40', 'archivado', 56, 4, 1, 34),
('02630-2018-0-3398-JR-CI-01', 012021003476, 'denant_17', 'demando_17', '2018', 36, '2020-09-22 12:27:40', 'archivado', 56, 4, 1, 34),
('03756-2018-0-3398-JR-CI-01', 012021003477, 'denant_18', 'demando_18', '2018', 28, '2020-09-22 12:27:40', 'desarchivado', 56, 4, 1, 34),
('03343-2018-0-3398-JP-CI-02', 012021003478, 'denant_19', 'demando_19', '2018', 44, '2020-09-22 12:27:40', 'desarchivado', 56, 4, 1, 34),
('03017-2014-0-3398-JR-CI-01', 012021003479, 'denant_20', 'demando_20', '2014', 143, '2020-04-19 13:50:49', 'desarchivado', 56, 4, 1, 34),
('02781-2018-0-3398-JR-CI-01', 012021003407, 'denant_21', 'demando_21', '2018', 29, '2020-04-19 13:50:49', 'desarchivado', 56, 3, 1, 25),
('04985-2018-0-3398-JR-CI-01', 012021003408, 'denant_22', 'demando_22', '2018', 51, '2020-09-22 12:27:40', 'desarchivado', 56, 3, 1, 25),
('00527-2019-0-3398-JR-CI-01', 012021003409, 'denant_23', 'demando_23', '2019', 82, '2020-09-22 12:27:40', 'archivado', 56, 3, 1, 25),
('01911-2019-0-3398-JR-CI-01', 012021003410, 'denant_24', 'demando_24', '2019', 33, '2020-09-22 12:27:40', 'archivado', 56, 3, 1, 25),
('03521-2019-0-3398-JR-CI-01', 012021003411, 'denant_25', 'demando_25', '2019', 31, '2020-09-22 12:27:40', 'archivado', 56, 3, 1, 25),
('01736-2013-0-3398-JR-CI-01', 012021003412, 'denant_26', 'demando_26', '2013', 894, '2021-08-18 16:22:51', 'archivado', 56, 3, 1, 25);

-- registro de datos en bd3
INSERT INTO t_archivo (
    nro_expediente, 
    codg_expediente, 
    parte_demanda, 
    parte_demandado, 
    cod_anio_origen, 
    nro_folios, 
    fecha_conclu, 
    estado, 
    codg_anaquel, 
    codg_fila, 
    codg_column, 
    codg_paquet) VALUES
('01866-2019-0-3301-JR-PE-01', 022021000093, 'demant_1', 'demandado_1', '2019', 164, '2021-10-27 12:43:05.449', 'archivado', 54, 1, 1, 92),
('01866-2019-1-3301-JR-PE-01', 022021000094, 'demant_2', 'demandado_2', '2019', 113, '2021-07-15 17:32:37.484', 'archivado', 54, 1, 1, 92),
('00624-2020-0-3301-JR-PE-01', 022021000095, 'demant_3', 'demandado_3', '2020', 99, '2021-10-27 12:43:53.887', 'archivado', 54, 1, 1, 92),
('00624-2020-1-3301-JR-PE-01', 022021000096, 'demant_4', 'demandado_4', '2020', 86, '2021-10-27 12:44:32.934', 'desarchivado', 54, 1, 1, 92),
('00504-2020-2-3301-JR-PE-01', 022021000097, 'demant_5', 'demandado_5', '2020', 160, '2021-08-17 17:25:54.680', 'desarchivado', 54, 1, 1, 92),
('00504-2020-0-3301-JR-PE-01', 022021000098, 'demant_6', 'demandado_6', '2020', 209, '2021-10-27 12:47:51.038', 'desarchivado', 54, 1, 1, 92),
('02075-2019-0-3301-JR-PE-01', 022021000099, 'demant_7', 'demandado_7', '2019', 161, '2021-10-27 12:48:53.173', 'archivado', 54, 1, 1, 92),
('02075-2019-1-3301-JR-PE-01', 022021000100, 'demant_8', 'demandado_8', '2019', 63, '2020-07-13 20:30:30.781', 'archivado', 54, 1, 1, 92),
('01639-2022-1-3398-JR-PE-01', 022024001243, 'demant_9', 'demandado_9', '2022', 69, '2024-04-30 17:02:55.019', 'archivado', 56, 2, 1, 179),
('01639-2022-0-3398-JR-PE-01', 022024001244, 'demant_10', 'demandado_10', '2022', 26, '2024-04-30 17:02:08.422', 'archivado', 56, 2, 1, 179),
('00840-2021-2-3398-JR-PE-01', 022024001245, 'demant_11', 'demandado_11', '2021', 47, '2024-04-30 16:57:34.922', 'archivado', 56, 2, 1, 179),
('00840-2021-0-3398-JR-PE-01', 022024001246, 'demant_12', 'demandado_12', '2021', 77, '2024-04-30 16:51:42.642', 'archivado', 56, 2, 2, 179),
('00840-2021-1-3398-JR-PE-01', 022024001247, 'demant_13', 'demandado_13', '2021', 62, '2024-04-30 16:54:47.159', 'archivado', 56, 2, 2, 179),
('00840-2021-3-3398-JR-PE-01', 022024001248, 'demant_14', 'demandado_14', '2021', 83, '2024-04-30 16:58:29.241', 'archivado', 56, 2, 2, 179),
('00540-2022-1-3398-JR-PE-01', 022024001249, 'demant_15', 'demandado_15', '2022', 48, '2023-06-07 16:59:11.046', 'archivado', 56, 4, 2, 179),
('00540-2022-0-3398-JR-PE-01', 022024001250, 'demant_16', 'demandado_16', '2022', 37, '2024-05-02 09:24:19.626', 'archivado', 56, 4, 2, 179),
('00540-2022-2-3398-JR-PE-01', 022024001251, 'demant_17', 'demandado_17', '2022', 23, '2024-05-02 09:24:44.883', 'archivado', 56, 4, 2, 179),
('01164-2008-0-3301-JP-PE-02', 012019015538, 'demant_18', 'demandado_18', '2008', 6, '2014-11-10 14:57:58.779', 'archivado', 42, 3, 2, 149),
('01591-2008-0-3301-JP-PE-02', 012019015539, 'demant_19', 'demandado_19', '2008', 23, '2014-11-10 14:57:58.779', 'archivado', 42, 3, 2, 149),
('01478-2008-0-3301-JP-PE-02', 012019015540, 'demant_20', 'demandado_20', '2008', 8, '2014-11-10 14:57:58.779', 'archivado', 42, 3, 4, 149),
('01596-2008-0-3301-JP-PE-02', 012019015541, 'demant_21', 'demandado_21', '2008', 11, '2014-11-10 14:57:58.779', 'archivado', 42, 3, 4, 149),
('01597-2008-0-3301-JP-PE-02', 012019015542, 'demant_22', 'demandado_22', '2008', 8, '2014-11-10 14:57:58.779', 'desarchivado', 42, 3, 4, 149),
('01599-2008-0-3301-JP-PE-02', 012019015543, 'demant_23', 'demandado_23', '2008', 8, '2014-11-10 14:57:58.779', 'desarchivado', 42, 3, 4, 149),
('01600-2008-0-3301-JP-PE-02', 012019015544, 'demant_24', 'demandado_24', '2008', 8, '2014-11-10 14:57:58.779', 'desarchivado', 42, 3, 4, 149),
('01601-2008-0-3301-JP-PE-02', 012019015545, 'demant_25', 'demandado_25', '2008', 8, '2014-11-10 14:57:58.779', 'archivado', 42, 3, 4, 149),
('01548-2008-0-3301-JP-PE-02', 012019015546, 'demant_26', 'demandado_26', '2008', 7, '2014-11-10 14:57:58.779', 'archivado', 42, 3, 4, 149),
('01539-2008-0-3301-JP-PE-02', 012019015547, 'demant_27', 'demandado_27', '2008', 7, '2014-11-10 14:57:58.779', 'archivado', 42, 3, 4, 149),
('01537-2008-0-3301-JP-PE-02', 012019015548, 'demant_28', 'demandado_28', '2008', 8, '2014-11-10 14:57:58.779', 'archivado', 42, 3, 4, 149),
('01520-2008-0-3301-JP-PE-02', 012019015549, 'demant_29', 'demandado_29', '2008', 6, '2014-11-10 14:57:58.779', 'archivado', 42, 3, 4, 149),
('01503-2008-0-3301-JP-PE-02', 012019015550, 'demant_30', 'demandado_30', '2008', 6, '2014-11-10 14:57:58.779', 'archivado', 42, 3, 4, 149),
('00281-2010-0-3301-JP-PE-02', 012019015551, 'demant_31', 'demandado_31', '2010', 27, '2014-11-10 14:57:58.779', 'archivado', 42, 3, 4, 149),
('01215-2008-0-3301-JP-PE-02', 012019015552, 'demant_32', 'demandado_32', '2008', 6, '2014-11-10 14:57:58.779', 'archivado', 42, 3, 4, 149),
('01170-2008-0-3301-JP-PE-02', 012019015553, 'demant_33', 'demandado_33', '2008', 6, '2014-11-10 14:57:58.779', 'archivado', 42, 4, 4, 149),
('02144-2022-0-3301-JP-FC-01', 012022004607, 'demant_34', 'demandado_34', '2022', 24, '2022-09-19 15:15:46.250', 'desarchivado', 42, 4, 4, 170),
('01602-2019-0-3301-JP-FC-01', 012022004608, 'demant_35', 'demandado_35', '2019', 19, '2022-09-19 15:56:58.445', 'desarchivado', 42, 4, 4, 170),
('01876-2019-0-3301-JP-FC-01', 012022004609, 'demant_36', 'demandado_36', '2019', 54, '2022-09-19 15:57:12.017', 'desarchivado', 42, 4, 4, 170),
('01876-2019-1-3301-JP-FC-01', 012022004610, 'demant_37', 'demandado_37', '2019', 24, '2021-01-29 12:28:07.414', 'desarchivado', 42, 4, 4, 170),
('01690-2019-0-3301-JP-FC-01', 012022004611, 'demant_38', 'demandado_38', '2019', 46, '2022-09-19 15:12:43.010', 'archivado', 42, 4, 4, 170),
('03007-2021-0-3301-JP-FC-01', 012022004612, 'demant_39', 'demandado_39', '2021', 85, '2022-09-19 15:13:45.770', 'archivado', 42, 4, 4, 170),
('02892-2021-0-3301-JP-FC-01', 012022004613, 'demant_40', 'demandado_40', '2021', 47, '2022-09-19 15:13:32.369', 'archivado', 42, 4, 4, 170),
('02850-2021-0-3301-JP-FC-01', 012022004614, 'demant_41', 'demandado_41', '2021', 42, '2022-09-19 15:12:58.283', 'archivado', 42, 4, 4, 170);
