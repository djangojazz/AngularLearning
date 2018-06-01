import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable  } from "rxjs/Rx";
import { catchError  } from "rxjs/operators";
import { of  } from "rxjs/observable/of";

import { Book } from "app/models/book";
import { DataService } from '../core/data.service';
import { BookTrackerError } from '../models/bookTrackerError';

@Injectable()
export class BooksResolverService implements Resolve<Book[] | BookTrackerError> {
    constructor(private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[] | BookTrackerError> {
        return this.dataService.getAllBooks()
            .pipe(
                catchError(err => of(err))
            );
    }
}