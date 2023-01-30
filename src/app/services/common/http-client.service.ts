import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(
    private httpClient: HttpClient,
    @Inject('baseUrl') private baseUrl: string
  ) {}

  private url(requestParameter: Partial<RequestParameters>): string {
    return `${
      requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl
    }/${requestParameter.controller}${
      requestParameter.action ? `/${requestParameter.action}` : ''
    }`;
  }

  get<T>(request: Partial<RequestParameters>, id?: string): Observable<T> {
    let url: string = '';
    if (request.fullEndPoint) url = request.fullEndPoint;
    else
      url = `${this.url(request)}${id ? `/${id}` : ''}${
        request.queryString ? `?${request.queryString}` : ''
      }`;
    return this.httpClient.get<T>(url, { headers: request.headers });
  }
  post<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Observable<T> {
    let url: string = '';
    if (requestParameter.fullEndPoint) url = requestParameter.fullEndPoint;
    else url = `${this.url(requestParameter)}`;
    url = `${this.url(requestParameter)}${
      requestParameter.queryString ? `?${requestParameter.queryString}` : ''
    }`;

    return this.httpClient.post<T>(url, body, {
      headers: requestParameter.headers,
    });
  }

  put<T>(request: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    let url: string = '';
    if (request.fullEndPoint) url = request.fullEndPoint;
    else url = `${this.url(request)}`;

    return this.httpClient.put<T>(url, body, { headers: request.headers });
  }

  delete<T>(request: Partial<RequestParameters>, id: string): Observable<T> {
    let url: string = '';

    if (request.fullEndPoint) url = request.fullEndPoint;
    url = `${this.url(request)}${id ? `/${id}` : ''}${
      request.queryString ? `?${request.queryString}` : ''
    }`;
    debugger
    return this.httpClient.delete<T>(url, { headers: request.headers });
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
  queryString?: string;
}
