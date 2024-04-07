import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{

  constructor(private route: ActivatedRoute, private authService: AuthService) { }
  token!: string;
  ngOnInit(){
      this.route.params.subscribe((params: Params) => {
        if (params['token'] != undefined) {
          this.token = params['token'];
        }
      })
  }

  resetPassword(password1: string, password2: string){
    if (!this.isStrongPassword(password1)) {
      const passwordStrengthDialog : HTMLDialogElement = document.getElementById('passwordStrengthError') as HTMLDialogElement;
      passwordStrengthDialog.show();
    } else if (password1 !== password2) {
      const passwordMismatchDialog : HTMLDialogElement = document.getElementById('passwordMismatchError') as HTMLDialogElement;
      passwordMismatchDialog.show();
    } else {
      const confirmButton: HTMLButtonElement = document.getElementById('confirmButton') as HTMLButtonElement;
      confirmButton.classList.add('is-loading');
      this.reset(password1)
      
    }
    
  }

  reset(password: string) {
    
    this.authService.resetPassword(this.token, password).subscribe((res: any) => {
      if(res) {
        const mainModal: HTMLDivElement = document.getElementById('main') as HTMLDivElement;
          const subModal: HTMLDivElement = document.getElementById('sub') as HTMLDivElement;
          mainModal.classList.add('is-hidden');
          subModal.classList.remove('is-hidden');
      } else {
        console.log(res);
        
      }
    })
  }

  close() {
    const passwordStrengthDialog : HTMLDialogElement = document.getElementById('passwordStrengthError') as HTMLDialogElement;
    const passwordMismatchDialog : HTMLDialogElement = document.getElementById('passwordMismatchError') as HTMLDialogElement;
    passwordStrengthDialog.close();
    passwordMismatchDialog.close();
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
}
