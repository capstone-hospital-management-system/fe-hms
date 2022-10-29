import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionService } from 'src/app/auth/services/session/session.service';

@Injectable()
export class HttpSessionInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.sessionService.getSession() || this.sessionService.getAccessToken()) {
      let headers = request.headers.set('Authorization', `Bearer ${this.sessionService.getAccessToken()}`);

      request = request.clone({
        headers: headers,
        body: request.body || {},
      });
    } else {
      request = request.clone({
        headers: request.headers.set('Authorization', ''),
        body: request.body || {},
      });
    }

    return next.handle(request);
  }
}
