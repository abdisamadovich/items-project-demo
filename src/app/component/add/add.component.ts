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

  private itemService: ItemService = inject(ItemService);
  private toastr: ToastrService = inject(ToastrService);

  public loading: boolean = false;

  public itemId: number=0;
  public itemType: number = 0;
  public itemName: string = "";
  public itemDate: Date | null = null;

  //Variables For Error
  public itemNameError:string='';
  public itemTypeError:string='';
  public itemDateError:string='';
  
  public saveAddChanges(): void {
    this.loading = true;
    this.resetErrors();

    if (!this.validateForm(this.itemName,this.itemType,this.itemDate)) return

    const itemCreateModel = new ItemCreate(); 

    itemCreateModel.itemName=this.itemName;
    itemCreateModel.itemType=this.itemType;
    itemCreateModel.itemDate=this.itemDate;

    this.itemService.addItem(itemCreateModel).subscribe({
      next: response => {
        this.toastr.success("Success add item!");
        this.loading = false;
        this.resetItem();
      },
      error: err => {
        this.toastr.warning("Error during add!"); 
        this.loading = false; 
        this.resetItem();
      }
    });
      this.modalAddVisible = false; 
      this.resetItem();
  }

  // validateForm
  private validateForm(itemName:string, itemType:number,itemDate:Date | null):boolean {
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
    }else if(!this.isValidItemType(itemType)){
      this.itemTypeError='Item type must be numeric only!';
        isvalid=false;
    }

    // ItemDate
    if(!itemDate){
      this.itemDateError='Item date is required!'
      isvalid = false;
    }
    this.loading = false;

    return isvalid;
  }

  //Function Clear error variables
  private resetErrors(): void {
    this.itemNameError = '';
    this.itemTypeError = '';
    this.itemDateError = '';
  }

  //Function Clear Item variables
  private resetItem(): void {
    this.itemId = 0;
    this.itemName = "";
    this.itemType = 0;
    this.itemDate = null;
  }

  //Function Validate itemType
  private isValidItemType(type:number){
    const typeRegex=/^[0-9]{1,30}$/;

    return typeRegex.test(type.toString());
  }
}