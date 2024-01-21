import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Item } from '../../services/models/items/item';
import { ItemService } from '../../services/item.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationData } from '../../services/models/common/pagination.data';
import { LoadingComponent } from '../loading/loading.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit{
  constructor(private toastr: ToastrService) {};

  //For ModalWindow Variables
  public modalEdit: boolean = false;
  public modalDelete: boolean = false;
  public loading: boolean = false;

  //For GetItems Variables
  private itemService : ItemService = inject(ItemService);
  public items: Item[] = [];

  //For Edit, Delete, Add Variables
  public itemId:number=0;
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
    this.loading = true;
    setTimeout(() => {
      this.itemService.getItems(page).subscribe((response) => {
        this.items = response.items;
        this.pagenationData=response.paginationMetaData;
        this.totalPages=response.paginationMetaData.totalPages;
        this.loading = false;
      }
    )
    }, 1000);
    
  }

  //Delete Modal Function
  public showDeleteModal(itemId: number): void {
    this.itemId=itemId;
    this.modalDelete = true;
  }
  public hideDeleteModal(): void {
    this.modalDelete = false;
  }
  public saveDeleteChanges(): void {
    this.loading = true;
    this.itemService.deleteItem(this.itemId).subscribe({
      next: (response) => {
        this.getItems(this.currentPage);
        this.toastr.success("Success delete item!");  
      },
      error: (err) => {
        this.toastr.warning("Error during delete!");
      },
    });
    this.modalDelete = false;
    this.loading = false;
  }

  // Edit Modal Function
  public showModalEdit(itemId:number): void {
    this.itemId=itemId;
    this.modalEdit = true;
  }
  public hideModalEdit(): void {
    this.modalEdit = false;
  }
  public saveEditChanges(): void {
    this.loading = true;
    const itemModel = new Item();
        itemModel.itemId=this.itemId;        
        itemModel.itemName=this.itemName;
        itemModel.itemType=this.itemType;
        itemModel.itemDate=this.itemDate;
    this.itemService.editItem(itemModel).subscribe({
      next: response => {
        this.toastr.success("Success edit item!");   
        this.getItems(this.currentPage);
      },
      error: err => {
        this.toastr.warning("Error during edit!"); 
      }
    });
    this.modalEdit = false;
    this.loading = false;
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

