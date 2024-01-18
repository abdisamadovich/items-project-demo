import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthenticationOrchestrator } from '../models/authentication-orchestrator';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements OnInit{
  // shuni surayman
  private router: Router = inject(Router)

  public modalLogOutVisible: boolean = false;
  public isLoggedIn: boolean = false;

  // LogOut method
  public showLogOutModal(): void{
    this.modalLogOutVisible = true;
  }
  public hideLogOutModal(): void{
    this.modalLogOutVisible = false;
  }
  public saveLogOutChanges(): void{
    localStorage.removeItem('access_token');
    this.isLoggedIn = false;
    AuthenticationOrchestrator.signaller.next(false);
    this.check_token();
    this.modalLogOutVisible = false;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.isLoggedIn = true;
    }
    AuthenticationOrchestrator.signaller.subscribe((x) => {
      this.isLoggedIn = x;
    });
  }

  public check_token(): void{
    const token = localStorage.getItem('access_token');
    if(!token){
      this.router.navigate(['/login'])
    }
  }
}
