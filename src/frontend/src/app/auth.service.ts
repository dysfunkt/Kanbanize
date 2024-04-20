import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * Provides methods for authentication and CRUD operations related to authentication.
 */
export class AuthService {

  constructor(private webService: WebRequestService, private router: Router, private http: HttpClient) { }

  /**
   * Login
   * @param username username
   * @param password password
   * @returns response
   */
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

  /**
   * signup a new user
   * @param username 
   * @param email 
   * @param password 
   * @returns response
   */
  signup(username: string, email: string, password: string) {
    return this.webService.signup(username, email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body._id, res.headers.get('x-access-token') as string, res.headers.get('x-refresh-token') as string)
        console.log("succcessfully signed up and logged in");
      })
    )
  }

  /**
   * send a reset password email
   * @param email target email address
   * @returns response
   */
  forgetPassword(email: string) {
    return this.http.post(`${this.webService.ROOT_URL}/send-email`, {
      email
    })
  }

  /**
   * Change password
   * @param token reset token
   * @param password new password
   * @returns response
   */
  resetPassword(token: string, password: string) {
    return this.http.post(`${this.webService.ROOT_URL}/reset-password`, {
      token: token,
      password: password
    })
  }

  /**
   * logs a user out and redirect to login page
   */
  logout() {
    this.removeSession();

    this.router.navigateByUrl('/login');
  }

  /**
   * get access token from browser local storage
   * @returns access token
   */
  getAccessToken() {
    let accessToken = localStorage.getItem('x-access-token');
    if (!accessToken !== null) return accessToken as string;
    else return '';
  }

  /**
   * get refresh token from browser local storage
   * @returns refresh token
   */
  getRefreshToken() {
    let refreshToken = localStorage.getItem('x-refresh-token');
    if (!refreshToken !== null) return refreshToken as string;
    else return '';
  }

  /**
   * get userid from browser local storage
   * @returns userid
   */
  getUserId() {
    let userId = localStorage.getItem('user-id');
    if (!userId !== null) return userId as string;
    else return '';
  }

  /**
   * save access token to browser local storage
   * @param accessToken 
   */
  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }

  /**
   * set login session to browser local storage
   * @param userId 
   * @param accessToken 
   * @param refreshToken 
   */
  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  /**
   * remove login session from browser local storage
   */
  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  /**
   * refresh access token
   * @returns new access token
   */
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

  /**
   * check if username exists
   * @param username 
   * @returns boolean
   */
  checkUser(username: string) {
    return this.webService.checkUser(username);
  }

  /**
   * check if email exists
   * @param email 
   * @returns boolean
   */
  checkEmail(email: string) {
    return this.webService.checkEmail(email);
  }

  /**
   * get username from local user id
   * @returns username
   */
  getUsername() {
    return this.webService.getUsername(this.getUserId());
  }

  /**
   * get username specified by userid
   * @param id 
   * @returns username
   */
  getUsernameWithId(id: string) {
    return this.webService.getUsername(id);
  }
}
