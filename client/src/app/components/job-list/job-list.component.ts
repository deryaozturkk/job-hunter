import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Job, JobService } from '../../services/job.service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {
  jobs: Job[] = []; // İşleri tutacağımız boş liste

  newJob: any = {
    company: '',
    position: '',
    platform: ''
  };
  isLoading: boolean = false;
  
  // Garsonu (Servisi) işe alıyoruz
  constructor(private jobService: JobService) {}

  // Component ekrana geldiği an çalışır
  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data; // Gelen veriyi listemize dolduruyoruz
        console.log('İşler geldi:', data); // Konsola da yazdıralım ki görelim
      },
      error: (err) => {
        console.error('Hata oluştu:', err);
      }
    });
  }
  addJob(): void {
    // Basit bir kontrol: Şirket adı boşsa işlem yapma
    if (!this.newJob.company || !this.newJob.position) {
      alert('Lütfen şirket ve pozisyon adını giriniz!');
      return;
    }

    this.isLoading = true;

    this.jobService.createJob(this.newJob).subscribe({
      next: (createdJob) => {
        // 1. Yeni işi listeye ekle (Ekran güncellensin)
        this.jobs.push(createdJob);
        
        // 2. Formu temizle
        this.newJob = { company: '', position: '', platform: '' };
        
        this.isLoading = false;
        console.log('Başarıyla eklendi:', createdJob);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Ekleme hatası:', err);
        alert('Ekleme sırasında hata oluştu!');
      }
    });
  }

  deleteJob(id: number): void {
    // Kullanıcıya soralım: Emin misin?
    if (confirm('Bu başvuruyu silmek istediğine emin misin?')) {
      
      this.jobService.deleteJob(id).subscribe({
        next: () => {
          // Başarılı olursa, o işi listeden filtreleyerek çıkar (Ekran anında güncellenir)
          this.jobs = this.jobs.filter(job => job.id !== id);
          console.log('Silme başarılı, ID:', id);
        },
        error: (err) => {
          console.error('Silme hatası:', err);
          alert('Silerken bir hata oluştu!');
        }
      });
    }
  }


}