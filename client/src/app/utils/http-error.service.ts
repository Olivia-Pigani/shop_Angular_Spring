import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  public formatError(err: HttpErrorResponse): string {
    return this.httpErrorFormatter(err);
  }

  private httpErrorFormatter(err: HttpErrorResponse): string {
    let errorMsg = '';

    if (err.error instanceof ErrorEvent) {
      errorMsg = `There is an error in client side : ${err.error.message}`;
    } else {
      errorMsg = `There is a server side error : ${err.status} code, ${err.statusText}`;
    }
    return errorMsg;
  }
}
