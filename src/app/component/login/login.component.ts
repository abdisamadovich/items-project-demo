import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLogin } from '../../services/models/user/userLogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  private userService:UserService = inject(UserService)
  public email:string = "";
  public password:string = "";

  public loginUser():void{
    const userLogin = new UserLogin()
    userLogin.clientId = 0;
    userLogin.grantType = "password";
    userLogin.email = this.email;
    userLogin.password = this.password;
  
    this.userService.userLogin(userLogin).subscribe({
      next: (response) => {
        alert("Login Successful");
      },
      error: (err) => {
        alert("Error during login");
      }
    })
  }

  
}

