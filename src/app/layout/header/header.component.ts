import { Component, OnInit, Input } from '@angular/core';
import { faBell, faComment, faUserCircle, faCalendarAlt, faSignOutAlt, faUndoAlt, faBuilding, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from "ngx-spinner";
import { MallService } from 'src/app/services/mall.service';
import { Mall } from 'src/app/models/mall.model';
import { Store } from 'src/app/models/store.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faBell = faBell;
  faComment = faComment;
  faUserCircle = faUserCircle;
  faCalendarAlt = faCalendarAlt;
  faSignOutAlt = faSignOutAlt;
  faUndoAlt = faUndoAlt;
  faBuilding = faBuilding;
  faStoreAlt = faStoreAlt;

  @Input() malls: Mall[];
  stores: Store[];

  userName: string;

  isMallSelected: boolean;
  isStoreSelected: boolean;
  isFetchingStores: boolean;
  selectedMallName: string;
  selectedStoreName: string;

  logoLocation: string;

  topStore: Store[];

  constructor(
    private mallService: MallService,  
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

  ngOnInit() {
    this.userName = this.authService.userName;
    this.isMallSelected = false;
    this.mallService.selectedMallEvent.subscribe(mallElement => {
      this.spinner.show();
      this.isFetchingStores = true;
      this.isMallSelected = true;
      this.selectedMallName = mallElement.name;
      this.mallService.fetchMallStores(mallElement.id)
        .subscribe(stores => {
          this.isFetchingStores = false;
          this.spinner.hide();
          this.stores = stores;

        })
      
    })
    this.mallService.selectedStoreEvent.subscribe(storeName => {
      
      this.selectedStoreName = storeName.name;
      if (this.selectedStoreName === 'Jumbo') {
        this.logoLocation = '../../assets/images/logo_jumbo.png'
      }
      if (this.selectedStoreName === 'Santa Isabel') {
        this.logoLocation = '../../assets/images/logo_santa-isabel.png'
      }
      if (this.selectedStoreName === 'Easy') {
        this.logoLocation = '../../assets/images/logo_easy.png'
      }
      if (this.selectedStoreName === 'Paris') {
        this.logoLocation = '../../assets/images/logo_paris.png'
      }
      if (this.selectedStoreName === 'Johnson') {
        this.logoLocation = '../../assets/images/logo_johnson.png'
      }
      if (this.selectedStoreName === 'Adidas') {
        this.logoLocation = '../../assets/images/logo_adidas.png'
      }
      this.isStoreSelected = true;
    })
    this.authService.logInEvent.subscribe( authenticationResponse => {
      if (!authenticationResponse.isLoggedIn) {
        this.router.navigate(['/auth']);
      }
    })
  }

  onSelectMall(mallName: string) {
    this.mallService.setSelectedMall(mallName);
    this.selectedMallName = mallName;
  }
  onSelectStore(storeName: string) {
    this.mallService.setSelectedStore(storeName);
    this.selectedStoreName = storeName;
  }

  onSelectShoppingCenter(){
    this.router.navigate(['']);
  }

  onSingOut(){
    console.log('Saliendo desde el server...')
    this.authService.logOut();
  }

}
