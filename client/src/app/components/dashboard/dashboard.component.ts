import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts'; // Grafik direktifi
import { ChartData, ChartType, ChartOptions } from 'chart.js'; // Tipler

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // 👇 Bunu eklemeyi unutma, grafiğin çalışması için şart!
  imports: [BaseChartDirective], 
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
  // --- 1. PASTA GRAFİK (Başvuru Durumları) ---
  
  // Grafiğin Tipi
  public pieChartType: ChartType = 'pie';

  // Grafiğin Verisi (Şimdilik elle yazıyoruz)
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Başvuruldu', 'Mülakat', 'Red', 'Teklif'], // Etiketler
    datasets: [
      {
        data: [10, 5, 2, 1], // Sayılar (10 Başvuru, 5 Mülakat...)
        backgroundColor: ['#3498db', '#f1c40f', '#e74c3c', '#2ecc71'], // Renkler
      },
    ],
  };

  // Grafik Ayarları (Opsiyonel)
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
}