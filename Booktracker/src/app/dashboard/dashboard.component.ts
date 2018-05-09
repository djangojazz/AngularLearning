import { Component, OnInit } from '@angular/core';

import { Book } from "app/models/book";
import { allBooks, allReaders } from 'app/data';
import { Reader } from "app/models/reader";
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[] = allBooks;
  allReaders: Reader[] = allReaders;
  mostPopularBook: Book = allBooks[0];

  constructor(private loggerService: LoggerService) { }

  ngOnInit() {
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
