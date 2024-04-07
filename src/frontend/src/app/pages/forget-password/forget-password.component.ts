import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  constructor(private authService: AuthService) {}

  async send(email: string) {
    
    let emailcheck = await this.checkEmail(email)
    if(!this.isValidEmail(email)) {
      const invalidEmailDialog : HTMLDialogElement = document.getElementById('invalidEmailError') as HTMLDialogElement;
      invalidEmailDialog.show();
    } else if (!emailcheck) {
      const emailNotInUseDialog : HTMLDialogElement = document.getElementById('emailNotInUseError') as HTMLDialogElement;
      emailNotInUseDialog.show();
    } else {
      const sendButton: HTMLButtonElement = document.getElementById('sendButton') as HTMLButtonElement;
      sendButton.classList.add('is-loading');
      this.authService.forgetPassword(email).subscribe ((res: any) => {
        if (res) {
          const mainModal: HTMLDivElement = document.getElementById('main') as HTMLDivElement;
          const subModal: HTMLDivElement = document.getElementById('sub') as HTMLDivElement;
          mainModal.classList.add('is-hidden');
          subModal.classList.remove('is-hidden');
        } else {
          console.log(res);
        }
      })
    }
    
  }
  async checkEmail(email: string) {
    const emailcheck$ = this.authService.checkEmail(email);
    return await firstValueFrom(emailcheck$) as Boolean;
  }
  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  close() {
    const invalidEmailDialog : HTMLDialogElement = document.getElementById('invalidEmailError') as HTMLDialogElement;
    const emailNotInUseDialog : HTMLDialogElement = document.getElementById('emailNotInUseError') as HTMLDialogElement;
    invalidEmailDialog.close();
    emailNotInUseDialog.close();

  }
}
