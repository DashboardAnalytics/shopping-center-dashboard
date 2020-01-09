import { Component, OnInit } from '@angular/core';
import { faUserCircle, faFrown } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { Router, } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  faUserCircle = faUserCircle;
  faFrown = faFrown;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.authService.logInEvent.subscribe(authenticationResponse => {
        if (authenticationResponse.isLoggedIn) {
          this.router.navigate(['/home']);
        }
      })
    }else{
      this.router.navigate(['/home']);
    }
  }

  onLogIn() {
    this.authService.logIn();
  }

}
