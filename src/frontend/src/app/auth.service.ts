import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebRequestService, private router: Router, private http: HttpClient) { }

  login(username: string, password: string) {
    return this.webService.login(username, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        //auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token') ?? '', res.headers.get('x-refresh-token') ?? '')
        console.log("LOGGED IN");
      })
    )
  }

  logout() {
    this.removeSession();

    this.router.navigateByUrl('/login');
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    const refreshToken = this.getRefreshToken();
    const id = this.getUserId()
    const headers = {
      'x-refresh-token': refreshToken ? refreshToken : '',
      '_id': id ? id : ''
    };

    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, { 
      headers,
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        const accessToken = this.getAccessToken();
        this.setAccessToken(accessToken ? accessToken : '');
      })
    )
  }
}
