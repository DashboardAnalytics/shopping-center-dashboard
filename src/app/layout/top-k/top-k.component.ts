import { Component, OnInit, Input } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { MallService } from 'src/app/services/mall.service';
import { Store } from 'src/app/models/store.model';
@Component({
  selector: 'app-top-k',
  templateUrl: './top-k.component.html',
  styleUrls: ['./top-k.component.css']
})
export class TopKComponent implements OnInit {

  faDownload = faDownload;
  @Input() topStore: Store[];

  constructor(private mallService: MallService) { }

  ngOnInit() {
    
  }

}
