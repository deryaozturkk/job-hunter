import { Component, OnInit , HostListener} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; // Formlar için şart
import { RouterModule } from '@angular/router';
import { Job, JobService } from '../../services/job.service'; 
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  
  jobs: Job[] = []; 
  
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
  isExportOpen: boolean = false;
  isDarkMode: boolean = false;


  showForm: boolean = false; 

  constructor(private jobService: JobService) {}

  
  ngOnInit(): void {
    this.loadJobs();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.applyTheme(); 
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light'); 
    this.applyTheme();
  }

  private applyTheme(): void {
    const htmlTag = document.documentElement;
    if (this.isDarkMode) {
      htmlTag.setAttribute('data-bs-theme', 'dark'); 
    } else {
      htmlTag.setAttribute('data-bs-theme', 'light');
    }
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (res: any) => {
        // Backend'den gelen paketin içindeki asıl listeye ulaşıyoruz
        if (res && res.data) {
          const jobList = res.data; 
          this.jobs = jobList.sort((a: any, b: any) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
        }
      },
      error: (err) => console.error('İş listesi çekilemedi:', err)
    });
  }

  // Filtreleme Mantığı 
  get filteredJobs() {
    let result = this.filterStatus === 'ALL'
      ? this.jobs
      : this.jobs.filter(job => job.status === this.filterStatus);

    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase(); 
      
      result = result.filter(job => 
        (job.company?.toLowerCase()?.includes(term) ?? false) || 
        (job.position?.toLowerCase()?.includes(term) ?? false) || 
        (job.platform?.toLowerCase()?.includes(term) ?? false)
      );
    }

    return result;
  }
  toggleExport(event: Event): void {
    event.stopPropagation(); // Tıklama olayının yukarı sıçramasını engeller
    this.isExportOpen = !this.isExportOpen;
  }

  // Sayfanın Boş Bir Yerine Tıklayınca Menüyü Kapat
  @HostListener('document:click', ['$event'])
  closeMenu(event: Event): void {
    this.isExportOpen = false;
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

  saveJob(): void {
    // Validasyon Kontrolü
    if (!this.newJob.company || !this.newJob.position || !this.newJob.applicationDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Eksik Bilgi',
        text: 'Lütfen Şirket, Pozisyon ve Tarih alanlarını doldurunuz!',
        confirmButtonColor: '#5e72e4'
      });
      return;
    }
  
    this.isLoading = true;
  
    // DTO'ya uygun temiz veri paketi hazırlıyoruz
    const jobPayload : any = {
      company: this.newJob.company,
      position: this.newJob.position,
      platform: this.newJob.platform,
      status: this.newJob.status,
      applicationDate: this.newJob.applicationDate,
    };
  
    if (this.newJob.url && this.newJob.url.trim() !== '') {
      jobPayload.url = this.newJob.url;
    }

    if (this.isEditing && this.currentJobId) {
      this.jobService.updateJob(this.currentJobId, jobPayload).subscribe({
        next: (res: any) => {
          // Interceptor nedeniyle veriyi res.data içinden alıyoruz
          if (res && res.data) {
            const updatedData = res.data;
            const index = this.jobs.findIndex(j => j.id === this.currentJobId);
            if (index !== -1) {
              this.jobs[index] = updatedData;
            }
          }
          this.finalizeSave('Başvuru başarıyla güncellendi');
        },
        error: (err) => this.handleError('Güncelleme hatası', err)
      });
    } else {
      this.jobService.createJob(jobPayload).subscribe({
        next: (res: any) => {
          // Veriyi res.data içinden alıp listenin başına ekliyoruz
          if (res && res.data) {
            this.jobs.unshift(res.data);
          }
          this.finalizeSave('Yeni başvuru eklendi');
        },
        error: (err) => this.handleError('Kayıt hatası', err)
      });
    }
  }
  
  private finalizeSave(message: string) {
    this.resetForm();
    this.isLoading = false;
    this.showForm = false;
    Toast.fire({ icon: 'success', title: message });
  }
  
  private handleError(title: string, err: any) {
    this.isLoading = false;
    console.error('Hata Detayı:', err);
    
    // Hata mesajını güvenli bir şekilde string'e çeviriyoruz
    const errorMessage = err.error?.message || 'Bir sorun oluştu.';
    
    Swal.fire({
      icon: 'error',
      title: title,
      text: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage
    });
  }

  deleteJob(id: number): void {
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
        this.jobService.deleteJob(id).subscribe({
          next: () => {
            this.jobs = this.jobs.filter(job => job.id !== id);
  
            if (this.currentJobId === id) {
              this.resetForm(); // Formu sıfırla
              this.showForm = false; // Formu gizle
            }

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
    this.newJob = { company: '', position: '', platform: '', url: '', status: 'Başvuruldu', applicationDate: new Date() };
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
      default: return 'badge-secondary';
    }
  }

  confirmExport(): void {
    Swal.fire({
      title: 'Excel İndirilsin mi?',
      text: 'Mevcut başvuru listeniz Excel formatında cihazınıza indirilecek.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2dce89', // Yeşil tonu
      cancelButtonColor: '#8898aa',
      confirmButtonText: 'Evet, İndir',
      cancelButtonText: 'Vazgeç'
    }).then((result) => {
      if (result.isConfirmed) {
        this.exportToExcel();
      }
    });
  }

  private exportToExcel(): void {
    const exportData = this.jobs.map(job => ({
      'Şirket': job.company,
      'Pozisyon': job.position,
      'Platform': job.platform,
      'Durum': job.status,
      'Başvuru Tarihi': new Date(job.applicationDate).toLocaleDateString('tr-TR'),
      'Link': job.url || 'Yok'
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Basvurular');

    // Dosya ismine tarih ekleyelim
    const dateStr = new Date().toISOString().slice(0,10); // 2026-01-31 formatı
    XLSX.writeFile(wb, `JobHunter_Listesi_${dateStr}.xlsx`);
    
    // Küçük bir başarı bildirimi (Sağ üstte)
    Toast.fire({
      icon: 'success',
      title: 'Dosya indirildi'
    });
  }


  async openNoteModal(job: Job): Promise<void> {
    const { value: text } = await Swal.fire({
      title: `${job.company} - Notlar`,
      input: 'textarea',
      inputLabel: 'Mülakat detayları, maaş beklentisi vb.',
      inputValue: job.note || '', // Varsa eski notu getir
      inputPlaceholder: 'Buraya notlarınızı yazın...',
      inputAttributes: {
        'aria-label': 'Notlarınızı buraya yazın'
      },
      showCancelButton: true,
      confirmButtonText: 'Kaydet',
      cancelButtonText: 'Vazgeç',
      confirmButtonColor: '#5e72e4', // Mavi
      cancelButtonColor: '#f5365c'
    });

    // Eğer kullanıcı bir şey yazıp kaydettiyse (veya silip boş kaydettiyse)
    if (text !== undefined && text !== job.note) {
      // Veriyi güncelle
      const updatedJob = { ...job, note: text };
      
      this.jobService.updateJob(job.id, updatedJob).subscribe({
        next: () => {
          job.note = text; // Tablodaki görüntüyü de güncelle
          Toast.fire({
            icon: 'success',
            title: 'Not kaydedildi'
          });
        },
        error: (err) => {
          console.error(err);
          Toast.fire({
            icon: 'error',
            title: 'Not kaydedilemedi'
          });
        }
      });
    }
  }

  confirmPdfExport() {
    Swal.fire({
      title: 'PDF İndirilsin mi?',
      text: "Mevcut başvuru listeniz PDF formatında cihazınıza indirilecek.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#f5365c', // PDF Kırmızısı
      cancelButtonColor: '#8898aa',
      confirmButtonText: 'Evet, İndir',
      cancelButtonText: 'Vazgeç'
    }).then((result) => {
      if (result.isConfirmed) {
        this.exportToPdf();
      }
    });
  }

  exportToPdf() {
    const doc = new jsPDF();

    //Tarih Formatı (31.01.2026)
    const today = new Date().toLocaleDateString('tr-TR'); 

    //Başlık
    doc.setFontSize(18);
    // Türkçe karakterleri temizleyerek yazdırıyoruz
    doc.text(this.normalizeTurkish('Job Hunter - Basvuru Listesi'), 14, 20);

    doc.setFontSize(10);
    doc.text(`Tarih: ${today}`, 14, 28);

    //Tablo Verisini Hazırla
    const data = this.filteredJobs.map(job => [
      this.normalizeTurkish(job.company),  // Google -> Google
      this.normalizeTurkish(job.position), // Full Stack -> Full Stack
      this.normalizeTurkish(job.platform), // Kariyer.net -> Kariyer.net
      new Date(job.applicationDate).toLocaleDateString('tr-TR'), // 28.01.2026
      this.normalizeTurkish(job.status),   // Başvuruldu -> Basvuruldu 
      job.url ? 'Link Var' : '-' 
    ]);

    //Tabloyu Oluştur
    autoTable(doc, {
      head: [['Sirket', 'Pozisyon', 'Platform', 'Tarih', 'Durum', 'Link']],
      body: data,
      startY: 35,
      theme: 'grid',
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [94, 114, 228], 
        textColor: [255, 255, 255]
      }
    });

    //Dosyayı Kaydet
    doc.save(`JobHunter_Basvurular_${today}.pdf`);
    
    //Bildirim
    this.isExportOpen = false;
    
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

    Toast.fire({
      icon: 'success',
      title: 'PDF başarıyla indirildi!'
    });
  }

  normalizeTurkish(text: string): string {
    if (!text) return '';
    const map: { [key: string]: string } = {
      'ç': 'c', 'Ç': 'C',
      'ğ': 'g', 'Ğ': 'G',
      'ı': 'i', 'I': 'I', 
      'İ': 'I', 'i': 'i',
      'ö': 'o', 'Ö': 'O',
      'ş': 's', 'Ş': 'S',
      'ü': 'u', 'Ü': 'U'
    };
    return text.replace(/[çÇğĞıİöÖşŞüÜ]/g, (match) => map[match]);
  }

  
}