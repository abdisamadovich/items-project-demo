import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { Item } from "./items/item";
import { ItemModel } from "../api/models/item.model";
import { ItemApiService } from "../api/item.api-service";

@Injectable({providedIn : "root"})
export class ItemService{
    private itemApiService: ItemApiService = inject(ItemApiService)
    public getItems(): Observable<Item[]> {
        return this.itemApiService.getItems()
            .pipe(map(x => {
                const result: Item[] = [];
                for (let i = 0; i < x.length; i++) {
                    result.push(this.toModel(x[i]))                    
                }
                return result;
            }));
    }

    private toModel(apiModel: ItemModel): Item{
        const result = new Item();
        result.itemId = apiModel.itemId;
        result.itemName = apiModel.itemName;
        result.itemType = apiModel.itemType;
        result.itemDate = new Date(apiModel.itemDate)
        return result;
    }
}