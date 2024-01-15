import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { ItemModel } from "./models/item.model";
import { ItemCreateModel } from "./models/itemCreate.model";

@Injectable({providedIn:"root"})
export class ItemApiService {
    private client: HttpClient = inject(HttpClient);
    private apiUrl = "https://localhost:7274/Item"; // API manzili
    
    // Get Items
    public getItems(): Observable<ItemModel[]>{
        return this.client.get<ItemModel[]>("https://localhost:7274/Item");
    }

    // add Items
    public addItem(item : ItemCreateModel ): Observable<any> {
        return this.client.post(this.apiUrl,item);
    }

    // delete Items
    public deleteItem(itemId:number):Observable<any>{
        return this.client.delete(`${this.apiUrl}?id=${itemId}`);
    }

    // editItems
    public editItem(item:ItemModel):Observable<any>{
        return this.client.put(this.apiUrl,item);
    }
}