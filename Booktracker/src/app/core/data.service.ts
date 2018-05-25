import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { map, tap } from "rxjs/operators";

import { allBooks, allReaders } from 'app/data';
import { LoggerService  } from "./logger.service";
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { OldBook } from 'app/models/oldbook';
import { BookTrackerError  } from "app/models/bookTrackerError";

@Injectable()
export class DataService {

  
  constructor(private loggerService: LoggerService,
              private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  getAuthorRecomendation(readerID: number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(readerID > 0 ) {
          resolve('Dr. Seuss');
        }
        else {
          reject('Invalid reader ID');
        }
      }, 2000);
    });
  }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[] | BookTrackerError> {
    return this.http.get<Reader[]>('/api/readers')
      .catch(this.handleError);
  }

  handleError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return Observable.throw(dataError);
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    console.log("Getting all books from the dashboard")
    return this.http.get<Book[]>('/api/books');
  }

  getBookById(id: number): Observable<Book> {
    
    return this.http.get<Book>(`api/books/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`api/books/${id}`)
      .pipe(
        map(b => <OldBook> {
          bookTitle: b.title,
          year: b.publicationYear
        }),
        tap(classicBook => console.log(classicBook))
      );
  }
}
