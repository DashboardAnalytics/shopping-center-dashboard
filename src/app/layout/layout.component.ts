import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { MallService } from '../services/mall.service';
import { Mall } from '../models/mall.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  faShieldAlt = faShieldAlt;
  isFetching: boolean = false;
  isLoggedIn: boolean = false;
  loadedMalls: Mall[];

  constructor(
    private spinner: NgxSpinnerService,
    private mallService: MallService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    console.log('ngOnInit layout')
    if (this.authService.isLoggedIn) {
      this.isLoggedIn = this.authService.isLoggedIn;
      this.spinner.show();
      this.isFetching = true;
      this.mallService.fetchMalls()
        .subscribe(malls => {
          this.isFetching = false;
          this.spinner.hide();
          this.loadedMalls = malls;
        })
    }


  }

}
