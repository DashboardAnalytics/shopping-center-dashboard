import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LineChartComponent } from './layout/charts/line-chart/line-chart.component';
import { BarChartComponent } from './layout/charts/bar-chart/bar-chart.component';
import { TopKComponent } from './layout/top-k/top-k.component';
import { GeneralSummarySectionComponent } from './layout/general-summary-section/general-summary-section.component';

const appRoute: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'home', component: LayoutComponent, children: [
    { path: ':mall/:store', component: GeneralSummarySectionComponent },
  ]},
  { path: 'auth', component: AuthComponent, pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    LayoutComponent,
    LineChartComponent,
    BarChartComponent,
    TopKComponent,
    GeneralSummarySectionComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ChartsModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
