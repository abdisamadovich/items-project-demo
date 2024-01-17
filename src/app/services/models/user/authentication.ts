export class Authentication {
    access_token: string = "";
    refresh_token: string | null = null;
    token_type:string = "";
    expires: number = 0;
}