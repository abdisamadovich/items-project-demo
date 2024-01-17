import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { UserRegisterModel } from "./models/user/user.register.model";
import { Observable } from "rxjs";

@Injectable({providedIn:"root"})
export class UserApiService{
    private apiUrl = "https://localhost:7274/api/auth/register"; //Api manzil

    private client : HttpClient = inject(HttpClient);

    public registerUser(user:UserRegisterModel): Observable<any>{
        return this.client.post(this.apiUrl,user)
    }
}