import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL= 'http://localhost:3000';
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(username: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      username,
      password
    }, { 
      observe: 'response'
    });
  }

  signup(username: string, email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users`, {
      username,
      email,
      password
    }, { 
      observe: 'response'
    });
  }

  checkUser(username: string) {
    return this.http.post(`${this.ROOT_URL}/users/username`, {
      username
    })
  }

  checkEmail(email: string) {
    return this.http.post(`${this.ROOT_URL}/users/email`, {
      email
    })
  }

  getUsername(userId: string) {
    return this.http.post(`${this.ROOT_URL}/users/getuser`, {
      userId
    })
  }
}
