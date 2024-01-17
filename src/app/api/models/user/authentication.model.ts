export interface AuthenticationModel{
    access_token:string;
    refresh_token:string | null;
    token_type:string;
    expires:number;
}