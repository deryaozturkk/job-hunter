import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts'; 
import { ChartOptions , ChartDataset} from 'chart.js';
import { JobService, JobStats } from '../../services/job.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public totalCount: number = 0;
  public ongoingCount: number = 0;
  public rejectedCount: number = 0;
  isDarkMode: boolean = false; // Dark mode kontrolü

  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '60%', // Ortasının ne kadar boş olacağı (%60 ideal)
  plugins: {
    legend: {
      position: 'bottom', // Etiketleri alta alalım, daha şık durur
      labels: {
        usePointStyle: true, // Kare yerine yuvarlak nokta kullansın
        padding: 20
      }
    }
  }
  };
  public pieChartLabels: string[] = [];
  public pieChartDatasets : ChartDataset<'doughnut', number[]>[]= [ {
    data: [] as number[],
    backgroundColor: ['#FFA726', '#EF5350', '#66BB6A', '#42A5F5', '#78909C']
  } ];
  public pieChartLegend = true;
  // public pieChartPlugins = []; // Eğer hata verirse bunu silebilirsin, şart değil

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadStats();


    //  Sayfa açılınca hafızayı kontrol et
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.applyTheme();
    }
  }

  //  Tema Değiştirme Fonksiyonu
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  //  HTML'e dark modu uygula
  private applyTheme(): void {
    const htmlTag = document.documentElement;
    if (this.isDarkMode) {
      htmlTag.setAttribute('data-bs-theme', 'dark');
    } else {
      htmlTag.setAttribute('data-bs-theme', 'light');
    }
  }


  loadStats() {
    this.jobService.getJobStats().subscribe({
      next: (data: JobStats[]) => {
        // 1. Etiketleri ve Sayıları Al
        const labels = data.map(item => item.status);
        const counts = data.map(item => Number(item.count));

        // 2. Etiketleri Grafiğe Ver
        this.pieChartLabels = labels;

        // 3. Her bir statü için ÖZEL rengini bul ve listeye ekle
        // (Gelen veri sayısı kadar renk içeren bir dizi oluşturuyoruz)
        const dynamicColors = labels.map(status => this.getColorForStatus(status));

        // 4. Veri Setini Güncelle
        this.pieChartDatasets = [{
          data: counts,
          backgroundColor: dynamicColors, // Dinamik renk dizisi
          hoverBackgroundColor: dynamicColors, // Üzerine gelince aynı renk kalsın veya koyulaştırabilirsin
          borderColor: '#ffffff', // Dilimlerin arasına beyaz çizgi atar (daha şık durur)
          borderWidth: 2
        }];
        this.calculateTotals(data);
      },
      error: (err) => console.error('Hata:', err)
    });
  }
  getColorForStatus(status: string): string {
    switch (status.toLowerCase()) { // Küçük harfe çevirip kontrol edelim
      case 'mülakat': return '#FFA726'; // Turuncu
      case 'red': return '#EF5350';     // Kırmızı
      case 'teklif': return '#66BB6A';  // Yeşil
      case 'başvuruldu': return '#AB47BC'; // Mor
      default: return '#78909C';        // Tanımsızsa Gri
    }
  }

  calculateTotals(data: JobStats[]) {
    // 1. TOPLAM BAŞVURU: Hepsini topla
    this.totalCount = data.reduce((toplam, item) => toplam + Number(item.count), 0);
  
    // 2. REDDEDİLENLER: Veritabanındaki isme göre kontrol edelim (Büyük harf duyarlılığı için)
    // Ekran görüntünde 'RED' mi yoksa 'REDDEDİLDİ' mi yazıyor? Ona göre güncellemelisin.
    const redItem = data.find(item => 
      item.status.toUpperCase() === 'RED' || 
      item.status.toUpperCase() === 'REDDEDİLDİ'
    );
    this.rejectedCount = redItem ? Number(redItem.count) : 0;
  
    // 3. DEVAM EDENLER: Toplamdan redleri çıkar
    this.ongoingCount = this.totalCount - this.rejectedCount;
  }
}