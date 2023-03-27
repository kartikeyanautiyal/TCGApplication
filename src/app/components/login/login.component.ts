import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/models/user-details.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // user_logged_in: object | undefined;
  // loginValid: any;
  constructor(private router: Router, public loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  onSubmit(data: UserDetails){
    console.log(data);
    this.loginService.login(data);

    if(true){
      console.log("entered");
      this.router.navigate(['home']);
    }

    else{
      this.loginService.loginValid = false;
    }
  }
}
