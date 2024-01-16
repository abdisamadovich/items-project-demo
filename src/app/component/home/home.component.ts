import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Item } from '../../services/items/item';
import { ItemService } from '../../services/item.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationData } from '../../services/Common/pagination.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit{

  //For ModalWindow Variables
  public modalEdit: boolean = false;
  public modalDelete: boolean = false;

  //For GetItems Variables
  private itemService : ItemService = inject(ItemService);
  public items: Item[] = [];

  //For Edit, Delete, Add Variables
  public ItemId:number=0;
  public itemType: number = 0;
  public itemName: string = "";
  public itemDate: Date =new Date();

  //For Pagination Variables
  public currentPage: number = 1;
  public totalPages: number = 1;
  public pagenationData:PaginationData=new PaginationData();

  //Get items
  public ngOnInit(): void {
    this.getItems(this.currentPage);
  }

  getItems(page: number) {
    this.itemService.getItems(page).subscribe((response) => {
        this.items = response.items;
        this.pagenationData=response.paginationMetaData;
        this.totalPages=response.paginationMetaData.totalPages;
      }
    )
  }


  // Edit Modal Function
  
  public showModalEdit(itemId:number): void {
    this.ItemId=itemId;
    this.modalEdit = true;
  }
  public hideModalEdit(): void {
    this.modalEdit = false;
  }
  public saveEditChanges(): void {
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
    this.modalEdit = false;
  }

  //Delete Modal Function
  
  public showDeleteModal(itemId: number): void {
    debugger
    this.ItemId=itemId;
    this.modalDelete = true;
  }
  public hideDeleteModal(): void {
    this.modalDelete = false;
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
    this.modalDelete = false;
  }

  //Pagination Helper Function

  public changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.getItems(this.currentPage);
  }

  public hangePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.itemService.getItems(this.currentPage);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}

