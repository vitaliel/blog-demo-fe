import { environment } from '@env/environment';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { BadInput, Unprocessed, NotFoundError, AppError, AuthError } from '@app/shared/errors';
import { catchError } from 'rxjs/operators';
import { Helper } from '../helper';

export class ApiService {
  private _url: string[] = [];

  constructor(url: string, protected http: HttpClient) {
    this._url.push(environment.apiUrl);

    if (url) {
      this._url.push(url);
    }
  }

  protected getUrl(url?: string | string[], root: boolean = false): string {
    let clonedUrls = root ? [environment.apiUrl] : this._url.slice();

    if (url) {
      if (url instanceof Array) {
        clonedUrls = clonedUrls.concat(url);
      } else {
        clonedUrls.push(url);
      }
    }

    return clonedUrls.join('/');
  }

  protected handleError(error: HttpResponse<any>) {
    if (error.status === 400) {
      return throwError(new BadInput(error));
    }
    if (error.status === 401) {
      return throwError(new AuthError(error));
    }
    if (error.status === 422) {
      return throwError(new Unprocessed(error));
    }
    if (error.status === 404) {
      return throwError(new NotFoundError(error));
    }

    return throwError(new AppError(error));
  }

  protected get(url?: any);
  protected get<T>(url?: any): Observable<T>;
  protected get(url: string | string[], resource?: any);
  protected get<T>(url: string | string[], resource?: any): Observable<T>;
  protected get(url?, resource?): Observable<any> {
    return this.http.get(this.getUrl(url), { params: resource && Helper.asParams(resource) })
      .pipe(
        catchError(this.handleError)
      );
  }

  protected post(resource: any);
  protected post<T>(resource: any): Observable<T>;
  protected post(url: string | string[], resource: any, upload?: boolean);
  protected post<T>(url: string | string[], resource: any, upload?: boolean): Observable<T>;
  protected post(url, resource?, upload?): Observable<any> {
    if (resource === undefined) {
      resource = url;
      url = null;
    }

    const httpOptions = {};

    if (upload) {
      httpOptions['headers'] = new HttpHeaders({ 'X-Mustard-Upload': 'true' });
    }

    return this.http.post<any>(this.getUrl(url), resource, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  protected put(resource: any);
  protected put<T>(resource: any): Observable<T>;
  protected put(url: string | string[], resource: any, upload?: boolean);
  protected put<T>(url: string | string[], resource: any, upload?: boolean): Observable<T>;
  protected put(url, resource?, upload?): Observable<any> {
    if (resource === undefined) {
      resource = url;
      url = null;
    }

    const httpOptions = {};

    if (upload) {
      httpOptions['headers'] = new HttpHeaders({ 'X-Mustard-Upload': 'true' });
    }

    return this.http.put<any>(this.getUrl(url), resource, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  protected delete(resource: any);
  protected delete(url?: string | string[], resource?: any);
  protected delete(url?, resource?): Observable<any> {
    return this.http.delete(this.getUrl(url), { params: resource && Helper.asParams(resource) })
      .pipe(
        catchError(this.handleError)
      );
  }
}
