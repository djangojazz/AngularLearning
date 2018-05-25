import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldbook';
import { DataService } from '../core/data.service';
import { LoggerService } from '../core/logger.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataservice: DataService,
              private loggerService: LoggerService) { }

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);
    this.dataservice.getBookById(bookID)
      .subscribe(
        (data: Book) => this.selectedBook = data,
        (err: any) => console.log(err)
      );

    this.dataservice.getOldBookById(bookID)
      .subscribe(
        (data: OldBook) => console.log(`Old book title: ${data.bookTitle}`)
      )
  }

  setMostPopular(): void {
    this.dataservice.setMostPopularBook(this.selectedBook);
    this.loggerService.log(`New most popular book: ${this.selectedBook.title}`);
  }

  saveChanges(): void {
    console.warn('Save changes to book not yet implemented.');
  }
}
