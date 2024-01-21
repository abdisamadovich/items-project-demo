import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserRegister } from '../../services/models/user/userRegister';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationOrchestrator } from '../models/authentication-orchestrator';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,LoadingComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent {

  //Ko'rsatkichlar
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public password: string = '';
  public loading: boolean = false;

  //Komponent xususiyatlari
  private userService: UserService = inject(UserService);
  private toastr: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);

  //Methodlar
  public registerUser():void{
    this.loading=true;
    if (!this.validateInputs()) {
      return;
    }
    const userRegister = new UserRegister();
    userRegister.firstName = this.firstName;
    userRegister.lastName = this.lastName;
    userRegister.email = this.email;
    userRegister.password = this.password;

    this.userService.userRegister(userRegister).subscribe({
      next:(Response) =>{
        this.toastr.success("Successful Register!");
        this.loading=false;
        setTimeout(() => {
          this.router.navigate(["/login"])
        }, 1000);
      },
      error:(err) => {
        this.toastr.warning("Error during register!");
        this.loading=false;
      }
    })
  }

  private validateInputs(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setTimeout(() => {
      this.loading=false;
    }, 1000);

    if (!this.firstName.trim()) {
      this.toastr.warning('First name cannot be empty!');
      return false;
    }
  
    if (!this.lastName.trim()) {
      this.toastr.warning('Last name cannot be empty!');
      return false;
    }
    
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
