import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerService } from './logger.service';
import { DataService } from './data.service';
import { PlainLoggerService } from './plain-logger.service';
//import { dataServiceFactory } from './data.service.factory';
import { throwIfAlreadyLoaded } from './module-import-guard';

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
    DataService
  ],
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

}
