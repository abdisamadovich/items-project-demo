import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Item } from '../../services/items/item';
import { ItemService } from '../../services/item.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit{
  private itemService : ItemService = inject(ItemService);
  public items: Item[] = [];

  public ngOnInit(): void {
    this.itemService.getItems()
      .subscribe(x =>{
        this.items = x;
        console.log(x);
        
      });
  }
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

  public modalVisibleEdit: boolean = false;

  public showModalEdit(): void {
    this.modalVisibleEdit = true;
  }

  public hideModalEdit(): void {
    this.modalVisibleEdit = false;
  }

  public saveChangesEdit(): void {
    // do something
    this.modalVisibleEdit = false;
  }
}

