import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = { email: '', password: '', fullName: '' }; 
  isRegisterMode = false; 

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  onSubmit() {
    if (this.isRegisterMode) {
      this.authService.register(this.loginData).subscribe({
        next: () => {
          alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
          this.isRegisterMode = false; 
          this.loginData.password = ''; 
        },
        error: (err: any) => {
          if (err.status === 400 || err.status === 500) {
            alert('Bu e-posta adresi zaten kullanımda! Lütfen giriş yapın.');
            this.isRegisterMode = false; 
          } else {
            alert('Kayıt hatası: ' + err.error?.message);
          }
        }
      });
    } else {
      this.authService.login({ email: this.loginData.email, password: this.loginData.password }).subscribe({
        next: () => this.router.navigate(['/jobs']),
        error: (err: any) => alert('Giriş hatası: ' + err.error?.message)
      });
    }
  }
}