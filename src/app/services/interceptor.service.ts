import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { DrinksDataService } from './drinks-data.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  constructor(private drinkSrc: DrinksDataService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.drinkSrc.showLoader(true);
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.drinkSrc.showLoader(false);
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            this.drinkSrc.showLoader(false);
          }
        }
      )
    );
  }
}
