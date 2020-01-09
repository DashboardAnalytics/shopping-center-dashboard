import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store } from '../models/store.model';
import { Mall } from '../models/mall.model';
import { GeneralVisits } from '../models/generalVisits.model';
import { SpecificSection } from '../models/specificSection.model';

@Injectable({ providedIn: 'root' })
export class MallService {

    selectedMallElement: Mall;
    selectedMallEvent = new EventEmitter<Mall>();
    selectedStoreElement: Store;
    selectedStoreEvent = new EventEmitter<Store>();

    malls: Mall[];
    stores: Store[];
    topStores: Store[];
    generalVisits: GeneralVisits;

    specificAnalysisResultsAreas: SpecificSection[] = [
        { id: 1, name: 'Conversión', url: 'conversion' },
        { id: 2, name: 'Permanencia', url: 'permanencia' },
        { id: 3, name: 'Segmentación', url: 'segmentacion' },
        { id: 4, name: 'Satisfacción', url: 'satisfaccion' }
    ];

    constructor(private http: HttpClient) { }

    fetchMalls() {
        return this.http
            .get<{ [key: string]: Mall }>('http://35.193.208.246:3000/shopping/data')
            .pipe(map(responseData => {
                const mallsArray: Mall[] = [];
                for (const key in responseData.data) {
                    const mall: Mall = {
                        ...responseData.data[key]
                    }
                    mallsArray.push(mall);
                }
                this.malls = mallsArray;
                //console.log(this.malls);
                return mallsArray;
            }));
    }

    fetchMallStores(mallId: number) {
        return this.http
            .get<{ [key: string]: Store }>('http://35.193.208.246:3000/shopping/store?shopping_id='+mallId)
            .pipe(map(responseData => {
                const storesArray: Store[] = [];
                for (const key in responseData.data) {
                    const store: Mall = {
                        ...responseData.data[key]
                    }
                    storesArray.push(store);
                }
                this.stores = storesArray;
                //console.log(this.stores);
                return storesArray;
            }));
    }

    fetchTopK(shopping_id: number) {
        return this.http
            .get<{ [key: string]: Store }>('http://35.193.208.246:3000/shopping/top?shopping_id=' + shopping_id + '&top_limit=6')
            .pipe(map(responseData => {
                const topStoresArray: Store[] = [];
                for (const key in responseData.data) {
                    const store: Store = {
                        ...responseData.data[key]
                    }
                    console.log(responseData.data[key]);
                    topStoresArray.push(store);
                    
                }
                this.topStores = topStoresArray;
                //console.log(responseData);
                return topStoresArray;
            }));
    }

    fetchSpecificArea(areaName: string) {
        return this.http
            .get<{ [key: string]: GeneralVisits }>('http://35.193.208.246:3000/results/store/'+areaName+'?shopping_id='+this.selectedMallElement.id+'&store_id='+this.selectedStoreElement.id)
            .pipe(map(responseData => {
                const generalVisitsArray: GeneralVisits = { dates: [], visits: [] };
                for (const key in responseData.data) {
                    generalVisitsArray.dates.push(responseData.data[key]['date']);
                    generalVisitsArray.visits.push(responseData.data[key]['visitors']);
                    //console.log(responseData.data[key]['date']+'->'+responseData.data[key]['visitors']);
                }
                if (areaName === 'month') {
                    this.generalVisits = {dates: generalVisitsArray.dates.slice(0,15), visits: generalVisitsArray.visits.slice(0,15)};
                }else{
                    this.generalVisits = {dates: generalVisitsArray.dates.slice(0,7), visits: generalVisitsArray.visits.slice(0,7)};
                }
                
                return this.generalVisits;
            }));
    }

    setSelectedMall(mallName: string) {
        this.malls.forEach(mallElement => {
            if (mallElement['name'] === mallName) {
                this.selectedMallEvent.emit(mallElement);
                this.selectedMallElement = mallElement;
            }
        });
        console.log('The selected Mall is: \'' + this.selectedMallElement.name + '\'');
    }
    setSelectedStore(storeName: string) {
        this.stores.forEach(storeElement => {
            if (storeElement['name'] === storeName) {
                this.selectedStoreEvent.emit(storeElement);
                this.selectedStoreElement = storeElement;
            }
        });
        console.log('The selected Store is: \'' + this.selectedStoreElement.name + '\'');
    }
}