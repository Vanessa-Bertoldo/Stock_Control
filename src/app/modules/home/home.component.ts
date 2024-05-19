import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { UserService } from '../../services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest';
import { response } from 'express';
import { error } from 'console';
import { SignupUserRequest } from '../../models/interfaces/user/SignupUserRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required, Validators.minLength(3)],
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) {}

  onSubmitLoginForm() : void {
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          if(response){
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();

            this.messageService.add({
              severity: 'sucess',
              summary: 'sucesso',
              detail: `Bem vindo de volta ${response?.name}`,
              life: 2000
            },
          )}
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Erro ao fazer login`,
            life: 2000
          });
          console.log(err);
        }
      })
    }
  }

  onSubmitSignupForm() : void {
    if(this.signupForm.value && this.signupForm.valid){
      this.userService
        .signupUser(this.signupForm.value as SignupUserRequest)
        .subscribe({
          next: (response) => {
            if(response){
              this.signupForm.reset();
              this.loginCard = true;
              this.messageService.add({
                severity: 'sucess',
                summary: 'sucesso',
                detail: `Bem vindo de volta ${response?.name}`,
                life: 2000
              })
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Erro ao fazer login`,
              life: 2000
            })
            console.log(err);
          }
        })
    }
  }

}
