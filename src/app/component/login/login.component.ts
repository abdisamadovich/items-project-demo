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
  imports: [RouterModule,FormsModule,ReactiveFormsModule,LoadingComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  private userService:UserService = inject(UserService)
  private toastr: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);

  public email:string = "";
  public password:string = "";
  public loading: boolean = false;

  public loginUser(): void {
    this.loading = true;
    if (!this.validateInputs()) {
      return;
    }

    const userLogin = new UserLogin();
    userLogin.clientId = 0;
    userLogin.grantType = "password";
    userLogin.email = this.email;
    userLogin.password = this.password;
  
    this.userService.userLogin(userLogin).subscribe({
      next: (response) => {
        this.loading = false;
        AuthenticationOrchestrator.signaller.next(true);
        this.toastr.success("Successful Login!");
        setTimeout(() => {
          this.router.navigate(["/home"]);
        }, 1000);
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
  }

  private validateInputs(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setTimeout(() => {
      this.loading=false;
    }, 1000);
    
    if (!emailRegex.test(this.email)) {
      this.toastr.warning('Invalid email address!');
      return false;
    }

    if (this.password.length < 8) {
      this.toastr.warning('Password should be at least 8 characters long!');
      return false;
    }

    return true; 
  }
}
