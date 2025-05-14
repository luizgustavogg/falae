import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  users = [
    { name: 'João', lastMessage: 'Oi, tudo bem?' },
    { name: 'Maria', lastMessage: 'Vamos marcar aquele café?' },
    { name: 'Pedro', lastMessage: 'Você viu o filme?' }
  ];

  constructor(private homeChat: BackendService) {}
}
