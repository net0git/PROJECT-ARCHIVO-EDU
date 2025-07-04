import { ErrorValidacion } from '../../domain/dto/ErrorValidacion.dto';


export function busqueda_codigo_vf( codigo: string): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];
  
    if (!codigo) {
      errorValidacion.push({ campo: 'codigo', mensaje: 'Campo requerido' });
    }

    if(codigo.length!=11){
        errorValidacion.push({ campo: 'codigo', mensaje: 'El codigo debe tener 11 digitos' });
    }

    return errorValidacion;
  }

  export function busqueda_nro_anio_vf( numero: string, anio: string): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];
  
    if (!numero) {
      errorValidacion.push({ campo: 'numero', mensaje: 'Campo requerido' });
    }

    if(!anio){
        errorValidacion.push({ campo: 'año', mensaje: 'Campo requerido' });
    }else if (anio.length !== 4) {
        errorValidacion.push({ campo: 'año', mensaje: 'año incorrecto' })
      }

    return errorValidacion;
  }

  export function busqueda_nombre_parte_vf( nombre_parte: string): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];
  
    if (!nombre_parte) {
      errorValidacion.push({ campo: 'codigo', mensaje: 'Campo requerido' });
    }

    return errorValidacion;
  }