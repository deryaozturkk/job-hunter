import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router'; // RouterModule'ü linkler için ekledik
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = { email: '', password: '' }; 

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.router.navigate(['/jobs']);
      },
      error: (err) => {
        alert('Giriş yapılamadı: ' + (err.error?.message || 'Sunucuya ulaşılamıyor'));
      }
    });
  }
}