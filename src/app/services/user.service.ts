import { Injectable, inject } from "@angular/core";
import { UserApiService } from "../api/user.api-service";
import { UserRegister } from "./models/user/userRegister";
import { Observable } from "rxjs";

@Injectable({providedIn:"root"})
export class UserService{
    private userApiService:UserApiService = inject(UserApiService)

    public userRegister(userRegister:UserRegister): Observable<any> {
        return this.userApiService.registerUser(userRegister)
    }
}