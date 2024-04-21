import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject, catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

/**
 * 
 * This interceptor checks the validity of the access token and is also responsible for initiating the refresh process.
 * This web request interceptor implements HttpInterceptor.
 * 
 */
export class WebReqInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  refreshingAccessToken!: Boolean;

  accessTokenRefreshed: Subject<void> = new Subject();

  /**
   * Intercepts outgoing HTTP requests and attaches UserId and access token to the header.
   * @param request Outgoing HTTP request
   * @param next HttpHandler
   * @returns request
   */
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

  /**
   * Checks if an ongoing access token refresh is taking place and starts one if not.
   * @returns Access Token
   */
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
  
  /**
   * Adds headers to the request.
   * @param request Outgoing request
   * @returns request
   */
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
