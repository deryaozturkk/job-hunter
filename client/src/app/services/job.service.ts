import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  id: number;
  company: string;
  position: string;
  status: string;
  platform: string;
  applicationDate: Date;
  url?:string;
  note?: string;
}

export interface JobStats {
  status: string;
  count: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:3000/jobs';

  constructor(private http: HttpClient) { }

// Ortak Header Helper Metodu
private getHeaders() {
  const token = localStorage.getItem('job_hunter_token'); 
  return new HttpHeaders({
    'Authorization': `Bearer ${token}` 
  });
}

getJobs(): Observable<Job[]> {
  return this.http.get<Job[]>(this.apiUrl, { headers: this.getHeaders() }); 
}

createJob(job: any): Observable<Job> {
  return this.http.post<Job>(this.apiUrl, job, { headers: this.getHeaders() }); 
}

deleteJob(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }); 
}

updateJob(id: number, job: Partial<Job>): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${id}`, job, { headers: this.getHeaders() });
}

getJobStats(): Observable<JobStats[]> {
  return this.http.get<JobStats[]>(`${this.apiUrl}/stats`, { headers: this.getHeaders() }); 
}
}