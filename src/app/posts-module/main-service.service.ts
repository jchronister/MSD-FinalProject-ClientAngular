import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { tap} from 'rxjs/operators';
import { AccountState } from '../account-state';

import { IUser, IPosts, IServerObject, IComments } from '../app.types';

@Injectable({
  providedIn: 'root',
})
export class MainServiceService {
  url: string = '';

  constructor(private http: HttpClient, private state: AccountState) {
    this.url = this.state.getHost();
  }

  sendComment(id: string,comment: IComments): Observable<IServerObject> {
    return this.http.post<IServerObject>(
      this.url + `/api/v1/CS569FP/posts/${id}/comments`,
      comment
    );
  }

  // getRequests(type?: string): Observable<HttpResponse<IServerObject>> {
    // return this.http.get<HttpResponse<IServerObject>>(
  getRequests(type?: string): any {

    return this.http.get (this.url + '/api/v1/CS569FP/posts' + (type ? "/?" + type : ""),{observe: "response"})

  }

  getImages(type?: string): any {

    return this.http.get (this.url + '/images' + (type ? "/?" + type : ""), {observe: "response"})

  }

  flagImage (imageInfo: {_id: string, flagged: boolean}): Observable<IServerObject>{
    return this.http.put<IServerObject>(
      this.url + '/images/' + imageInfo._id, imageInfo
    );
  }

  deleteImage (_id: string): Observable<IServerObject>{
    return this.http.put<IServerObject>(
      this.url + '/images/' + _id, {deleted: new Date()}
    );
  } 

  // deleteImage (_id: string): Observable<IServerObject> {
  //   return this.http.put<IServerObject>(
  //     this.url + '/images/' + _id
  //   );
  // }

  postRequest (request: FormData): Observable<IServerObject> {
    return this.http.post<IServerObject>(
      this.url + '/images', request
    );
  }
  newHelpRequest(helpRequestPost: IPosts): Observable<IServerObject> {
    return this.http.post<IServerObject>(
      this.url + '/api/v1/CS569FP/posts/help-requests',
      helpRequestPost
    );
  }

  newServiceProvider(serviceProviderPost: IPosts): Observable<IServerObject> {
    return this.http.post<IServerObject>(
      this.url + '/api/v1/CS569FP/posts/service-providers',
      serviceProviderPost
    );
  }


  // Parse Header Links into Object
  parseLinkHeader(header: string): any {

    if (header.length === 0) return 

    return header.split(',').reduce((a: any, n) => {
      let section = n.split(';');
      return {...a, [section[1].replace(/rel="(.*)"/, '$1').trim()]: section[0].replace(/<(.*)>/, '$1').trim()}
    }, {})
    
  }  

}
