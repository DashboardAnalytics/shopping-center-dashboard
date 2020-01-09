import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Params } from '@angular/router';
import { GeneralVisits } from 'src/app/models/generalVisits.model';
import { MallService } from 'src/app/services/mall.service';
import { SpecificSection } from 'src/app/models/specificSection.model';
import { Store } from 'src/app/models/store.model';
import { Mall } from 'src/app/models/mall.model';

@Component({
  selector: 'app-general-summary-section',
  templateUrl: './general-summary-section.component.html',
  styleUrls: ['./general-summary-section.component.css']
})
export class GeneralSummarySectionComponent implements OnInit {

  isFetchingGeneralVisits: boolean = false;
  isFetchingWeekVisits: boolean = false;
  isFetchingDayVisits: boolean = false;
  isFetchingHourVisits: boolean = false;
  isFetchingTopK: boolean = false;
  selectedStoreName: string;
  specificAnalysisResultsAreas: SpecificSection[];
  allowShowCharts: number

  generalVisits: GeneralVisits;
  weekVisits: GeneralVisits;
  dayVisits: GeneralVisits;
  hourVisits: GeneralVisits;Teng

  selectedMallElement: Mall;
  topStores: Store[];

  constructor(
    private spinner: NgxSpinnerService,
    private mallService: MallService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.selectedMallElement = this.mallService.selectedMallElement;
      this.spinner.show();
      this.isFetchingGeneralVisits = true;
      this.isFetchingWeekVisits = true;
      this.isFetchingDayVisits = true;
      this.isFetchingHourVisits = true;
      this.isFetchingTopK = true;

      this.selectedStoreName = this.mallService.selectedStoreElement.name;
      this.specificAnalysisResultsAreas = this.mallService.specificAnalysisResultsAreas;

      this.mallService.fetchTopK(this.selectedMallElement.id)
      .subscribe(topStore => {
        this.topStores = topStore;
        this.isFetchingTopK = false;
        
      })

      this.mallService.fetchSpecificArea('month').subscribe(generalVisits => {
        this.generalVisits = generalVisits;
        this.isFetchingGeneralVisits = false;
        
      })
      this.mallService.fetchSpecificArea('week').subscribe(weekVisits => {
        this.weekVisits = weekVisits;
        this.isFetchingWeekVisits = false;
        
      })
      this.mallService.fetchSpecificArea('day').subscribe(dayVisits => {
        this.dayVisits = dayVisits;
        this.isFetchingDayVisits = false;
        
      })
      this.mallService.fetchSpecificArea('hour').subscribe(hourVisits => {
        this.hourVisits = hourVisits;
        this.isFetchingHourVisits = false;
        
      })
      
    })
  }


}
