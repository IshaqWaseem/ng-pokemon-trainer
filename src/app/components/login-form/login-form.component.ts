import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
  export class LoginFormComponent  {
  //dependancy injection
  constructor(
    private readonly router:Router,
    private readonly loginService: LoginService){}
  
  public loginSubmit(loginForm:NgForm): void {
    //username
    const {username} = loginForm.value
    this.loginService.login(username)
    .subscribe({
      next: (user:User)=>{
        this.router.navigateByUrl("/pokemons")
      },
      error:() => {

      }
    }

    )
  }
}
