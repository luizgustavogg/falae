import { Component } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent {

  errorMessage: string = '';

  email: string = '';
  password: string = '';

  constructor(private loginService: BackendService) {}

  clickLogin(event: Event) {
    event.preventDefault(); 

    this.loginService.loginUser(this.email, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token); 
        this.loginService.redirectionUser('/chat');
      },
      (error) => {
        this.errorMessage = error.error.message || 'Erro desconhecido';
        console.log('deu erro ai chefe: ', error);
      }
    );
    // console.log("Front end puxando: ", this.email, this.password);
  }
}
