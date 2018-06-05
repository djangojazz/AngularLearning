import { Component, OnInit } from '@angular/core';
import { Observable  } from "rxjs/Rx";
import { Title, VERSION } from "@angular/platform-browser";

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { LoggerService } from '../core/logger.service';
import { DataService } from '../core/data.service';
import { BookTrackerError } from '../models/bookTrackerError';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private loggerService: LoggerService,
              private dataService: DataService,
              private title: Title,
              private route: ActivatedRoute) { 
                //this.loggerService.log('Creating the dashboard.');
              }

  ngOnInit() {
    let resolvedData: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks'];

    if(resolvedData instanceof BookTrackerError) {
      console.log(`Dashboard component error: ${resolvedData.friendlyMessage}`);
    }
    else {
      this.allBooks = resolvedData;
    }

    this.dataService.getAllReaders()
      .subscribe(
        (data: Reader[]) => this.allReaders = data,
        (err: BookTrackerError) => console.log(err.friendlyMessage)
        //() => this.loggerService.log('All done getting readers!')
      );
    this.mostPopularBook = this.dataService.mostPopularBook;

    // this.getAuthorRecommendationAsync(1)
    //   .catch(err => this.loggerService.error(err));

    this.title.setTitle(`Book Tracker ${VERSION.full}`);

    //this.loggerService.log('Done with dashboard initialization.');

    //throw new Error('Ugly technical error');
  }

  private async getAuthorRecommendationAsync(readerID: number): Promise<void> {
      let author: string = await this.dataService.getAuthorRecomendation(readerID);
      this.loggerService.log(author);
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID)
      .subscribe(
        (data: void) => {
          let index: number = this.allBooks.findIndex(book => book.bookID === bookID);
          this.allBooks.splice(index, 1);
        },
        (err: any) => console.log(err)
      );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
