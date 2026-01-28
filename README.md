# 🏹 Job Hunter - Kişisel İş Başvuru Takip Sistemi

![Angular](https://img.shields.io/badge/Angular-v17-red?style=flat-square)
![NestJS](https://img.shields.io/badge/NestJS-v10-E0234E?style=flat-square)

**Job Hunter**, iş arama sürecindeki karmaşayı ortadan kaldırmak, başvuruları tek bir merkezden yönetmek ve süreci verilerle analiz etmek için geliştirilmiş modern bir **Full-Stack** web uygulamasıdır.

Sıradan bir Excel tablosunun ötesinde; **Job Hunter** başvuruların durumunu (Mülakat, Red, Teklif) takip eder, **görsel grafiklerle** analiz sunar ve size **profesyonel bildirimlerle** geri bildirim verir.

---

## 🚀 Kullanılan Teknolojiler

Bu proje, sektör standartlarında kabul gören modern mimari prensipleri ve güncel teknolojiler kullanılarak geliştirilmiştir.

### **Backend (Sunucu Tarafı)**
* **NestJS** (Node.js Framework - Modüler Mimari)
* **TypeScript** (Tip Güvenliği / Type-Safety)
* **PostgreSQL** (İlişkisel Veritabanı)
* **TypeORM** (ORM & Veritabanı Yönetimi - QueryBuilder)
* **RESTful API** (CRUD İşlemleri)

### **Frontend (İstemci Tarafı)**
* **Angular 17+** (Standalone Components & Modern Mimari)
* **Bootstrap 5** (Responsive Grid & Modern UI Bileşenleri)
* **SweetAlert2** (Profesyonel Bildirim ve Onay Pencereleri)
* **ng2-charts & Chart.js** (Doughnut Chart ile Veri Görselleştirme)
* **RxJS** (Reaktif Programlama)
* **SCSS** (Gelişmiş Stil Yönetimi)

---

## 📊 Proje Özellikleri

Uygulama, kullanıcı deneyimini (UX) en üst düzeye çıkarmak için aşağıdaki özelliklerle donatılmıştır:

### ✅ Temel Özellikler
- [x] **📋 Gelişmiş İş Takibi:** Şirket, pozisyon, platform ve tarih bilgileriyle başvuru ekleme, düzenleme ve silme.
- [x] **🔍 Akıllı Arama Motoru:** Şirket adı, pozisyon veya platforma göre anlık (real-time) arama yapabilme.
- [x] **🏷️ Renkli Durum Yönetimi:** Başvuruların durumuna göre (Mülakat=Turuncu, Red=Kırmızı, Teklif=Yeşil) otomatik renklenen "Badge" sistemi.
- [x] **🛡️ Validasyon Kontrolleri:** Eksik veri girişini engelleme ve ileri tarihli kayıt koruması.

### ✅ Analiz ve Görsellik
- [x] **📈 Analitik Dashboard:** Başvuru dağılımlarını gösteren modern "Doughnut" grafik ve özet bilgi kartları.
- [x] **🔔 Profesyonel Bildirimler:** İşlem başarı/hata durumlarında sağ üstten çıkan modern "Toast" bildirimleri ve silme işlemi için "Emin misin?" onay penceresi.
- [x] **📱 Tam Responsive:** Mobil, tablet ve masaüstü uyumlu esnek tasarım.

### 🔜 Gelecek Planları (Roadmap)
- [ ] **Detay Sayfaları:** Her başvuru için mülakat notları, tarihçe ve link saklama alanı.
- [ ] **AI Asistanı (Entegrasyon):** Google Gemini API kullanarak iş tanımına uygun CV tavsiyeleri alma.
- [ ] **Kimlik Doğrulama (Auth):** JWT (JSON Web Token) ile güvenli giriş ve kullanıcı kaydı.
- [ ] **Karanlık Mod (Dark Mode):** Kullanıcı tercihine göre tema değişimi.

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