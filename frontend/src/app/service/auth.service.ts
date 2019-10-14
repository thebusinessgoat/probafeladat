import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import {tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8080/login'; 
  errorMsg: any;
  private  _loggedInUser?: User;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getLoggedInUser():User{
    return this._loggedInUser;
  }

  set loggedInUser(user: User){
    this._loggedInUser = user;
  } 

  getHeaders(): {headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-type': 'application/json',
        }
      )     
    };
    return httpOptions;
  }

  public login(username: string, password: string ){
    return this.http.post<object>(this.authUrl, JSON.stringify({username: username, password: password}), this.getHeaders())
    .pipe(
      tap(
        (token:object) => {
          if(token){
            var tokenObject = JSON.parse(JSON.stringify(token));
            localStorage.setItem('accessToken',tokenObject.token);
            console.log(`Successful login for username =${username} with password=${password} and token=${tokenObject.token}` );
          } else {
            console.log(`Login failed for username =${username} with password=${password} and token=${JSON.stringify(token)}`);
          }
        }
      )
    );
  }

  logOut(){
    localStorage.removeItem('accessToken');
    this.router.navigate(['sign-in']);
  }

}
