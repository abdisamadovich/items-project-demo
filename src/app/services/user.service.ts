import { Injectable, inject } from "@angular/core";
import { UserApiService } from "../api/user.api-service";
import { UserRegister } from "./models/user/userRegister";
import { Observable, map } from "rxjs";
import { UserLogin } from "./models/user/userLogin";
import { Authentication } from "./models/user/authentication";

@Injectable({providedIn:"root"})
export class UserService{
    private userApiService:UserApiService = inject(UserApiService)

    public userRegister(userRegister:UserRegister): Observable<any> {
        return this.userApiService.registerUser(userRegister)
    }

    public userLogin(userLogin:UserLogin):Observable<any>{
        return this.userApiService.loginUser(userLogin).pipe(
            map((authModel:Authentication) =>{
                localStorage.setItem('access_token',authModel.access_token);
                return authModel;
            })    
        )
    }
}