import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Job, JobService } from '../../services/job.service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {
  jobs: Job[] = []; // İşleri tutacağımız liste

  // Form verisi
  newJob: any = {
    company: '',
    position: '',
    platform: ''
  };
  
  isLoading: boolean = false;

  // 👇 GÜNCELLEME İÇİN GEREKLİ DEĞİŞKENLER
  isEditing: boolean = false;       // Şu an düzenleme modunda mıyız?
  currentJobId: number | null = null; // Düzenlenen işin ID'si ne?

  // Şu an hangi filtre seçili? (Varsayılan: HEPSİ)
  filterStatus: string = 'ALL';
  
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        console.log('İşler geldi:', data);
      },
      error: (err) => console.error('Hata oluştu:', err)
    });
  }

  get filteredJobs() {
    // Eğer 'Tümü' seçiliyse hepsini göster
    if (this.filterStatus === 'ALL') {
      return this.jobs;
    }
    // Değilse, sadece statüsü eşleşenleri göster (Örn: Sadece 'Mülakat' olanlar)
    return this.jobs.filter(job => job.status === this.filterStatus);
  }

  // 👇 YENİ: Listeden "Düzenle" butonuna basınca çalışacak
  onEdit(job: Job): void {
    this.isEditing = true;       // Modu güncelleme yap
    this.currentJobId = job.id;  // ID'yi hafızaya al
    
    // Formu seçilen işin bilgileriyle doldur
    // (...job diyerek kopyasını alıyoruz ki listedeki veri hemen bozulmasın)
    this.newJob = { ...job };
  }

  // 👇 GÜNCELLENDİ: Hem Ekleme hem Güncelleme yapar
  addJob(): void {
    // 1. Basit kontrol
    if (!this.newJob.company || !this.newJob.position) {
      alert('Lütfen şirket ve pozisyon adını giriniz!');
      return;
    }

    this.isLoading = true;

    // A) Eğer DÜZENLEME modundaysak:
    if (this.isEditing && this.currentJobId) {
      this.jobService.updateJob(this.currentJobId, this.newJob).subscribe({
        next: (updatedJob) => {
          console.log('Güncelleme başarılı:', updatedJob);
          
          // Listeyi backend'den tekrar çekmek yerine, eldeki listede güncelleyelim (Daha hızlı görünür)
          const index = this.jobs.findIndex(j => j.id === updatedJob.id);
          if (index !== -1) {
            this.jobs[index] = updatedJob;
          }
          
          this.resetForm(); // Formu temizle ve moddan çık
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Güncelleme hatası:', err);
          this.isLoading = false;
          alert('Güncelleme başarısız oldu.');
        }
      });
    } 
    // B) Eğer YENİ EKLEME modundaysak:
    else {
      this.jobService.createJob(this.newJob).subscribe({
        next: (createdJob) => {
          this.jobs.push(createdJob); // Listeye ekle
          this.resetForm(); // Formu temizle
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
  }

  deleteJob(id: number): void {
    if (confirm('Bu başvuruyu silmek istediğine emin misin?')) {
      this.jobService.deleteJob(id).subscribe({
        next: () => {
          this.jobs = this.jobs.filter(job => job.id !== id);
          console.log('Silme başarılı, ID:', id);
          
          // Eğer sildiğimiz iş o an düzenlediğimiz iş ise formu da temizleyelim
          if (this.currentJobId === id) {
            this.resetForm();
          }
        },
        error: (err) => {
          console.error('Silme hatası:', err);
          alert('Silerken bir hata oluştu!');
        }
      });
    }
  }

  // 👇 YENİ: Formu temizleme ve moddan çıkma fonksiyonu
  resetForm(): void {
    this.newJob = { company: '', position: '', platform: '' };
    this.isEditing = false;
    this.currentJobId = null;
  }
}