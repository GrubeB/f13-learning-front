import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, take } from 'rxjs/operators';
import { errorHandle } from '../../shared/service/service-support';
import { Reference } from '../reference/reference.model';
import { CreateCommentCommand, UpdateCommentCommand } from './comment.model';
import { AbstractCommentService } from './abstract-comment.service';
import { AuthenticationService } from '../../auth/authentication.service';

@Injectable()
export class GroupCommentService extends AbstractCommentService {
  http: HttpClient = inject(HttpClient);

  resourceName: string = "comments";
  resourcePath: string = "/api/v1/groups/:groupId/" + this.resourceName;
  url: string = "http://localhost:9006" + this.resourcePath;

  create(groupId: string, data: CreateCommentCommand): Observable<Reference> {
    return this.http.request<Reference>("POST",
      this.url.replace(":groupId", groupId),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
        observe: 'body',
        responseType: "json",
      }
    ).pipe(catchError(errorHandle));
  }
  createRepley(groupId: string, parentCommentId: string, data: CreateCommentCommand): Observable<Reference> {
    return this.http.request<Reference>("POST",
      this.url.replace(":groupId", groupId) + "/" + parentCommentId + "/comments",
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
        observe: 'body',
        responseType: "json",
      }
    ).pipe(catchError(errorHandle));
  }

  update(groupId: string, data: UpdateCommentCommand): Observable<HttpEvent<any>> {
    return this.http.request<any>("PUT",
      this.url.replace(":groupId", groupId) + '/' + data.commentId,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(data),
        observe: 'body',
        responseType: "json",
      }
    ).pipe(retry(1), catchError(errorHandle));
  }

  delete(groupId: string, id: string): Observable<HttpEvent<any>> {
    return this.http.request<any>("DELETE",
    this.url.replace(":groupId", groupId) + '/' + id,
    ).pipe(retry(1), catchError(errorHandle));
  }
}
