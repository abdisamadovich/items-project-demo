import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLogin } from '../../services/models/user/userLogin';
import { AuthenticationOrchestrator } from '../models/authentication-orchestrator';
import { LoadingComponent } from '../loading/loading.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule, LoadingComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  private userService:UserService = inject(UserService)
  constructor(private toastr: ToastrService) {};
  public email:string = "";
  public password:string = "";
  private router: Router = inject(Router);
  public loading: boolean = false;

  public loginUser(): void {
    const userLogin = new UserLogin();
    userLogin.clientId = 0;
    userLogin.grantType = "password";
    userLogin.email = this.email;
    userLogin.password = this.password;
    this.loading = true;
  
    setTimeout(() => {
      this.userService.userLogin(userLogin).subscribe({
        next: (response) => {
          this.loading = false;
          AuthenticationOrchestrator.signaller.next(true);
          this.router.navigate(["/home"]);
          this.toastr.success("Successful Login!");   
        },
        error: (err) => {
          if(err.status==404){
            this.toastr.warning("No such email user found!");
            this.loading = false;
          }
          else{
            this.toastr.warning("Error during login!");
           this.loading = false;
          }    
        }
      });
    }, 1000);
  }
}
