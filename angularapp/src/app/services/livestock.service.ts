import { Injectable } from '@angular/core';
import { Livestock } from '../models/livestock.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivestockService {
  public apiUrl:string = environment.apiUrl;

  userId:number = +localStorage.getItem('userId');

  constructor(private http:HttpClient) { }

  public getLivestockByUserID(id:number):Observable<Livestock[]>{
    return this.http.get<Livestock[]>(`${this.apiUrl}/api/livestock/user/${id}`);
  }
  public getLivestockAll():Observable<Livestock[]>{//
    return this.http.get<Livestock[]>(`${this.apiUrl}/api/livestock`);//
  }//

  public getLivestockByID(id:number):Observable<Livestock>{
    return this.http.get<Livestock>(`${this.apiUrl}/api/livestock/${id}`);
  }
  public addLivestock(livestock:Livestock):Observable<Livestock>{
    return this.http.post<Livestock>(`${this.apiUrl}/api/livestock/${this.userId}`,livestock);
  }
  public updateLivestock(id:number,livestock:Livestock):Observable<Livestock>{
    return this.http.put<Livestock>(`${this.apiUrl}/api/livestock/${id}/${this.userId}`,livestock);
  }
  public deleteLivestock(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/api/livestock/${id}`);
  }

  searchfilter(search:string):Observable<Livestock[]>{
    return this.http.get<Livestock[]>(`${this.apiUrl}/api/livestock/user/${+localStorage.getItem('userId')}`).pipe((map(livestocks=>
    livestocks.filter(livestock=>(
    (livestock.name.toLowerCase().includes(search.toLowerCase()))||(livestock.species.toLowerCase().includes(search.toLowerCase()))||(livestock.breed.toLowerCase().includes(search.toLowerCase())))))))
  }

}