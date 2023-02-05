import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
  export class LoginFormComponent  {
    @Output() login:EventEmitter<void> = new EventEmitter();
  //dependancy injection
  constructor(
    private readonly userService: UserService,
    private readonly loginService: LoginService){}
  
  public loginSubmit(loginForm:NgForm): void {
    //username
    const {username} = loginForm.value
    this.loginService.login(username)
    .subscribe({
      next: (user:User)=>{
        this.userService.user=user;
        this.login.emit()
      },
      error:() => {

      }
    }

    )
  }
}
