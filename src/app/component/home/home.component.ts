import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Item } from '../../services/models/items/item';
import { ItemService } from '../../services/item.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
  private router: Router = inject(Router);
  
  public page_size: number = 7;
  //For ModalWindow Variables
  public modalEdit: boolean = false;
  public modalDelete: boolean = false;
  public loading: boolean = false;

  //For GetItems Variables
  private itemService : ItemService = inject(ItemService);
  public items: Item[] = [];

  //For Edit, Delete, Add Variables
  public itemId:number = 0;
  public itemType: number = 0;
  public itemName: string = "";
  public itemDate: any =new Date();

  //For Pagination Variables
  public currentPage: number = 1;
  public totalPages: number = 1;
  public itemNumber:number = 0;
  public totalItems:number=0;
  public pagenationData:PaginationData=new PaginationData();

  //Variables For Error
  public itemNameError:string='';
  public itemTypeError:string='';
  public itemDateError:string='';

  //Get items
  public ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if(!token){
      this.router.navigate(['/login']);
      return
    }
    this.getItems(this.currentPage);
  }

  getItems(page: number) {
    this.loading = true;
    setTimeout(() => {
      this.itemService.getItems(page).subscribe((response) => {
        this.items = response.items;
        this.pagenationData=response.paginationMetaData;
        this.totalPages=response.paginationMetaData.totalPages;
        this.totalItems=response.paginationMetaData.totalItems;
        this.loading = false;
      }
    )
    }, 1000);
  }

  //Delete Modal Function
  public showDeleteModal(itemId: number,itemNumber:number): void {
    this.itemId=itemId;
    this.itemNumber = itemNumber;
    this.modalDelete = true;
  }
  public hideDeleteModal(): void {
    this.modalDelete = false;
  }
  public saveDeleteChanges(): void {
    this.loading = true;
    this.itemService.deleteItem(this.itemId).subscribe({
      next: (response) => {
        if(this.totalItems%7==1){
          this.currentPage -= 1;
        }
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
  public showModalEdit(itemId:number,
      itemName:string,
      itemType:number,
      itemDate:Date
    ): void {
      this.modalEdit = true;
      this.itemId = itemId;
      this.itemName = itemName;
      this.itemType = itemType;
      this.itemDate = formatDate(itemDate,"yyyy-MM-ddThh:mm","en");
  }
  public hideModalEdit(): void {
    this.modalEdit = false;
  }
  public saveEditChanges(): void {
    this.loading = true;
    //Validate LoginForm
    if (!this.validateForm(this.itemName,this.itemType,this.itemDate)) {
      return;
    }  
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

  // validateForm
  private validateForm(itemName:string, itemType:number,itemDate:Date | null):boolean{
    let isvalid = true;
    
    // ItemName
    if(!itemName){
      this.itemNameError = "Item name is required!";
      isvalid = false;
    }

    // ItemType
    if(!itemType){
      this.itemTypeError='Item type is required!';
      isvalid = false;
    }else if(!this.isValudItemType(itemType)){
      this.itemTypeError='Item type must be numeric only!';
        isvalid=false;
    }

    // ItemDate
    if(!itemDate){
      this.itemDateError='Item date is requred!'
      isvalid = false;
    }
    this.loading = false;
    return isvalid;
  }

  //Function Validate itemType
  private isValudItemType(type:number){
    const typeRegex=/^[0-9]{1,30}$/;
    return typeRegex.test(type.toString());
}
}

