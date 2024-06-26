import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Category } from '../category/category.model';
import { Page } from '../../shared/model/response.model';
import { Topic } from './topic.model';
import { errorHandle } from '../../shared/service/service-support';

@Injectable()
export class TopicQueryService {
  http: HttpClient = inject(HttpClient);

  resourceName: string = "topics";
  resourcePath: string = "/api/v1/" + this.resourceName;
  url: string = "http://localhost:9006" + this.resourcePath;

  get(id: string): Observable<Topic> {
    return this.http.request<Topic>("GET",
      this.url + '/' + id
    ).pipe(map(event => event),retry(1), catchError(errorHandle));
  }

  getAll(): Observable<Page<Topic[]>> {
    return this.http.request<Page<Topic[]>>("GET",
      this.url
    ).pipe(retry(1), catchError(errorHandle));
  }
}
