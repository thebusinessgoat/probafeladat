import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: []
})
export class EditUserComponent implements OnInit {

  user: User;
  editUserForm: FormGroup;
  inputType: string;
  errorMsg: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userSvc: UserService,
    private currRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group(
      {
        id:[''],
        name: [''],
        username: [ '', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(65)]]
      }
    );

    const id = this.currRoute.snapshot.paramMap.get('id');
    this.inputType = 'password';
    if(id){
      this.userSvc.getUser(id)
      .subscribe(
        (user: User) => {
          if(user){
            this.editUserForm.setValue(user);
          }
        } 
      );
    }
  }
  editUser(){
    const id = this.currRoute.snapshot.paramMap.get('id');
    this.userSvc.updateUser(this.editUserForm.value, id )
      .subscribe(
        (data:boolean) => {
          if (data == true){
            this.router.navigate(['list-user']);
          }else {
            this.router.navigate(['edit-user/' + this.editUserForm.controls['id'].value]);
          }
        }
      );
    }
  onCancel(){
    this.router.navigate(['list-user']);
  }

  hideShowPassword(){
    if(this.inputType==='password'){
      this.inputType='text';
    }else if(this.inputType==='text'){
      this.inputType='password';
    }
  }
}
  

