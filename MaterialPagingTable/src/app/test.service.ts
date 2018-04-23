import { Injectable } from '@angular/core';
import { TestContainer } from './TestContainer';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class TestService {
    public tests: TestContainer[] = [];
    constructor() { 
        this.tests = this.loadCategoriesStatic();
    }

    public loadCategoriesStatic(): TestContainer[] {
    return [
        {id: 1, description: 'Hydrogen'},
        {id: 2, description: 'Helium'},
        {id: 3, description: 'Lithium'},
        {id: 4, description: 'Beryllium'},
        {id: 5, description: 'Boron'},
        {id: 6, description: 'Carbon'},
        {id: 7, description: 'Nitrogen'},
        {id: 8, description: 'Oxygen'},
        {id: 9, description: 'Fluorine'},
        {id: 10, description: 'Neon'},
        {id: 11, description: 'Sodium'},
        {id: 12, description: 'Magnesium'},
        {id: 13, description: 'Aluminum'},
        {id: 14, description: 'Silicon'},
        {id: 15, description: 'Phosphorus'},
        {id: 16, description: 'Sulfur'},
        {id: 17, description: 'Chlorine'},
        {id: 18, description: 'Argon'},
        {id: 19, description: 'Potassium'},
        {id: 20, description: 'Calcium'},
      ];
    }

    public loadSlice(size: number, sort: string, order: string, page: number): Observable<TestContainer[]> {
        var sz = (size == undefined) ? 5 : size;
        var start = (sz * (page));
        var end = start + sz;

        var listing = this.tests.slice(start, end);
        return Observable.of(listing);
    }
}
