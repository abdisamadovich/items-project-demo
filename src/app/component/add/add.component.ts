import { CommonModule } from '@angular/common';
import { Component,OnInit,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Item } from '../../services/models/items/item';
import { ItemService } from '../../services/item.service';
import { ItemCreate } from '../../services/models/items/itemCreate';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,LoadingComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.less'
})
export class AddComponent {
  public modalAddVisible: boolean=false;
  private itemService:ItemService=inject(ItemService);
  public loading: boolean = false;
  public items:Item[]=[];

  public itemId:number=0;
  public itemType: number = 0;
  public itemName: string = "";
  public itemDate: Date =new Date();

  public saveAddChanges(): void {
    this.loading = true;
    const itemCreateModel = new ItemCreate();        
        itemCreateModel.itemName=this.itemName;
        itemCreateModel.itemType=this.itemType;
        itemCreateModel.itemDate=this.itemDate;
    this.itemService.addItem(itemCreateModel).subscribe({
      next: response => {
        alert("Add successful:");
      },
      error: err => {
        
        alert("Error during add:");
      }
    });
    this.modalAddVisible = false;
    this.loading = false;
  }
}
