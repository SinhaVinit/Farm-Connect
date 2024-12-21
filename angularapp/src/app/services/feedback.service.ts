import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  public apiUrl=environment.apiUrl;
  userId=localStorage.getItem('userId')
  constructor(private http:HttpClient) { }


  addFeedback(feedback: Feedback):Observable<Feedback>{
    return this.http.post<Feedback>(this.apiUrl+"/api/feedback/"+this.userId,feedback);
  }

  getAllFeedbacksByUserId(userId: number):Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback/user/${userId}`);
  }

  deleteFeedback(feedbackId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/api/feedback/${feedbackId}`);
  }

  getFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback`);
  }

  updateFeedback(feedbackId:number, updatedFeedback:Feedback): Observable<Feedback>{
    return this.http.put<Feedback>(`${this.apiUrl}/api/feedback/${feedbackId}`,updatedFeedback);
}

}
