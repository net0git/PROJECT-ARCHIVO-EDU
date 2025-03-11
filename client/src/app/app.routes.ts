import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './infraestructure/pages/login/login.component';
import { PrincipalComponent } from './infraestructure/pages/principal/principal.component';
import { UsuarioComponent } from './infraestructure/pages/usuario/usuario.component';
import { UsuarioFormComponent } from './infraestructure/pages/usuario-form/usuario-form.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      { path: 'login', component: LoginComponent },
      { path: 'principal', component: PrincipalComponent },
      { path: 'principal/usuario', component: UsuarioComponent },
      { path: 'principal/usuario/form', component: UsuarioFormComponent },
      { path: 'principal/usuario/form/editar/:id_usuario', component: UsuarioFormComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }