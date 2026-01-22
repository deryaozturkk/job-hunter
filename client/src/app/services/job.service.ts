import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Backend'den gelen veri tipini tanımlayalım
export interface Job {
  id: number;
  company: string;
  position: string;
  status: string;
  platform: string;
  applicationDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  // Backend Adresimiz (NestJS Portu)
  private apiUrl = 'http://localhost:3000/jobs';

  constructor(private http: HttpClient) { }

  // Tüm işleri getir
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  // Yeni iş ekle
  createJob(job: any): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }
  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}