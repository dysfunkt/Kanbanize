import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService){}

  onLoginButtonClick(username: string, password: string) {
    this.authService.login(username, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    });
  }
}
