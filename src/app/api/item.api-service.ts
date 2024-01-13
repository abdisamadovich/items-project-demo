import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, map } from "rxjs";
import { ItemModel } from "./models/item.model";

@Injectable({providedIn:"root"})
export class ItemApiService {
    private client: HttpClient = inject(HttpClient);

    public getItems(): Observable<ItemModel[]>{
        return this.client.get<ItemModel[]>("https://localhost:7274/Item");
    }
}