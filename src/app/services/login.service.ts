import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '../models/user-details.model';
import { ResponseToken } from '../models/response-token.model';
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  current_user: any | null
  private _saveUser = "http://localhost:8090/api/v1/user/register";
  private _getuser = "http://localhost:8090/api/v1/user/login";
  constructor(private http: HttpClient) {
    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelperService();
      this.current_user = jwt.decodeToken(token);
    }
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
    this.http.post<ResponseToken>(this._getuser, credentials).subscribe(
      (result) => {
        console.log(result);
        if(result && result.token){
          let jwt = new JwtHelperService();
          localStorage.setItem('token', result.token);
          let tokn: any|null;
          tokn = localStorage.getItem('token');
          this.current_user = jwt.decodeToken(tokn);
        }
      }
    );
   }
}
