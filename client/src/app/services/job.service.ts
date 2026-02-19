import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  createJob(job: any): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }
  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.patch<Job>(`${this.apiUrl}/${id}`, job);
  }
  getJobStats(): Observable<JobStats[]> {
    return this.http.get<JobStats[]>(this.apiUrl + '/stats');
  }
}