import { Component } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  img: string = ''; 
  
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.img = file.name; // pega apenas o nome do arquivo
      console.log('Arquivo selecionado:', this.img);
    }
  }

  constructor(private registerService: BackendService) {}

  clickRegister(event: Event) {
    event.preventDefault();

    this.registerService
      .registerUser(this.username, this.email, this.password)
      .subscribe(
        (response) => {
          this.registerService.redirectionUser('chat');
        },
        (error) => {
          console.log('Error ao registrar sua conta: ', error);
        }
      );
  }
}
