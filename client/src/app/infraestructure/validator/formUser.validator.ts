import { ErrorValidacion } from '../../domain/dto/ErrorValidacion.dto';
import { UsuarioModel } from '../../domain/models/usuario.model';

export function usuario_form_vf( dataUsuario: UsuarioModel, modificar: boolean): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];
    if (dataUsuario.dni.length>0){

        if ( dataUsuario.dni.length != 8) {
            errorValidacion.push({ campo: 'documento de identidad', mensaje: 'la cantidad en caracteres debe ser 8 para el tipo de documento DNI' });
          }  

    }
    else{
        errorValidacion.push({ campo: 'documento de identidad', mensaje: 'campo requerido' });
    }
    if (!dataUsuario.nombre) {
      errorValidacion.push({ campo: 'nombres', mensaje: 'Campo requerido' });
    }
    if (!dataUsuario.ap_paterno) {
      errorValidacion.push({ campo: 'ap_paterno', mensaje: 'Campo requerido' });
    }
    if (!dataUsuario.ap_materno) {
      errorValidacion.push({ campo: 'ap_materno', mensaje: 'Campo requerido' });
    }
    
    if (!dataUsuario.usuario) {
      errorValidacion.push({ campo: 'usuario', mensaje: 'Campo requerido' });
    }
    if (!dataUsuario.perfil) {
      errorValidacion.push({ campo: 'perfil', mensaje: 'Campo requerido' });
    }
    if(!dataUsuario.archivo_sede){
        errorValidacion.push({campo: 'sede', mensaje: 'Campo requerido'})
    }
    if (!modificar) {
      if (!dataUsuario.password) {
        errorValidacion.push({ campo: 'password', mensaje: 'Campo requerido' });
      }
    }
  
    return errorValidacion;
  }