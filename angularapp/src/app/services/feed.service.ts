import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feed } from '../models/feed.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  userId: number;
  constructor(private http: HttpClient) { }
  public apiUrl = environment.apiUrl;

  addFeed(requestObject: FormData): Observable<Feed> {
    this.userId = parseInt(localStorage.getItem('userId'))
    return this.http.post<Feed>(`${this.apiUrl}/api/feed/${this.userId}`, requestObject);
  }

  getFeedByUserID(id: number): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${this.apiUrl}/api/feed/user/${id}`);
  }

  getFeedById(id: string): Observable<Feed> {
    return this.http.get<Feed>(`${this.apiUrl}/api/feed/${id}`);
  }

  getAllFeed(): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${this.apiUrl}/api/feed`);
  }

  deleteFeed(feedId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/feed/${feedId}`);
  }

  updateFeed(id: string, requestObject: FormData, userId: number): Observable<Feed> {
    return this.http.put<Feed>(`${this.apiUrl}/api/feed/${id}/${userId}`, requestObject);
  }
  searchfilter(search: string): Observable<Feed[]> {
    // this.userId=parseInt(localStorage.getItem('userId'));
    console.log(localStorage.getItem('userId'));
    return this.http.get<Feed[]>(`${this.apiUrl}/api/feed/user/${+localStorage.getItem('userId')}`).pipe((map(feeds =>
      feeds.filter(feed => (
        (feed.feedName.toLowerCase().includes(search.toLowerCase())) || (feed.description.toLowerCase().includes(search.toLowerCase())) || (feed.type.toLowerCase().includes(search.toLowerCase())))))))
  }
  searchfilterForOwner(search: string): Observable<Feed[]> {
    // this.userId=parseInt(localStorage.getItem('userId'));
    console.log(localStorage.getItem('userId'));
    return this.http.get<Feed[]>(`${this.apiUrl}/api/feed`).pipe((map(feeds =>
      feeds.filter(feed => (
        (feed.feedName.toLowerCase().includes(search.toLowerCase())) || (feed.description.toLowerCase().includes(search.toLowerCase())) || (feed.type.toLowerCase().includes(search.toLowerCase())))))))
  }
  getImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/image/${id}`, { responseType: 'blob' });
  }
}
