import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent{
  private router: Router = inject(Router)

  public modalLogOutVisible: boolean = false;

  public showLogOutModal(): void{
    this.modalLogOutVisible = true;
  }

  public hideLogOutModal(): void{
    this.modalLogOutVisible = false;
  }

  public saveLogOutChanges(): void{
    localStorage.removeItem('access_token');
    this.modalLogOutVisible = false;
  }
}
