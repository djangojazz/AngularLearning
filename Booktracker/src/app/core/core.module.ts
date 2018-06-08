import { NgModule, SkipSelf, Optional, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS  } from "@angular/common/http";

import { LoggerService } from './logger.service';
import { DataService } from './data.service';
import { PlainLoggerService } from './plain-logger.service';
//import { dataServiceFactory } from './data.service.factory';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { BookTrackerErrorHandlerService } from './book-tracker-error-handler.service';
import { BooksResolverService } from './books-resolver.service';
import { AddHeaderIntercepter } from './add-header.interceptor'
import { LogResponseInterceptor } from 'app/core/log-response.interceptor';
import { HttpCacheService } from './http-cache.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    //BELOW ARE MORE COMPLEX EXAMPLES OF USING A 'USE CLASS' FOR SPECIFIC IMPLEMENTATION
    //  'USE VALUE' FOR SPECIFYING HOW TO DO EACH MEMBER EXPLICITY
    //  'USE FACTORY' FOR ESTABLISHING A FACTORY PATTERN AND 'DEPS' FOR DEPENDENCY ARRAY OF OBJECTS THAT IMPLEMENT IT.
    // { provide: LoggerService, useClass: PlainLoggerService }, 
    // { provide: LoggerService, useValue: {
    //   log: (message) => console.log(`MESSAGE: ${message}`),
    //   error: (message) => console.log(`PROBLEM: ${message}`),
    // } }, 
    // { provide: DataService, useFactory: dataServiceFactory, deps: [LoggerService]}
    LoggerService,
    DataService,
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService },
    BooksResolverService,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderIntercepter, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true}, 
    HttpCacheService
  ],
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
