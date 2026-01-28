import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; // Formlar için şart
import { RouterModule } from '@angular/router';
import { Job, JobService } from '../../services/job.service'; 
import Swal from 'sweetalert2';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Modules buraya
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  
  jobs: Job[] = []; // Ana liste
  
  // Form verisi
  newJob: any = {
    company: '',
    position: '',
    platform: '',
    status: 'Başvuruldu', // Varsayılan değer
    applicationDate: new Date() // Varsayılan bugün
  };
  
  isLoading: boolean = false;
  isEditing: boolean = false;
  currentJobId: number | null = null;
  filterStatus: string = 'ALL';
  searchTerm: string = '';
  todayDate: string = new Date().toISOString().split('T')[0];

  // Tasarım için: Form açık mı kapalı mı?
  showForm: boolean = false; 

  constructor(private jobService: JobService) {}

  // Toast Ayarı (Sağ üst köşede çıkan bildirim)
  
  ngOnInit(): void {
    this.loadJobs();
  }

  // İşleri Getir ve TARİHE GÖRE SIRALA
  loadJobs(): void {
    this.isLoading = true;
    this.jobService.getJobs().subscribe({
      next: (data) => {
        // En yeni tarih en üstte olsun
        this.jobs = data.sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime());
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Hata:', err);
        this.isLoading = false;
      }
    });
  }

  // Filtreleme Mantığı 
  get filteredJobs() {
    // 1. Adım: Statü Filtresi
    let result = this.filterStatus === 'ALL'
      ? this.jobs
      : this.jobs.filter(job => job.status === this.filterStatus);

    // 2. Adım: Arama Filtresi (Eğer arama kutusuna bir şey yazıldıysa)
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase(); // Küçük harfe çevir ki büyük/küçük duyarlı olmasın
      
      result = result.filter(job => 
        job.company.toLowerCase().includes(term) || // Şirket adında ara
        job.position.toLowerCase().includes(term) || // Pozisyonda ara
        job.platform.toLowerCase().includes(term)    // Platformda ara
      );
    }

    return result;
  }

  // Formu Aç/Kapa
  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm(); // Kapatırsa formu temizle
  }

  // Düzenleme Moduna Geç
  onEdit(job: Job): void {
    this.showForm = true; // Formu aç
    this.isEditing = true;
    this.currentJobId = job.id;
    this.newJob = { ...job }; // Verileri kopyala
    
    // Sayfanın en üstüne (forma) kaydır
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Kaydet (Hem Ekleme Hem Güncelleme)
  saveJob(): void {
    // 1. VALIDATION (Uyarı)
    if (!this.newJob.company || !this.newJob.position || !this.newJob.applicationDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Eksik Bilgi',
        text: 'Lütfen Şirket, Pozisyon ve Tarih alanlarını doldurunuz!',
        confirmButtonText: 'Tamam',
        confirmButtonColor: '#5e72e4'
      });
      return;
    }
  
    this.isLoading = true;
  
    if (this.isEditing && this.currentJobId) {
      // GÜNCELLEME
      this.jobService.updateJob(this.currentJobId, this.newJob).subscribe({
        next: (updatedJob) => {
          const index = this.jobs.findIndex(j => j.id === updatedJob.id);
          if (index !== -1) this.jobs[index] = updatedJob;
  
          this.resetForm();
          this.isLoading = false;
          this.showForm = false;
  
          // BAŞARI MESAJI (Toast)
          Toast.fire({
            icon: 'success',
            title: 'Başvuru başarıyla güncellendi'
          });
        },
        error: () => {
          this.isLoading = false;
          Swal.fire('Hata', 'Güncelleme sırasında bir sorun oluştu.', 'error');
        }
      });
    } else {
      // YENİ EKLEME
      this.jobService.createJob(this.newJob).subscribe({
        next: (createdJob) => {
          this.jobs.unshift(createdJob);
          this.resetForm();
          this.isLoading = false;
          this.showForm = false;
  
          // BAŞARI MESAJI (Toast)
          Toast.fire({
            icon: 'success',
            title: 'Yeni başvuru eklendi'
          });
        },
        error: () => {
          this.isLoading = false;
          Swal.fire('Hata', 'Kayıt sırasında bir sorun oluştu.', 'error');
        }
      });
    }
  }

  // Silme
  deleteJob(id: number): void {
    // SİLME ONAYI (Güzel bir soru kutusu)
    Swal.fire({
      title: 'Emin misin?',
      text: "Bu başvuruyu silmek istediğine emin misin? Bu işlem geri alınamaz!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f5365c', // Kırmızı
      cancelButtonColor: '#8898aa', // Gri
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'Vazgeç'
    }).then((result) => {
      if (result.isConfirmed) {
        // Kullanıcı 'Evet' dedi, şimdi silelim
        this.jobService.deleteJob(id).subscribe({
          next: () => {
            this.jobs = this.jobs.filter(job => job.id !== id);
  
            if (this.currentJobId === id) {
              this.resetForm(); // Formu sıfırla
              this.showForm = false; // Formu gizle
            }

            // SİLİNDİ MESAJI
            Toast.fire({
              icon: 'success',
              title: 'Başvuru silindi'
            });
          },
          error: () => {
            Swal.fire('Hata', 'Silme işlemi başarısız oldu.', 'error');
          }
        });
      }
    });
  }

  resetForm(): void {
    this.newJob = { company: '', position: '', platform: '', status: 'Başvuruldu', applicationDate: new Date() };
    this.isEditing = false;
    this.currentJobId = null;
  }

  // Badge Renkleri
  getStatusClass(status: string): string {
    if (!status) return 'badge-secondary';
    switch (status.toLowerCase()) {
      case 'mülakat': return 'badge-warning';
      case 'red': return 'badge-danger';
      case 'teklif': return 'badge-success';
      case 'başvuruldu': return 'badge-primary';
      case 'beklemede': return 'badge-info';
      default: return 'badge-secondary';
    }
  }
}