import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from '../../../domain/models/usuario.model';
import { UsuarioService } from '../../services/remoto/usuario/usuario.service';
import { CrearUsuarioResponse, UsuarioResponse } from '../../../domain/dto/Usuario.dto';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  imports: [NavbarComponent, FormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit {

  dataUsuario: UsuarioModel = {
    id_usuario: 0,
    usuario: '',
    password: '',
    perfil: '',
    estado: false,
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    dni: '',
    archivo_sede: '',
  };

  boton_text: string = 'Guardar';
  titulo: string = 'Crear usuario';
  modificar_usuario: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   }

   CargarPagina() {
    const params = this.activatedRoute.snapshot.params
    console.log(params['id_usuario'])
    if (params['id_usuario']) {
      this.ObtenerDatosUsuario(params['id_usuario'])
    }

  }

  mostrarUsuario(){
    console.log(this.dataUsuario)
  }

  crearUsuario(){
    this.mostrarUsuario()
    this.usuarioService.crearUsuario(this.dataUsuario).subscribe({
      next: (response: CrearUsuarioResponse) => {
        console.log(response.text) 
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
      },
      complete: () => {
        console.log('Proceso de crear usuario completado');
      }
    })
  }
  ObtenerDatosUsuario(id_usuario: number) {
    this.usuarioService.obtenerUsuario(id_usuario).subscribe({
      next: (usuario: UsuarioResponse) => {
        this.dataUsuario = usuario;
        delete usuario.password
        this.dataUsuario = usuario;
        this.modificar_usuario = true
        console.log('Usuario encontrado:', usuario);
      },
      error: (err) => {
        if (err.status === 404) {
          console.error('El usuario no existe:', err);
          alert('El usuario no existe.');
        } else if (err.status === 500) {
          console.error('Error interno del servidor:', err);
          alert('Error interno del servidor. verifique la consola.');
        } else {
          console.error('Error desconocido:', err);
          alert('Ocurrió un error inesperado. Verifique el servidor.');
        }
      },
      complete: () => {
        console.log('Proceso de recuperacion usuario completado');
       
      }

    })
  }

  volver() {
    this.router.navigate(['/principal/usuario']);
  }
}
