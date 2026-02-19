import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any = { id: 0, fullName: '', email: '' };
  
  isEditing = false;
  editData: any = {}; 

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      const decoded = this.authService.decodeToken(token);
      // Token'dan ID bilgisini de almamız lazım (decoded.sub veya decoded.id)
      this.user = {
        id: decoded.sub, 
        fullName: decoded?.fullName || 'Kullanıcı',
        email: decoded?.email || ''
      };
    }
  }

  // Düzenleme modunu aç
  toggleEdit() {
    this.isEditing = true;
    // Mevcut veriyi kopyala (şifre boş gelsin)
    this.editData = { 
      fullName: this.user.fullName, 
      password: '' 
    };
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveChanges() {
    // Sadece dolu olan alanları gönderelim
    const updatePayload: any = { fullName: this.editData.fullName };
    
    // Eğer şifre girilmişse onu da ekle
    if (this.editData.password && this.editData.password.length > 0) {
      updatePayload.password = this.editData.password;
    }

    this.authService.updateUser(this.user.id, updatePayload).subscribe({
      next: () => {
        alert('Profil başarıyla güncellendi! Lütfen tekrar giriş yapın.');
        this.authService.logout(); // Güvenlik için çıkış yaptırıp yeni token aldıralım
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Güncelleme hatası!');
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}