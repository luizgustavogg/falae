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
    return this.http.post<AuthResponse>('http://localhost:3000/login', { email, password });
  }

  registerUser(username: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:3000/register', { username, email, password });
  }

  homeChat(): Observable<User> {
    const token = localStorage.getItem('token');
    console.log("backend services homechat: ",token)
    return this.http.post<User>(
      'http://localhost:3000/chat',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
