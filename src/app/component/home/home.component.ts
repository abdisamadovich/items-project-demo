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
  public modalDeleteVisible: boolean = false;
  public modalEditVisible: boolean=false;
  private itemService : ItemService = inject(ItemService);
  public items: Item[] = [];

  public ItemId:number=0;
  public itemType: number = 0;
  public itemName: string = "";
  public itemDate: Date =new Date();

  public ngOnInit(): void {
    this.itemService.getItems()
      .subscribe(x =>{
        this.items = x;
      });
  }
  // Modal Function
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


  // Edit Modal Function
  public modalVisibleEdit: boolean = false;
  public showModalEdit(itemId:number): void {
    this.ItemId=itemId;
    this.modalVisibleEdit = true;
  }
  public hideModalEdit(): void {
    this.modalVisibleEdit = false;
  }
  public saveEditChanges(): void {
    debugger;
    const itemModel = new Item();
        itemModel.itemId=this.ItemId;        
        itemModel.itemName=this.itemName;
        itemModel.itemType=this.itemType;
        itemModel.itemDate=this.itemDate;
    this.itemService.editItem(itemModel).subscribe({
      next: response => {
        alert("Edit successful:");
      },
      error: err => {
        alert("Error during edit:");
      }
    });
    this.modalEditVisible = false;
  }



  //Delete Modal Function
  public showDeleteModal(itemId: number): void {
    this.ItemId=itemId;
    this.modalDeleteVisible = true;
  }
  public hideDeleteModal(): void {
    this.modalDeleteVisible = false;
  }
  public saveDeleteChanges(): void {
    this.itemService.deleteItem(this.ItemId).subscribe({
      next: response => {
        console.log("Delete successful:", response);
        // You can handle the response here, e.g., update the UI or a list
      },
      error: err => {
        console.error("Error during delete:", err);
        // Handle the error here
      }
    });
    this.modalDeleteVisible = false;
  }
}

