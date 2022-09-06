import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn: boolean = false;

  constructor() { }

  login(userName: string, password: string): Observable<any> {
    console.log('Username: ', userName);
    console.log('Password: ', password);
    this.isUserLoggedIn = (userName == 'admin' && password == 'admin');
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
    console.log('USER LOGGED IN: ',localStorage.getItem('isUserLoggedIn'));

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => {
        console.log('User Authentication: ', val);
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.setItem('isUserLoggedIn', 'false');
    console.log('AUTHENTICATION SERVICE',localStorage.getItem('isUserLoggedIn'));
  }
}
