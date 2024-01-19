import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserRegister } from '../../services/models/user/userRegister';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationOrchestrator } from '../models/authentication-orchestrator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent {
  private userService: UserService = inject(UserService);
  
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public password: string = '';
  private router: Router = inject(Router);

  public registerUser():void{
    const userRegister = new UserRegister();
    userRegister.firstName = this.firstName;
    userRegister.lastName = this.lastName;
    userRegister.email = this.email;
    userRegister.password = this.password;

    this.userService.userRegister(userRegister).subscribe({
      next:(Response) =>{
        alert("Register Successfull")
        this.router.navigate(["/login"])
      },
      error:(err) => {
        alert("Error during register")
      }
    })
  }
}
