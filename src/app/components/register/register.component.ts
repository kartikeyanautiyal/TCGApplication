import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/user-details.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(data: UserDetails){
    //console.log(data);
    this.loginService.register(data);
  }
}
