import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from '../types/auth-response.model'; // novo tipo
import { User } from '../types/user.model';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient, private router: Router) {}

  redirectionUser(url: string) {
    this.router.navigate([url]);
  }

  loginUser(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:3000/login', {
      email,
      password,
    });
  }

  registerUser(
    username: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:3000/register', {
      username,
      email,
      password,
    });
  }

homeChat(): Observable<{ users: any[], myName: string, myId: number, chat: any }> {
  const token = localStorage.getItem('token');
  return this.http.post<{ users: any[], myName: string, myId: number, chat: any }>(
    'http://localhost:3000/chat',
    {}, // sem receiverId
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

  openChatWithUser(receiverId: number) {
    const token = localStorage.getItem('token');
    return this.http.post<any>(
      'http://localhost:3000/chat',
      { receiverId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  sendMessage(chatId: number, contentMessage: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(
      'http://localhost:3000/message',
      { chatId, contentMessage },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
