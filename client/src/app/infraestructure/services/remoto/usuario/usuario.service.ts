import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { CrearUsuarioResponse, EliminarUsuarioResponse, UsuarioResponse } from '../../../../domain/dto/Usuario.dto';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../../../../domain/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  api_url_usuario = `${environment.urlApi}/usuario`;

  constructor(private http:HttpClient) { }

        //  this.router.get('/api/usuario',usuarioController.listarUsuarios)
        //  this.router.get('/api/usuario/lista',usuarioController.listarUsuariosDetalle)
        //  this.router.get('/api/usuario/:id_usuario',usuarioController.ObtenerUsuario)
        //  this.router.get('/api/usuario/detalle/:nombre_usuario',usuarioController.ObtenerUsuarioPorNombre)
        //  this.router.post('/api/usuario/crear',usuarioController.CrearUsuario)
        //  this.router.post('/api/usuario/login',usuarioController.ValidarLogin)
        //  this.router.put('/api/usuario/modificar/datos/:id_usuario',usuarioController.ModificarUsuarioDatos)   
        //  this.router.put('/api/usuario/modificar/password/:id_usuario',usuarioController.ModificarUsuarioPassword) 

  listarUsuarios(): Observable<UsuarioResponse[]> {
    return this.http.get<UsuarioResponse[]>(`${this.api_url_usuario}/lista`)
  }

  obtenerUsuario(id_usuario:number):Observable<UsuarioResponse>{
    return this.http.get<UsuarioResponse>(`${this.api_url_usuario}/${id_usuario}`)
  }

  crearUsuario(cuerpo_usuario:UsuarioModel):Observable<CrearUsuarioResponse>{
    cuerpo_usuario.usuario=cuerpo_usuario.usuario.trim().toUpperCase()
    cuerpo_usuario.nombre=cuerpo_usuario.nombre.trim().toUpperCase()
    cuerpo_usuario.ap_paterno=cuerpo_usuario.ap_paterno.trim().toUpperCase()
    cuerpo_usuario.ap_materno=cuerpo_usuario.ap_materno.trim().toUpperCase()
    cuerpo_usuario.dni=cuerpo_usuario.dni.trim()
    return this.http.post<CrearUsuarioResponse>(`${this.api_url_usuario}/crear`, cuerpo_usuario);
  }

  eliminarUsuario(id_usuario:number):Observable<EliminarUsuarioResponse>{
    return this.http.delete<EliminarUsuarioResponse>(`${this.api_url_usuario}/eliminar/${id_usuario}`)
  }

  // modificarUsuario(usuario:UsuarioModel){
  //   return this.http.put<any>(this.api_url_usuario,usuario)
  // }

  // modificarUsuarioDatos(usuario:UsuarioModel){}
}
