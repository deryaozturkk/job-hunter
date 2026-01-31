# 🏹 Job Hunter - Kişisel İş Başvuru Takip Sistemi

![Angular](https://img.shields.io/badge/Angular-v17-red?style=flat-square)
![NestJS](https://img.shields.io/badge/NestJS-v10-E0234E?style=flat-square)
![Bootstrap](https://img.shields.io/badge/Bootstrap-v5-purple?style=flat-square)

**Job Hunter**, iş arama sürecindeki karmaşayı ortadan kaldırmak, başvuruları tek bir merkezden yönetmek ve süreci verilerle analiz etmek için geliştirilmiş modern bir **Full-Stack** web uygulamasıdır.

Sıradan bir Excel tablosunun ötesinde; **Job Hunter** başvuruların durumunu takip eder, **Dark Mode** desteği sunar, **görsel grafiklerle** analiz yapar ve size **profesyonel bildirimlerle** geri bildirim verir.

---

## 🚀 Kullanılan Teknolojiler

Bu proje, sektör standartlarında kabul gören modern mimari prensipleri ve güncel teknolojiler kullanılarak geliştirilmiştir.

### **Backend (Sunucu Tarafı)**
* **NestJS** (Node.js Framework - Modüler Mimari)
* **TypeScript** (Tip Güvenliği / Type-Safety)
* **PostgreSQL** (İlişkisel Veritabanı)
* **TypeORM** (ORM & Veritabanı Yönetimi)
* **RESTful API** (CRUD İşlemleri)

### **Frontend (İstemci Tarafı)**
* **Angular 17+** (Standalone Components & Modern Mimari)
* **Bootstrap 5** (Responsive Grid & Modern UI Bileşenleri)
* **SweetAlert2** (Profesyonel Bildirim ve Onay Pencereleri)
* **ng2-charts & Chart.js** (Veri Görselleştirme)
* **jspdf & jspdf-autotable** (PDF Raporlama)
* **RxJS** (Reaktif Programlama)
* **SCSS** (Gelişmiş Stil Yönetimi ve Dark Mode Entegrasyonu)

---

## 📊 Proje Özellikleri

Uygulama, kullanıcı deneyimini (UX) en üst düzeye çıkarmak için aşağıdaki özelliklerle donatılmıştır:

### ✅ Temel Özellikler
- [x] **📋 Gelişmiş İş Takibi:** Şirket, pozisyon, platform ve tarih bilgileriyle başvuru ekleme, düzenleme ve silme.
- [x] **📝 Not Sistemi:** Her başvuru için özel notlar ekleyebilme, okuma ve düzenleme imkanı.
- [x] **🔍 Akıllı Arama & Filtreleme:** Şirket adına göre anlık arama ve başvuru durumuna göre listeleme.
- [x] **📤 Dışa Aktarım (Excel & PDF):** Başvuru listesini Excel (.xlsx) veya Türkçe karakter destekli PDF raporu olarak indirebilme.

### ✅ Arayüz ve Kullanıcı Deneyimi (UX/UI)
- [x] **🌗 Karanlık Mod (Dark Mode):** Göz yormayan, sistem tercihiyle uyumlu ve hafızalı (localStorage) tema desteği.
- [x] **📱 Tam Mobil Uyumluluk:** Hamburger menü, yatay kaydırılabilir tablolar (scrollable tables) ve responsive kart tasarımı.
- [x] **📈 Analitik Dashboard:** Başvuru dağılımlarını gösteren modern grafikler ve özet bilgi kartları.
- [x] **✨ Modern Navigasyon:** "Pill" (Hap) tasarımlı, aktif sekmeyi vurgulayan şık menü yapısı.
- [x] **🔔 İnteraktif Geri Bildirimler:** Boş arama sonuçları için özel ekranlar ("Empty State"), Toast bildirimleri ve silme onayları.

### 🔜 Gelecek Planları (Roadmap)
- [ ] **AI Asistanı (Entegrasyon):** Google Gemini API kullanarak iş tanımına uygun CV tavsiyeleri alma.
- [ ] **Kimlik Doğrulama (Auth):** JWT (JSON Web Token) ile güvenli giriş ve kullanıcı kaydı.

## 📸 Ekran Görüntüleri

Uygulamanın hem gece hem gündüz kullanımına uygun modern arayüzü.

| 🌑 **Dark Mode: Analiz (Dashboard)** | 🌑 **Dark Mode: Başvuru Listesi** |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/94420182-1f7a-4598-8d5a-e24489c55b7e" width="100%" width="100%"> | <img src="https://github.com/user-attachments/assets/84d5cfe2-312d-4ccf-bc1b-ef5c89b1641e" width="100%"> |

| ☀️ **Light Mode: Analiz (Dashboard)** | ☀️ **Light Mode: Başvuru Listesi** |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/b6ed5543-7868-4027-a3f3-48e86dbfd9e5" width="100%"> | <img src="https://github.com/user-attachments/assets/08ddf0a7-5801-41eb-98d4-e772ed44bcd7" width="100%"> |

| 📱 **Detay Görünüm** |
| :---: |
| <img src="https://github.com/user-attachments/assets/c97feee0-abe3-4415-994e-f13a240476e1"> |     


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
