import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsuarioService } from '../../services/remoto/usuario/usuario.service';
import { UsuarioResponse } from '../../../domain/dto/Usuario.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  imports: [NavbarComponent, NgxPaginationModule, CommonModule, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

  p: number = 1;

  listaUsuarios: UsuarioResponse[] = []; listaUsuariosTemp: UsuarioResponse[] = [];

  constructor(private router: Router, private usuarioService: UsuarioService) { }


  ngOnInit(): void {
    this.listarUsuarios()
  }

  listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (data:UsuarioResponse[]) => {
        
        this.listaUsuarios=data;
        this.listaUsuariosTemp=data;
       
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completado');
      }
    })
  }

  buscarEnObjeto(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();
    let objetosFiltrados: any[] = [];
  
    objetosFiltrados = this.listaUsuariosTemp.filter(
      (objeto: UsuarioResponse) => {  // ✅ Usa `UsuarioResponse` directamente
        const nombre_usuario = objeto.usuario.toLowerCase();
        const perfil = objeto.perfil ? objeto.perfil.toLowerCase() : ''; // ✅ Evita error con `null`
        const estado = objeto.estado ? 'activo' : 'inactivo';
  
        // Si textoBusqueda es "activo" o "inactivo", solo buscar por estado
        if (textoBusqueda === 'activo' || textoBusqueda === 'inactivo') {
          return estado === textoBusqueda;
        }
  
        // En otros casos, buscar coincidencias generales
        return (
          nombre_usuario.includes(textoBusqueda) ||
          perfil.includes(textoBusqueda) || // ✅ Se asegura que `perfil` no sea null
          estado.includes(textoBusqueda)
        );
      }
    );
  
    this.listaUsuarios = objetosFiltrados;
  }
  
  usuarioForm(){
    this.router.navigate(['/principal/usuario/form']);
  }

  volver() {
    this.router.navigate(['/principal']);
  }

}
