import { Injectable, EventEmitter } from '@angular/core';
import { strictEqual } from 'assert';
@Injectable({ providedIn: 'root' })
export class AuthService {
    
    isLoggedIn: boolean;
    userName: string;
    logInEvent = new EventEmitter<{userName: string, isLoggedIn: boolean}>();

    constructor(){
        this.isLoggedIn = false;
        this.userName = 'Unknown'
    }

    logIn(){
        this.isLoggedIn = true;
        this.userName = 'Marshall Mathers'
        this.logInEvent.emit({userName: this.userName, isLoggedIn: true});
    }
    logOut(){
        this.isLoggedIn = false;
        this.userName = 'Unknown'
        this.logInEvent.emit({userName: this.userName, isLoggedIn: false});
    }
}