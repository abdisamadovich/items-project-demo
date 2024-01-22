import { CommonModule } from '@angular/common';
import { Component,OnInit,inject } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Item } from '../../services/models/items/item';
import { ItemService } from '../../services/item.service';
import { ItemCreate } from '../../services/models/items/itemCreate';
import { LoadingComponent } from '../loading/loading.component';
import { ToastrService } from 'ngx-toastr';

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
  private toastr: ToastrService = inject(ToastrService);

  public loading: boolean = false;
  public itemId:number=0;
  public itemType: number = 0;
  public itemName: string = "";
  public itemDate: Date =new Date();

  //Variables For Error
  public itemNameError:string='';
  public itemTypeError:string='';
  public itemDateError:string='';
  
  public saveAddChanges(): void {
    this.loading = true;
    this.resetErrors();
    if (!this.validateForm(this.itemName,this.itemType,this.itemDate)) {
      return;
    }
    const itemCreateModel = new ItemCreate();        
    itemCreateModel.itemName=this.itemName;
    itemCreateModel.itemType=this.itemType;
    itemCreateModel.itemDate=this.itemDate;
    this.itemService.addItem(itemCreateModel).subscribe({
      next: response => {
        this.toastr.success("Success add item!");
        this.loading = false;
      },
      error: err => {
        this.toastr.warning("Error during add!"); 
        this.loading = false; 
      }
    });
      this.modalAddVisible = false; 
  }

  // private validateInputs(): boolean {
  //   setTimeout(() => {
  //     this.loading=false;
  //   }, 1000);
  //   if (!this.itemName.trim()) {
  //     this.toastr.warning('First name cannot be empty!');
  //     return false;
  //   }
  //   return true; 
  // }

  //Function Validate itemName
  private isValidItemName(name: string): boolean {
    const nameRegex = /^[a-zA-Z0-9_-]{3,15}$/;
    return nameRegex.test(name);
  }

  //Function Validate itemType
  private isValudItemType(type:number){
    const typeRegex=/^[0-9]{1,15}$/;
    return typeRegex.test(type.toString());
  }

  //FUnction Clear error variables
  private resetErrors(): void {
    this.itemNameError = '';
    this.itemTypeError = '';
    this.itemDateError='';
  }

  private validateForm(itemName:string, itemType:number,itemDate:Date | null):boolean{
    let isvalid = true;
    
    // ItemName
    if(!itemName){
      this.itemNameError = "Item name is required!";
      isvalid = false;
    }
    else if(!this.isValidItemName(itemName)){
      this.itemNameError = "item name is invalid format!";
    }

    // ItemType
    if(!itemType){
      this.itemTypeError='Item type is required!';
      isvalid = false;
    }
    else if(!this.isValudItemType(itemType)){
      this.itemTypeError='Item type must be numeric only!';
      isvalid = false;
    }

    // ItemDate
    if(!itemDate){
      this.itemDateError='Item date is requred!'
      isvalid = false;
    }
    this.loading = false;
    return isvalid;
  }
}
