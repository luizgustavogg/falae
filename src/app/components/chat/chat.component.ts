import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../../../services/backend.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  users: any[] = [];
  myName: string = '';
  chat: any = { messages: [] };
  myId: number = 0;
  message: string = '';
  searchTerm: string = '';

  private pollingSubscription?: Subscription;
  private currentReceiverId?: number;

  constructor(private homeChat: BackendService) {}

  ngOnInit(): void {
    this.homeChat.homeChat().subscribe(
      (response: any) => {
        this.users = response.users || [];
        this.myName = response.myName;
        this.myId = response.myId;
      },
      (error) => {
        console.error('Erro ao carregar dados do chat:', error);
        this.homeChat.redirectionUser('login');
      }
    );
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  get filteredUsers() {
    const term = this.searchTerm.toLowerCase();
    return this.users.filter((user) =>
      user.username.toLowerCase().includes(term)
    );
  }

  openChat(receiverId: number) {
    this.currentReceiverId = receiverId;

    // Para garantir que não fique múltiplos polling ativos
    this.stopPolling();

    this.loadChat(receiverId);

    // Começa polling a cada 3 segundos para atualizar mensagens
    this.pollingSubscription = interval(1000).subscribe(() => {
      if (this.currentReceiverId) {
        this.loadChat(this.currentReceiverId);
      }
    });
  }

  private loadChat(receiverId: number) {
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
        this.chat.messages.push(msg); // adiciona nova mensagem no array
        this.message = ''; // limpa input
      },
      (error) => {
        console.error('Erro ao enviar mensagem:', error);
      }
    );
  }

  private stopPolling() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
      this.pollingSubscription = undefined;
    }
  }
}
