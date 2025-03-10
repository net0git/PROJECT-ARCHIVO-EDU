import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { UsuarioResponse } from '../../../../domain/dto/Usuario.dto';
import { Observable } from 'rxjs';

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

  obtenerUsuario(id_usuario:number){
    return this.http.get<any>(`${this.api_url_usuario}/${id_usuario}`)
  }

  // crearUsuario(usuario:UsuarioModel){
  //   return this.http.post<any>(this.api_url_usuario,usuario)
  // }

  // modificarUsuario(usuario:UsuarioModel){
  //   return this.http.put<any>(this.api_url_usuario,usuario)
  // }

  // modificarUsuarioDatos(usuario:UsuarioModel){}
}
