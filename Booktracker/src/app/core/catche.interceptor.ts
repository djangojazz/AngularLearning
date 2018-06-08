import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse  } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import { HttpCacheService } from "app/core/http-cache.service"

//@Injectable()
// export class CacheInterceptor implements HttpInterceptor {
//     constructor(private cacheService: HttpCacheService) {}

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         // pass along non-cacheable requests

//         //attempt to retrieve a cached response

//         //return cached response

//         //send request to server and add response to cache
//     }
// }