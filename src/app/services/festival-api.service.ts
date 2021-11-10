import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Festival } from '../shared/models';
import { environment } from '../../environments/environment';

@Injectable()
export class FestivalAPIService {
  readonly API_FESTIVALS = `
  ${environment.apiUrl}/${environment.apiVersion}/festivals`;

  constructor(private httpClient: HttpClient) {}

  getFestivals(): Observable<Festival[]> {
    return this.httpClient.get<Festival[]>(this.API_FESTIVALS,
      { headers: this.headers() }
    )
  }

  headers = () => {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Cache-Control', 'no-store');
    headers.append('Pragma', 'no-cache');
    return headers;
  }
}
