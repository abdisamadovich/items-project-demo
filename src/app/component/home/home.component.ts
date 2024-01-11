import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  public modalVisible: boolean = false;

  public showModal(): void {
    this.modalVisible = true;
  }

  public hideModal(): void {
    this.modalVisible = false;
  }

  public saveChanges(): void {
    // do something
    this.modalVisible = false;
  }
}
