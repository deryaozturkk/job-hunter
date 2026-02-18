# 🏹 Job Hunter - Kişisel İş Başvuru Takip Sistemi

![Angular](https://img.shields.io/badge/Angular-v17-red?style=flat-square)
![NestJS](https://img.shields.io/badge/NestJS-v10-E0234E?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15-blue?style=flat-square)
![Bootstrap](https://img.shields.io/badge/Bootstrap-v5-purple?style=flat-square)

**Job Hunter**, iş arama sürecindeki karmaşayı ortadan kaldırmak, başvuruları tek bir merkezden yönetmek ve süreci verilerle analiz etmek için geliştirilmiş modern bir **Full-Stack** web uygulamasıdır.

Sıradan bir Excel tablosunun ötesinde; **Job Hunter** başvuruların durumunu takip eder, **Karanlık Mod** desteği sunar, görsel grafiklerle analiz yapar ve güvenli bir altyapı ile verilerinizi korur.

---

## 🚀 Teknik Geliştirmeler ve Mimari

Bu proje; güvenlik, performans ve UI/UX odaklı mühendislik çözümleri sunan bir platformdur.

### ***1. Güvenlik ve Kimlik Doğrulama***
* **JWT (JSON Web Token):** Kullanıcı oturumları, sektör standardı olan JWT stratejisi ile uçtan uca güvenli hale getirilmiştir.
* **Bcrypt Şifreleme:** Kullanıcı şifreleri veritabanında ham metin olarak değil, `bcrypt` algoritması ile karma (hash) yöntemiyle saklanır.
* **Auth Guards & Interceptors:** Angular tarafında yetkisiz erişimleri engelleyen Guard yapısı ve her isteğe token ekleyen Interceptor mimarisi kurulmuştur.

### ***2. Gelişmiş SCSS ve Tema Yönetimi***
* **Kontrast Optimizasyonu:** Karanlık modda (Dark Mode) tüm bileşenlerin mükemmel okunabilirliğe sahip olması için SCSS bazlı özel görsel iyileştirmeler yapılmıştır.
* **Dinamik CSS Yapısı:** Dashboard kartları ve grafik alanları, reaktif CSS kuralları ile tema değişimine tam uyumlu hale getirilmiştir.

---

## 🛠 Kullanılan Teknolojiler

### ***Backend (Sunucu Tarafı)***
* **NestJS:** Modüler ve ölçeklenebilir mimari üzerine kurulu sunucu yapısı.
* **TypeScript:** Gelişmiş statik tip güvenliği.
* **PostgreSQL:** Güçlü ve güvenilir ilişkisel veritabanı.
* **TypeORM:** Nesne tabanlı veritabanı yönetimi (ORM).
* **Passport.js & JWT:** Güvenli kimlik doğrulama ve yetkilendirme.

### ***Frontend (İstemci Tarafı)***
* **Angular 17+:** Standalone bileşenler ve modern reaktif mimari.
* **RxJS:** Asenkron veri akışı ve uygulama durumu yönetimi.
* **SCSS:** Gelişmiş stil yönetimi ve akıllı tema entegrasyonu.
* **ng2-charts & Chart.js:** Dinamik veri görselleştirme ve istatistiksel grafikler.

---

## 📊 Proje Özellikleri

### ***✅ Tamamlanan Özellikler***

#### ***🔐 Kimlik Doğrulama ve Güvenlik (Auth System)***
* **JWT Tabanlı Güvenlik:** Tüm API uç noktaları JSON Web Token ile korunur; yetkisiz erişimler sunucu seviyesinde engellenir.
* **Gelişmiş Giriş ve Kayıt:** Kullanıcılar için özel hazırlanmış Login ve Register sayfaları üzerinden güvenli oturum yönetimi sağlanır.
* **Kişisel Profil Sayfası:** Kullanıcıların kendi hesap bilgilerini görüntüleyebildiği ve yönetebildiği özel Profil sekmesi mevcuttur.
* **Route Protection:** Angular AuthGuard yapısı ile giriş yapmamış kullanıcıların uygulama içindeki sayfalara erişimi engellenir.

#### ***📋 İş Başvuru ve Veri Yönetimi***
* **Merkezi İş Takibi:** Şirket, pozisyon, platform ve başvuru tarihi gibi detaylar özel notlarla birlikte kayıt altına alınabilir.
* **Akıllı Arama & Filtreleme:** Binlerce başvuru arasında anlık arama yapabilir ve başvuru durumuna göre listeleme yapabilirsiniz.
* **📤 Profesyonel Dışa Aktarım:** Verilerinizi tek tıkla Excel (.xlsx) veya Türkçe karakter destekli PDF formatına dönüştürerek raporlayabilirsiniz.

#### ***📈 Analitik ve Görsel Arayüz (UI/UX)***
* **Dinamik Dashboard:** Başvurularınızın güncel durum dağılımını Chart.js destekli grafiklerle anlık olarak takip edebilirsiniz.
* **🌗 Karanlık Mod (Dark Mode):** Sistem tercihinize uyumlu, göz yormayan ve localStorage sayesinde seçiminizi hatırlayan akıllı tema desteği.
* **İnteraktif Bildirimler:** SweetAlert2 ile zenginleştirilmiş, profesyonel bildirim mesajları ve onay pencereleri.

### ***🔜 Gelecek Planları (Roadmap)***
* **AI Asistan Entegrasyonu:** Google Gemini API kullanarak iş tanımına göre otomatik CV ve ön yazı tavsiyeleri oluşturma.

---
## 📸 Ekran Görüntüleri

Uygulamanın hem gece hem gündüz kullanımına uygun modern arayüzü.

| 🌑 **Dark Mode: Analiz (Dashboard)** | 🌑 **Dark Mode: Başvuru Listesi** |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/a7d6ce2e-910e-4ac3-a4d2-9c673a1f5a0c" width="100%" /> | <img src="https://github.com/user-attachments/assets/9eb7122b-9899-44b7-b38a-53443f68b0f8" width="100%" /> |

| ☀️ **Light Mode: Analiz (Dashboard)** | ☀️ **Light Mode: Başvuru Listesi** |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/fd0936c6-2c00-4c0b-a2d2-ab49da75bee5" width="100%"> | <img src="https://github.com/user-attachments/assets/2647e83b-24cb-4c73-9ee8-04cf31f9a337" width="100%"> |

| 📱 **Başvuru Ekleme Formu Detay** | 📱 **Mobil Analiz Ekranı** | 📱 **Mobil Analiz Ekranı** |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/4472fee3-e8b5-4218-9ce4-a6d908dd9ae2" width="100%" /> | <img src="https://github.com/user-attachments/assets/ee52daad-80a5-4163-aac4-ce4bcde26127" width="100%"/> | <img src="https://github.com/user-attachments/assets/5495c899-168a-4e32-b86e-d0abd790f86e" width="100%"/> |

| 📱 **Mobil: Giriş Sayfası** | 📱 **Mobil: Profil Sayfası** | 📱 **Mobil: Profil Güncelleme** |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/04924509-5b0a-40db-80f8-ef22a8ae7786" width="100%"/> | <img src="https://github.com/user-attachments/assets/e8b95a1e-5543-4c4d-b0a8-22f30f010ade" width="100%"/> | <img src="https://github.com/user-attachments/assets/69a38a50-fe95-4749-a843-5dae02ecd062" width="100%"/> |

---

## 🛠️ Kurulum ve Çalıştırma Rehberi

Bu projeyi yerel ortamınızda (Localhost) çalıştırmak için aşağıdaki adımları izleyin.

### Ön Gereksinimler
* Node.js (v18+)
* PostgreSQL Veritabanı

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/deryaozturkk/job-hunter.git
cd job-hunter
```

### 2. Backend (Server) Kurulumu
```bash
cd server
npm install
# Veritabanı bağlantı ayarlarını (app.module.ts veya .env) yapılandırdığınızdan emin olun.
npm run start:dev
```
Backend http://localhost:3000 portunda çalışacaktır.

### 3. Frontend (Client) Kurulumu
Yeni bir terminal açın ve client klasörüne gidin:
```bash
cd client
npm install
npm start
```
Frontend http://localhost:4200 portunda çalışacaktır.
