import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core';
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
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  users: any[] = [];
  myName: string = '';
  chat: any = { messages: [] };
  myId: number = 0;
  message: string = '';
  searchTerm: string = '';
  selectedUser: any = null;

  isMobile: boolean = false;
  menuOpen: boolean = false;

  private pollingSubscription?: Subscription;
  private currentReceiverId?: number;

  constructor(private homeChat: BackendService) {}

  ngOnInit(): void {
    this.checkIsMobile();

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
    window.removeEventListener('resize', this.handleResize);
  }

  // Detecta se é mobile
  private checkIsMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  @HostListener('window:resize')
  handleResize = () => {
    const wasMobile = this.isMobile;
    this.checkIsMobile();
    if (!this.isMobile) {
      this.menuOpen = false; // se virou desktop, fecha o menu
    }
  };

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    if (this.isMobile) {
      this.menuOpen = false;
    }
  }

  get filteredUsers() {
    const term = this.searchTerm.toLowerCase();
    return this.users.filter((user) =>
      user.username.toLowerCase().includes(term)
    );
  }

  openChat(receiverId: number) {
    this.currentReceiverId = receiverId;

    this.stopPolling();
    this.loadChat(receiverId);
    this.selectedUser = this.users.find((u) => u.id === receiverId);

    if (this.isMobile) {
      this.closeMenu();
    }

    this.pollingSubscription = interval(1000).subscribe(() => {
      if (this.currentReceiverId) {
        this.loadChat(this.currentReceiverId, false);
      }
    });
  }

  private loadChat(receiverId: number, scroll: boolean = true) {
    this.homeChat.openChatWithUser(receiverId).subscribe(
      (res: any) => {
        const oldLength = this.chat.messages.length;
        this.chat = res.chat;
        if (scroll || res.chat.messages.length !== oldLength) {
          setTimeout(() => this.scrollToBottom(), 100);
        }
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
        this.chat.messages.push(msg);
        this.message = '';
        setTimeout(() => this.scrollToBottom(), 100);
      },
      (error) => {
        console.error('Erro ao enviar mensagem:', error);
      }
    );
  }

  private scrollToBottom(): void {
    try {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {
      console.error('Erro ao rolar mensagens:', err);
    }
  }

  private stopPolling() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
      this.pollingSubscription = undefined;
    }
  }
}
