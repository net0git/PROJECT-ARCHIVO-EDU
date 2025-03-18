import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/remoto/login/login.service';
import { CredencialesService } from '../../services/local/credenciales.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../../domain/models/usuario.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  credenciales: UsuarioModel = {
    id_usuario: 0,
    usuario: '',
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    dni: '',
    estado: false,
    perfil: '',
    archivo_sede: '',
  };

  isAdministrador: boolean = false;

  constructor(private router: Router, private loginService: LoginService, private credencialesService: CredencialesService) {
    this.credenciales = this.credencialesService.credenciales

  }

  ngOnInit(): void {
    if (this.credencialesService.isAdministrador()) {
      this.isAdministrador = true;
    }
  }


  confirmarSalida() {
    Swal.fire({
      title: '¿Desea salir del sistema?',
      text: 'Se cerrará la sesión actual.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Realiza la acción para salir del sistema, redirección y cierre de sesión
        console.log('Saliendo del sistema...');
        this.loginService.logout();
        this.router.navigate(['/login'])

      }
    });
  }

}
