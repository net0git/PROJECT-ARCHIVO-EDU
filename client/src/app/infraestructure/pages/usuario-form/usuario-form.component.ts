import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from '../../../domain/models/usuario.model';
import { UsuarioService } from '../../services/remoto/usuario/usuario.service';
import { CrearUsuarioResponse, modificarPasswordResponse, UsuarioResponse } from '../../../domain/dto/Usuario.dto';
import { usuario_form_vf } from '../../validator/formUser.validator';
import { FormsModule } from '@angular/forms';
import { SoloNumerosDirective } from '../../directives/solo-numeros.directive';
import { SoloLetrasDirective } from '../../directives/solo-letras.directive';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  imports: [NavbarComponent, FormsModule, CommonModule, SoloNumerosDirective, SoloLetrasDirective],
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
    this.CargarPagina()
  }

  CargarPagina() {
    const params = this.activatedRoute.snapshot.params
    console.log(params['id_usuario'])
    if (params['id_usuario']) {
      this.ObtenerDatosUsuario(params['id_usuario'])
    }
  }

  formAction() {
    if (this.modificar_usuario) {
      this.modificarUsuario()
      if (this.dataUsuario.password && this.dataUsuario.password.trim() !== "") {
        this.ModificarPasswordUsuario(this.dataUsuario.password);
      }
    } else {
      this.crearUsuario()
    }
  }

  crearUsuario() {
    const erroresValidacion = usuario_form_vf(this.dataUsuario, this.modificar_usuario)
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje} \n`;
      });
      alert(errorMensaje);
      return;
    }

    this.usuarioService.crearUsuario(this.dataUsuario).subscribe({
      next: (response: CrearUsuarioResponse) => {
        console.log(response.text)
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
      },
      complete: () => {
        console.log('Proceso de crear usuario completado');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario creado correctamente",
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          this.router.navigate(['/principal/usuario'])
        }, 2000);
      }
    })
  }

  modificarUsuario() {
    const erroresValidacion = usuario_form_vf(this.dataUsuario, this.modificar_usuario)
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje} \n`;
      });
      alert(errorMensaje);
      return;
    }
    this.usuarioService.modificarUsuario(this.dataUsuario.id_usuario, this.dataUsuario).subscribe({
      next: (res: modificarPasswordResponse) => {
        console.log(res);
      },
      error: (error) => {
        console.error('Error al modificar usuario:', error);
      },
      complete: () => {
        console.log('Proceso de modificar usuario completado');
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "modificacion en proceso"
        });
      }
    })
  }

  ModificarPasswordUsuario(password: string) {
    this.usuarioService.modificarPassword(this.dataUsuario.id_usuario, password).subscribe({
      next: (res: modificarPasswordResponse) => {
        console.log(res);
      },
      error: (error) => {
        console.error('Error al modificar usuario:', error);
      },
      complete: () => {
        console.log('Proceso de modificar usuario completado');
      }
    })
  }

  ObtenerDatosUsuario(id_usuario: number) {
    this.usuarioService.obtenerUsuario(id_usuario).subscribe({
      next: (usuario: UsuarioResponse) => {
        this.dataUsuario = usuario;
        delete usuario.password
        this.dataUsuario = usuario;
        this.modificar_usuario = true;
        this.titulo = 'Modificar Usuario';
        this.boton_text = 'Modificar';
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
