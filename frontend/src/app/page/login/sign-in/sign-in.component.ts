import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: []
})
export class SignInComponent {

  loginForm: FormGroup;
  errorMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authSvc: AuthService
  ) {
    this.loginForm = this.formBuilder.group(
      {
        username: ['',[Validators.required, Validators.minLength(5)]],
        password: ['',[Validators.required, Validators.minLength(5)]]
      } 
    );
  }
  
  onLogin(){
    this.authSvc.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
    .subscribe(
      (token:object) => {
        if(token){
          this.authSvc.errorMsg = null;
          this.router.navigate(['list-user']);
        }else {
          this.authSvc.errorMsg = null;
          this.errorMsg = 'Username and/or password does not match!';
          this.router.navigate(['sign-in']);
        }
      }
    );
  }
}
