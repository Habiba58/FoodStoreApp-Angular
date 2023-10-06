import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingManagerService } from '../services/loading-manager.service';
let pendingRequests: number = 0;
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingManager: LoadingManagerService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingManager.showLoading();
    pendingRequests = pendingRequests + 1;
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            this.handleHideLoading();
          }
        },
        error: (_) => {
          this.handleHideLoading();
        },
      })
    );
  }
  handleHideLoading() {
    pendingRequests = pendingRequests - 1;
    if (pendingRequests === 0) {
      this.loadingManager.hideLoading();
    }
  }
}
