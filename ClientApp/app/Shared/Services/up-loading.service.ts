import { Injectable } from '@angular/core';
import { HttpEventType, HttpClient, HttpEvent } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpLoadingService {
private progress = new BehaviorSubject<number>(0);
private url = new BehaviorSubject<string>('');


  constructor(private httpClient: HttpClient) { }

  public UploadImage(data: FormData) {
    this.httpClient.post<string>(`/api/image`, data, {reportProgress: true, observe: 'events'})
    .subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress.next(Math.round(event.loaded / event.total * 100));
          break;
        case HttpEventType.Response:
          this.url.next(event.body.value);
      }});
  }
  public GetProgress(): Observable<number> {
    return this.progress.asObservable();
  }
  public GetUrl(): Observable<string> {
    return this.url.asObservable();
  }
}




