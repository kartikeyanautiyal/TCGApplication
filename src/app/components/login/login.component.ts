import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/user-details.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(data: UserDetails){
    //console.log(data);
    this.loginService.login(data);
  }
}
