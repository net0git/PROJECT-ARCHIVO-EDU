import { Component, HostListener, Renderer2 } from '@angular/core';
import { LoginRequest } from '../../../domain/dto/LoginRequest.dto';
import { firstValueFrom } from 'rxjs';
import { LoginService } from '../../services/remoto/login/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials: LoginRequest = {
    usuario: '',
    password: ''
  };

  constructor(private renderer: Renderer2, private loginService: LoginService, private router: Router) {}
  

  @HostListener('blur', ['$event'])
  onInputBlur(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      this.renderer.addClass(input, 'used');
    } else {
      this.renderer.removeClass(input, 'used');
    }
  }

  @HostListener('click', ['$event'])
  onRippleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('ripples')) {
      const parentOffset = target.getBoundingClientRect();
      const x = event.clientX - parentOffset.left;
      const y = event.clientY - parentOffset.top;

      const circle = target.querySelector('.ripplesCircle') as HTMLElement;
      if (circle) {
        this.renderer.setStyle(circle, 'top', `${y}px`);
        this.renderer.setStyle(circle, 'left', `${x}px`);
        this.renderer.addClass(target, 'is-active');

        circle.addEventListener('animationend', () => {
          this.renderer.removeClass(target, 'is-active');
        }, { once: true });
      }
    }
  }
  async login() {
    try {
      // Convertimos el observable en una promesa con firstValueFrom
      const authResponse = await firstValueFrom(this.loginService.login(this.credentials));
      if (authResponse) {
        console.log('Se logueó correctamente: ' + this.loginService.isAuthenticatedUser());
        this.router.navigate(['principal']);
      } else {
        alert('Credenciales incorrectas');
        console.log('Estamos dentro del else de login');
      }
    } catch (error) {
      console.error(error);
      alert('Error al intentar autenticar');
    }
  }
}
