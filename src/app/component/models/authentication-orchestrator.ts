import { Subject } from "rxjs";

export class AuthenticationOrchestrator {
    private static _signaller: Subject<boolean> = new Subject<boolean>();
    public static get signaller(): Subject<boolean>{
        return AuthenticationOrchestrator._signaller;
    }
}