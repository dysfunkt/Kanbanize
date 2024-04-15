import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router){}
  

  onLoginButtonClick(username: string, password: string) {
    if (username === '' || password === '') {
      const emptyFieldDialog : HTMLDialogElement = document.getElementById('emptyFieldError') as HTMLDialogElement;
      emptyFieldDialog.show();
    } else {
      this.authService.login(username, password).subscribe({
        next: (res: HttpResponse<any>) => {
          
          if (res.status === 200) {
            this.router.navigate(['/project-list']);
          }
  
          console.log(res);
        },
        error: () => {
            const invalidLoginDialog : HTMLDialogElement = document.getElementById('invalidLoginError') as HTMLDialogElement;
            invalidLoginDialog.show();
        }
      })
    }
    
  }

  async onRegisterButtonClick(username: string, email: string, password1: string, password2: string) {
    
    let usercheck = await this.checkUser(username);
    let emailcheck = await this.checkEmail(email);
    
    if (username === '' || email === '' || password1 === '' || password2 === '') {
      const emptyFieldDialog : HTMLDialogElement = document.getElementById('emptyFieldError') as HTMLDialogElement;
      emptyFieldDialog.show();
    } else if(usercheck) {
      const userTakenDialog : HTMLDialogElement = document.getElementById('userTakenError') as HTMLDialogElement;
      userTakenDialog.show();
    } else if (!this.isValidEmail(email)) {
      const emailInvalidDialog : HTMLDialogElement = document.getElementById('emailInvalidError') as HTMLDialogElement;
      emailInvalidDialog.show();
    } else if (emailcheck) {
      const emailTakenDialog : HTMLDialogElement = document.getElementById('emailTakenError') as HTMLDialogElement;
      emailTakenDialog.show();
    } else if (!this.isStrongPassword(password1)) {
      const passwordStrengthDialog : HTMLDialogElement = document.getElementById('passwordStrengthError') as HTMLDialogElement;
      passwordStrengthDialog.show();
    } else if (password1 !== password2) {
      const passwordMismatchDialog : HTMLDialogElement = document.getElementById('passwordMismatchError') as HTMLDialogElement;
      passwordMismatchDialog.show();
    } else {
      //register the user and log in
      this.authService.signup(username, email, password1).subscribe((res: HttpResponse<any>) => {
      
        if (res.status === 200) {
          this.router.navigate(['/project-list']);
        }
        console.log(res);
      });
    }

    
  }

  close() {
    const emptyFieldDialog : HTMLDialogElement = document.getElementById('emptyFieldError') as HTMLDialogElement;
    const userTakenDialog : HTMLDialogElement = document.getElementById('userTakenError') as HTMLDialogElement;
    const emailInvalidDialog : HTMLDialogElement = document.getElementById('emailInvalidError') as HTMLDialogElement;
    const emailTakenDialog : HTMLDialogElement = document.getElementById('emailTakenError') as HTMLDialogElement;
    const passwordStrengthDialog : HTMLDialogElement = document.getElementById('passwordStrengthError') as HTMLDialogElement;
    const passwordMismatchDialog : HTMLDialogElement = document.getElementById('passwordMismatchError') as HTMLDialogElement;
    const invalidLoginDialog : HTMLDialogElement = document.getElementById('invalidLoginError') as HTMLDialogElement;
    
    
    emptyFieldDialog.close();
    userTakenDialog.close();
    emailInvalidDialog.close();
    emailTakenDialog.close();
    passwordStrengthDialog.close();
    passwordMismatchDialog.close();
    invalidLoginDialog.close();
  }

  async checkUser(username: string) {
    const usercheck$ = this.authService.checkUser(username);
    return await firstValueFrom(usercheck$) as Boolean;
    
  }

  async checkEmail(email: string) {
    const emailcheck$ = this.authService.checkEmail(email);
    return await firstValueFrom(emailcheck$) as Boolean;
  }

  isStrongPassword(password: string) {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const minLength = password.length >= 8;

    return (
      hasLowercase &&
      hasUppercase &&
      hasNumber &&
      minLength
    );
  }

  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
