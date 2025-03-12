import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './infraestructure/pages/login/login.component';
import { PrincipalComponent } from './infraestructure/pages/principal/principal.component';
import { UsuarioComponent } from './infraestructure/pages/usuario/usuario.component';
import { UsuarioFormComponent } from './infraestructure/pages/usuario-form/usuario-form.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      { path: 'login', component: LoginComponent },
      { path: 'principal', component: PrincipalComponent , canActivate: [authGuard]},
      { path: 'principal/usuario', component: UsuarioComponent, canActivate: [authGuard] },
      { path: 'principal/usuario/form', component: UsuarioFormComponent, canActivate: [authGuard] },
      { path: 'principal/usuario/form/editar/:id_usuario', component: UsuarioFormComponent, canActivate: [authGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }