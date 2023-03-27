import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../models/user-details.model';
import { ResponseToken } from '../models/response-token.model';
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  current_user: any | null
  loginValid: boolean = false;
  private _saveUser = "http://localhost:8090/api/v1/user/register";
  private _getuser = "http://localhost:8090/api/v1/user/login";

  private loginStatus = new BehaviorSubject<boolean>(true);
  current_status = this.loginStatus.asObservable();

  constructor(private http: HttpClient) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelperService();
      this.current_user = jwt.decodeToken(token);
    }
  }

  updateLoginStatus(status: boolean){
    this.loginStatus.next(status);
  }

  register(credentials: UserDetails){
    //return this.http.post(this._saveUser, credentials);
    this.http.post(this._saveUser, credentials).subscribe(
      (result) => {
        console.log(result);
      }
    )
  }

  login(credentials: UserDetails) {
    this.current_user = null;
    this.updateLoginStatus(false);
    this.http.post<ResponseToken>(this._getuser, credentials).subscribe(
      (result) => {
        console.log(result);
        if(result && result.token){
          console.log("entered login jwt true");
          let jwt = new JwtHelperService();
          localStorage.setItem('token', result.token);
          let tokn: any|null;
          tokn = localStorage.getItem('token');
          this.current_user = jwt.decodeToken(tokn);
          this.updateLoginStatus(true);
          //console.log("value of loginValid - ", this.current_status);
          this.current_status.subscribe(
            result => {console.log("the current status is ",result);}
          );
        }
        else{
          console.log("entered login jwt false");
          this.updateLoginStatus(false);
        }
      }
    );
   }

   isLoggedIn() {
    let jwt = new JwtHelperService();
    // return jwt.isTokenExpired(localStorage.getItem('token'));
    return this.loginValid;
  }
}
