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
  constructor(private fb:FormBuilder,private toastr: ToastrService) {};

  public loading: boolean = false;
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
}
