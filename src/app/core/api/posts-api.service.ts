import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
// import { ApiService } from '@app/core/api';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService extends ApiService {
  constructor(http: HttpClient) {
    super('posts', http);
  }

  index():any {
    return this.get(null);
  }

  create(content: string) {
    return this.post({content});
  }
}
