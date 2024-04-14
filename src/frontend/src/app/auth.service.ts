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
        this.setSession(res.body._id, res.headers.get('x-access-token') as string, res.headers.get('x-refresh-token') as string)
        console.log("LOGGED IN");
      })
    )
  }

  signup(username: string, email: string, password: string) {
    return this.webService.signup(username, email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get('x-access-token') as string, res.headers.get('x-refresh-token') as string)
        console.log("succcessfully signed up and logged in");
      })
    )
  }

  forgetPassword(email: string) {
    return this.http.post(`${this.webService.ROOT_URL}/send-email`, {
      email
    })
  }

  resetPassword(token: string, password: string) {
    return this.http.post(`${this.webService.ROOT_URL}/reset-password`, {
      token: token,
      password: password
    })
  }

  logout() {
    this.removeSession();

    this.router.navigateByUrl('/login');
  }

  getAccessToken() {
    let accessToken = localStorage.getItem('x-access-token');
    if (!accessToken !== null) return accessToken as string;
    else return '';
  }

  getRefreshToken() {
    let refreshToken = localStorage.getItem('x-refresh-token');
    if (!refreshToken !== null) return refreshToken as string;
    else return '';
  }

  getUserId() {
    let userId = localStorage.getItem('user-id');
    if (!userId !== null) return userId as string;
    else return '';
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
    

    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, { 
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token') ?? '');
      })
    )
  }

  checkUser(username: string) {
    return this.webService.checkUser(username);
  }

  checkEmail(email: string) {
    return this.webService.checkEmail(email);
  }

  getUsername() {
    return this.webService.getUsername(this.getUserId());
  }

  getUsernameWithId(id: string) {
    return this.webService.getUsername(id);
  }
}
