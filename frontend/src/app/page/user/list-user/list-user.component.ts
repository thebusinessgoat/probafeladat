import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styles: []
})
export class ListUserComponent implements OnInit {

  dataSource: MatTableDataSource<User>;
  displayedColumns = ['id','username','name','edit','delete'];

  @ViewChild('listUsersPaginator', {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  errorMsg: any;

  constructor(
    private router: Router,
    private userSvc: UserService,
    private authSvc: AuthService
  ) { 
    this.populateUserTable();
  }

  private populateUserTable(){
    const users: User[] = [];
    this.dataSource = new MatTableDataSource(users);

    this.userSvc.getUsers()
    .subscribe(
      (usrs: User[]) => {
        this.dataSource.data = usrs;
        if(usrs){
          this.errorMsg = null;
        } else {
          this.errorMsg = 'Unable to get ' + usrs + ' list. Going to the login page';
          this.router.navigate(['sign-in']);
        }
      }
    );
  } 

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editUser(user:User): void{
    this.router.navigate(['/edit-user/'+user.id]);
  }

  addUser():void {
    this.router.navigate(['add-user']);
  }

  deleteUser(user:User):void {
    if(confirm('Delete this user?')){
      this.errorMsg = null;
      this.userSvc.deleteUser(user.id)
      .subscribe(
        (data: boolean) => {
          if( data == true){
            this.errorMsg = null;
            this.populateUserTable();
          } else {
            this.errorMsg = 'You are unable to delete user ' + user.username + ', please contact admin.';
          }
          this.router.navigate(['list-user']);
        }
      );
    }
  }
  logOut(){
    this.authSvc.logOut();
  }
}
