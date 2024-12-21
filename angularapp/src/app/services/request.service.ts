import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../models/request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl =environment.apiUrl;

  constructor(private http: HttpClient) { }

  addRequest(userId: number, feedId: number, medicineId: number, livestockId: number,request: Request): Observable<Request> {
    console.log("url in serv " , `${this.apiUrl}/api/request/${userId}/${feedId}/${medicineId}/${livestockId}`, request);
    return this.http.post<Request>(`${this.apiUrl}/api/request/${userId}/${feedId}/${medicineId}/${livestockId}`, request);
  }

  getAllMyRequests(userId: number): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/api/request/supplier/view/${userId}`);
  }

  getRequestsByUserId(userId: number): Observable<Request[]> {
    console.log(`${this.apiUrl}/api/request/owner/view/${userId}`);
    return this.http.get<Request[]>(`${this.apiUrl}/api/request/owner/view/${userId}`);
  }

  updateRequest(requestId: number, updateRequest: Request): Observable<Request> {
    // console.log("url in serv " , `${this.apiUrl}/api/request/${requestId}`, updateRequest)
    return this.http.put<Request>(`${this.apiUrl}/api/request/${requestId}`, updateRequest);
  }
  statusUpdate(requestId: number, updateRequest: Request): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/api/request/status/${requestId}`, updateRequest);
  }

  deleteRequest(requestId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/request/${requestId}`);
  }
}
