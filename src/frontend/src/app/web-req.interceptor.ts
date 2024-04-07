import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  refreshingAccessToken!: Boolean;

  accessTokenRefreshed: Subject<void> = new Subject();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);
      
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401) {
          //unauthorised

          //refresh
          return this.refreshAccessToken().pipe(
            switchMap(() => {
              request = this.addAuthHeader(request);
              return next.handle(request);
            }),
            catchError((err: any) => {
              console.log(err);
              
              this.authService.logout();
              return EMPTY;
            })
          )
        } 
        return throwError(() => {
          error
        });
      })
    )
  }

  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          //run when access token refreshed
          observer.next();
          observer.complete();
        })
      })
    } else {
      this.refreshingAccessToken = true;
      return this.authService.getNewAccessToken().pipe(
        tap(() => {
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next();
          console.log('access token refreshed!');
        })
      )
    }
    
  }
  
  addAuthHeader(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();

    if (token) {
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return request;
  }
}
