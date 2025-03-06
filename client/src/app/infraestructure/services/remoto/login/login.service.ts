import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { CredencialesService } from '../../local/credenciales.service';
import { LoginRequest } from '../../../../domain/dto/LoginRequest.dto';
import { UsuarioLoginResponse } from '../../../../domain/dto/loginResponse.dto';
import { ErrorValidacion } from '../../../../../app/domain/dto/ErrorValidacion.dto';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isAuthenticated = false;
  // private url_api_login = 'http://localhost:4000/api/usuario/login';
   private url_api_login = `${environment.urlApi}/usuario/login`;

  constructor(
    private http: HttpClient,
    private credencialesService: CredencialesService
  ) {}

  validarLogin(credenciales: LoginRequest): ErrorValidacion[] {
    const errorValidacion: ErrorValidacion[] = [];
    if (!credenciales.usuario) {
      errorValidacion.push({ campo: 'usuario', mensaje: 'Campo requerido' });
    }
    if (!credenciales.password) {
      errorValidacion.push({ campo: 'password', mensaje: 'Campo requerido' });
    }
    return errorValidacion;
  }

  login(credenciales: LoginRequest): Observable<boolean> {
    const erroresValidacion = this.validarLogin(credenciales);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo :"${error.campo}": ${error.mensaje}`;
      });
      return throwError(() => errorMensaje);
    }
    credenciales.usuario=credenciales.usuario.toUpperCase();
    return this.http.post<UsuarioLoginResponse>(this.url_api_login, credenciales).pipe(
      map((response: UsuarioLoginResponse) => {
        if (response.success) {
          this.credencialesService.credenciales = {
            id_usuario: response.id_usuario,
            usuario: response.usuario,
            perfil: response.perfil,
            nombre: response.nombre,
            ap_paterno: response.ap_paterno,
            ap_materno: response.ap_materno,
            dni: response.dni,
            estado: response.estado,
            archivo_sede: response.archivo_sede
          };
          console.log(this.credencialesService.credenciales);
          this.isAuthenticated = true;
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Error al iniciar sesión:', error);
        return throwError(() => new Error('No se pudo iniciar sesión'));
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
    this.credencialesService.clear();
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
