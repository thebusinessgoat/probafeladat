import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { debounce, distinctUntilChanged, switchMap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styles: []
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  errorMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group(
      {
        name: [''],
        username: [ '', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
      }
    );
  }

  addUser(){
    this.userSvc.addUser(this.addUserForm.value)
    .subscribe(
      (data:boolean) => {
        if(data == true){
          this.errorMsg = null;
          this.router.navigate(['list-user']);
        } else {
          this.errorMsg = 'Username ' + this.addUserForm.controls['username'].value + ' already exists!';
          this.router.navigate(['add-user']);
        }
      }
    );
  }

  onCancel(){
    this.router.navigate(['list-user']);
  }
}
