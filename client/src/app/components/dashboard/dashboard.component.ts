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
  isDarkMode: boolean = false; 

  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '60%', 
  plugins: {
    legend: {
      position: 'bottom', 
      labels: {
        usePointStyle: true, 
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

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadStats();


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


  loadStats() {
    this.jobService.getJobStats().subscribe({
      next: (data: JobStats[]) => {
        const labels = data.map(item => item.status);
        const counts = data.map(item => Number(item.count));

        this.pieChartLabels = labels;

        const dynamicColors = labels.map(status => this.getColorForStatus(status));

        this.pieChartDatasets = [{
          data: counts,
          backgroundColor: dynamicColors, 
          hoverBackgroundColor: dynamicColors, 
          borderColor: '#ffffff', 
          borderWidth: 2
        }];
        this.calculateTotals(data);
      },
      error: (err) => console.error('Hata:', err)
    });
  }
  getColorForStatus(status: string): string {
    switch (status.toLowerCase()) { 
      case 'mülakat': return '#FFA726'; // Turuncu
      case 'red': return '#EF5350';     // Kırmızı
      case 'teklif': return '#66BB6A';  // Yeşil
      case 'başvuruldu': return '#AB47BC'; // Mor
      default: return '#78909C';        // Tanımsızsa Gri
    }
  }

  calculateTotals(data: JobStats[]) {
    this.totalCount = data.reduce((toplam, item) => toplam + Number(item.count), 0);
  
    const redItem = data.find(item => 
      item.status.toUpperCase() === 'RED' || 
      item.status.toUpperCase() === 'REDDEDİLDİ'
    );
    this.rejectedCount = redItem ? Number(redItem.count) : 0;
  
    this.ongoingCount = this.totalCount - this.rejectedCount;
  }
}