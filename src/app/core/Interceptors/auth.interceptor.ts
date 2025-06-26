import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse , HttpClient} from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/storage/local-storage.service';
import { from, switchMap, catchError, BehaviorSubject, filter, take, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(LocalStorageService);
  const http = inject(HttpClient);
  const router = inject(Router);
  const excludedUrls = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/refresh-token', // Corrected to match your backend endpoint
  ];

  // State to manage concurrent refresh attempts
  let isRefreshing = false;
  const refreshTokenSubject = new BehaviorSubject<string | null>(null);

  // Check if the request URL matches any excluded URL
  const shouldSkip = excludedUrls.some(url => req.url.endsWith(url));

  return from(storage.get('User')).pipe(
    switchMap(user => {
      // Add token to headers if user exists and URL is not excluded
      let modifiedReq = req;
      if (user && !shouldSkip) {
        modifiedReq = req.clone({ setHeaders: { Authorization: `Bearer ${user.token}` } });
      }

      return next(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle 401 (or temporarily 403) errors
          if ((error.status === 401 || error.status === 403) && !shouldSkip && user) {
            return handle401Error(modifiedReq, next, user, storage, http, router, refreshTokenSubject);
          }
          return throwError(() => error);
        })
      );
    })
  );

  function handle401Error(
    request: HttpRequest<any>,
    next: HttpHandlerFn,
    user: any,
    storage: LocalStorageService,
    http: HttpClient,
    router: Router,
    refreshTokenSubject: BehaviorSubject<string | null>
  ) {
    console.log("handle error 401 function.")
    if (!isRefreshing) {
      isRefreshing = true;
      refreshTokenSubject.next(null);
      return http.post<{ token: string }>('http://localhost:8080/api/auth/refresh-token', {}, { withCredentials: true })
        .pipe(
          switchMap((response) => {
            isRefreshing = false;
            const newToken = response.token;
            // Update user token in storage
            user.token = newToken;
            storage.set('User', user);
            refreshTokenSubject.next(newToken);
            console.log("sending the new token after doing refresh token", user)
            // Retry the original request with the new token
            const retryReq = request.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
            return next(retryReq);
          }),
          catchError((refreshError) => {

            isRefreshing = false;
            // Refresh failed, clear user and redirect to login
            storage.remove('User');
            router.navigate(['/Auth/login']);
            return throwError(() => refreshError);
          })
        );
    } else {
      // Wait for refresh to complete and retry with new token
      return refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          const retryReq = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
          return next(retryReq);
        })
      );
    }
  }
};

