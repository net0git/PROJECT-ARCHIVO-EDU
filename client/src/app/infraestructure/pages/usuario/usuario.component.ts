import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { UsuarioService } from '../../services/remoto/usuario/usuario.service';
import { EliminarUsuarioResponse, UsuarioResponse } from '../../../domain/dto/Usuario.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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

  eliminarUsuario(id_usuario:number){


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6", // Cambia el color de fondo
   
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });

        this.usuarioService.eliminarUsuario(id_usuario).subscribe({
          next:(res:EliminarUsuarioResponse)=>{
            console.log(res)
          },
          error:(err)=>{
            console.error(err)
          },
          complete:()=>{
            console.log('el usuairo se elimino correctamente')
            this.listarUsuarios();
          }
        })
      }
    });

    
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

  usuarioEdit(id_usuario:number){
    this.router.navigate(['/principal/usuario/form/editar/'+id_usuario]);
  }

  volver() {
    this.router.navigate(['/principal']);
  }

}
