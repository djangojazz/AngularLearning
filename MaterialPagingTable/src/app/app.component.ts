import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { TestContainer } from './TestContainer';

import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';

import { TestService  } from "./test.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  displayedColumns = ['id', 'description'];
  dataSource: MatTableDataSource<TestContainer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private testService: TestService) {
    this.dataSource = new MatTableDataSource(this.testService.tests);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // ngOnInit() {
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  //   this.tests = this.testService.tests;
  //   this.dataSource.data = this.tests;

  //   merge(this.sort.sortChange, this.paginator.page, this.paginator.pageSize)
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         this.isLoadingResults = true;
  //         return this.testService.loadSlice(this.paginator.pageSize, this.paginator.pageIndex);
  //       }),
  //       map(data => {
  //         // Flip flag to show that loading has finished.
  //         this.isLoadingResults = false;
  //         this.isRateLimitReached = false;
  //         this.resultsLength = this.testService.tests.length;

  //         return data;
  //       }),
  //       catchError(() => {
  //         this.isLoadingResults = false;
  //         // Catch if the GitHub API has reached its rate limit. Return empty data.
  //         this.isRateLimitReached = true;
  //         return observableOf([]);
  //       })
  //     ).subscribe(data => this.dataSource.data = data);
  // }
}
