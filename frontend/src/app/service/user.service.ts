import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/users'; //'http://localhost:8080/api/user'; //'api/user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authSvc: AuthService
  ) { }

  getHeaders(): {headers: HttpHeaders} {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('accessToken')
      })
    };
    return httpOptions;
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userUrl,this.getHeaders())
    .pipe(
      tap( (users: User[]) => console.log(`Fetched all ${users.length} users.`)),
      catchError(this.handleError('getUsers ', []))
    );
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T> => {
      console.error('UserSvc error >' + error + '<');

      console.log(`${operation} failed: ${error.message}`);

      if(error.status === 401){
        this.logUserOut();
        console.log(`UserSvc: Error 401.`);
      } else if (error.status === 403){
        console.log(`UserSvc: Error 403.`);
      } else if (error.status === 500){
        console.log(`UserSvc: Error 500.`);
        this.logUserOut();
      }

      return of(result as T);
    };
  }

  logUserOut():void {
    localStorage.removeItem('accessToken');
    this.authSvc.loggedInUser = null;
    console.log('UserSvc: logUserOut');
    this.authSvc.errorMsg = 'Login token expired. Please log in again.';
    this.router.navigate(['sign-in']);
  }

  deleteUser(id:string): Observable<boolean> {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<boolean>(url,this.getHeaders())
    .pipe(
      tap(_ => console.log(`Deleted user  id=${id}`)),
      catchError(this.handleError<boolean>('deleteUser'))
    );
  }

  getUser(id: string): Observable<User>{
    const url =`${this.userUrl}/${id}`;
    return this.http.get<User>(url, this.getHeaders())
    .pipe(
      tap(_ => console.log(`Fetched one user id==${id}`)),
      tap( (usr : User ) => console.log(`Fetched one user username==${usr.username}`)),
      catchError(this.handleError<User>('getUser '))
    );  
  }

  updateUser(user: User, id: string): Observable<boolean>{
    const url =`${this.userUrl}/${id}`;
    return this.http.put<boolean>(url, user, this.getHeaders())
    .pipe(
      tap(_ => console.log(`Updated user id = ${user.id}`)),
      catchError(this.handleError<boolean>('updateUser '))
    );
  }

  addUser(user: User): Observable<boolean> {
    return this.http.post<boolean>(this.userUrl,user, this.getHeaders())
    .pipe(
      tap(_ => console.log(`Added user id = ${user.id}`)),
      catchError(this.handleError<boolean>('addUser '))
    );
  }


}
