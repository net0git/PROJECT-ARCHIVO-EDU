import { Injectable } from '@angular/core';
import { UsuarioModel } from '../../../domain/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {


  private usuario: UsuarioModel = {
    id_usuario: 0,
    usuario: '',
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    dni: '',
    estado: true,
    perfil: '',
    archivo_sede: ''
  };

  constructor() { }

  get credenciales(): UsuarioModel {
    return this.usuario;
  }

  set credenciales(value: UsuarioModel) {
    this.usuario = value;
  }

  clear(): void {
    this.usuario = {
      id_usuario: 0,
      usuario: '',
      nombre: '',
      ap_paterno: '',
      ap_materno: '',
      dni: '',
      estado: null,
      perfil: '',
      archivo_sede: null
    };
  }

  // Método para verificar si el usuario es EDITOR
  isAdministrador(): boolean {
    return this.usuario.perfil === 'ADMINISTRADOR';
  }

  isPersonal(): boolean {
    return this.usuario.perfil === 'PERSONAL';
  }



}