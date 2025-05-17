import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  users: any[] = [];
  myName: String = '';
  chat: any = {};
  myId: number = 0;
  message: string = '';
  searchTerm: string = '';

  constructor(private homeChat: BackendService) {}

ngOnInit(): void {
  this.homeChat.homeChat().subscribe(
    (response: any) => {
      this.users = response.users || [];
      this.chat = response.chat || { messages: [] };
      this.myName = response.myName;
      this.myId = response.myId;
    },
    (error) => {
      console.error('Erro ao carregar dados do chat:', error);
      this.homeChat.redirectionUser('login');
    }
  );
}

  get filteredUsers() {
    const term = this.searchTerm.toLowerCase();
    return this.users.filter((user) =>
      user.username.toLowerCase().includes(term)
    );
  }

  openChat(receiverId: number) {
    this.homeChat.openChatWithUser(receiverId).subscribe(
      (res: any) => {
        this.chat = res.chat;
      },
      (err) => {
        console.error('Erro ao abrir conversa:', err);
      }
    );
  }

  sendMessage() {
    if (!this.message.trim()) return;

    this.homeChat.sendMessage(this.chat.id, this.message).subscribe(
      (msg: any) => {
        this.chat.messages.push(msg); // adiciona nova msg no array
        this.message = ''; // limpa input
      },
      (error) => {
        console.error('Erro ao enviar mensagem:', error);
      }
    );
  }
}
