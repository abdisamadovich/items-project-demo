import { Data } from "@angular/router";

export class Item{
    public itemId:number = 0;
    public itemName:string = "";
    public itemType:number = 0;
    public itemDate:Data | null = null;
}