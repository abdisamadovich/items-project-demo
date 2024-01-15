import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { ItemModel } from "./models/item.model";
import { ItemCreateModel } from "./models/itemCreate.model";

@Injectable({providedIn:"root"})
export class ItemApiService {
    private client: HttpClient = inject(HttpClient);
    private apiUrl = "https://localhost:7274/Item"; // API manzili
    
    public getItems(): Observable<ItemModel[]>{
        return this.client.get<ItemModel[]>("https://localhost:7274/Item");
    }

    public addItem(item : ItemCreateModel ): Observable<any> {
        return this.client.post(this.apiUrl,item);
    }
}