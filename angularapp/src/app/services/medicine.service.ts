import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicine } from '../models/medicine.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private baseUrl = `${environment.apiUrl}/api/medicine`;

  constructor(private http: HttpClient) {}

  // getTokenToSend() {
  //   const token = localStorage.getItem('Token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const options = {headers: headers};
  //   return options;
  // }

  addMedicine(requestObject: FormData): Observable<Medicine> {
    // return this.http.post<Medicine>(this.baseUrl, requestObject, this.getTokenToSend());
    let userId:number = parseInt(localStorage.getItem("userId"))
    return this.http.post<Medicine>(`${this.baseUrl}/${userId}`, requestObject);
  }

  getMedicineByUserID(id: number): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.baseUrl}/user/${id}`);
  }

  getMedicineById(id: string): Observable<Medicine> {
    return this.http.get<Medicine>(`${this.baseUrl}/${id}`);
  }

  getAllMedicine(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.baseUrl);
  }

  deleteMedicine(medicineId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${medicineId}`);
  }

  updateMedicine(id: string, requestObject: FormData, userId:number): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.baseUrl}/${id}/${userId}`, requestObject);
  }

  searchMedicine(query:string): Observable<Medicine[]> {
    let userId = +localStorage.getItem('userId');
    return this.http.get<Medicine[]>(`${this.baseUrl}/user/${userId}`).pipe((map(medicines=>medicines.filter(medicine=>medicine.medicineName.toLowerCase().includes(query.toLowerCase())))));
  }
  searchMedicineForOwner(query:string): Observable<Medicine[]> {
    let userId = +localStorage.getItem('userId');
    return this.http.get<Medicine[]>(`${this.baseUrl}`).pipe((map(medicines=>medicines.filter(medicine=>medicine.medicineName.toLowerCase().includes(query.toLowerCase())))));
  }

  getImage(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/image/${id}`, { responseType: 'blob' });
  }
}
