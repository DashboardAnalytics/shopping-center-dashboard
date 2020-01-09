import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { GeneralVisits } from 'src/app/models/generalVisits.model';
import { MallService } from 'src/app/services/mall.service';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input()generalVisits: GeneralVisits;

  @Input() title: string;
  selectedStoreName: string;
  barChartOptions: ChartOptions;
  @Input() barChartLabels: Label[];
  barChartType: ChartType;
  barChartLegend: boolean;
  barChartPlugins;
  barChartData: ChartDataSets[];

  constructor(private mallService: MallService) { }

  ngOnInit() {
    this.selectedStoreName = this.mallService.selectedStoreElement.name;
    this.barChartOptions = {
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: true
          }
        }]
      },
      legend: {
        display: false
      },
    };

    this.barChartLabels = this.generalVisits['dates'];
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartPlugins = [];
    this.barChartData = [
      {
        label: "Número de visitas",
        data: this.generalVisits['visits'],
        fill: false,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
        hoverBackgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
        borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
        hoverBorderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
        borderWidth: 1





      },
    ];

  }

}
