export interface ExpedienteResponseList {
    nro_expediente: string;
    codg_expediente: string;
    parte_demanda: string;
    parte_demandado: string;
    cod_anio_origen: string;
    nro_folios: string;
    fecha_conclu: Date;  // Puedes usar Date si deseas manejarlo como objeto de fecha
    estado: string;
    codg_anaquel: string;
    codg_fila: string;
    codg_column: string;
    codg_paquet: string;
    base_de_datos: string;
}
