# 🏹 Job Hunter - Kişisel İş Başvuru Takip Sistemi

**Job Hunter**, iş arama sürecindeki karmaşayı ortadan kaldırmak, başvuruları tek bir merkezden yönetmek ve süreci verilerle analiz etmek için geliştirilmiş modern bir **Full-Stack** web uygulamasıdır.

Sıradan bir "To-Do List" uygulamasının ötesinde; **Job Hunter** başvuruların durumunu (Mülakat, Red, Teklif) takip eder ve görsel grafiklerle sürecin analizini sunar.

## 🚀 Kullanılan Teknolojiler

Bu proje, sektör standartlarında kabul gören modern mimari prensipleri ve güncel teknolojiler kullanılarak geliştirilmiştir.

### **Backend (Sunucu Tarafı)**
* **NestJS** (Node.js Framework - Modüler Mimari)
* **TypeScript** (Tip Güvenliği / Type-Safety)
* **PostgreSQL** (İlişkisel Veritabanı)
* **TypeORM** (ORM & Veritabanı Yönetimi)
* **RESTful API** (İstemci-Sunucu İletişimi)

### **Frontend (İstemci Tarafı)**
* **Angular 17+** (Standalone Components & Modern Mimari)
* **TypeScript**
* **RxJS** (Reaktif Programlama & Observable Yapısı)
* **ng2-charts & Chart.js** (Veri Görselleştirme ve Dashboard)
* **SCSS (Sass)** (Gelişmiş CSS Yönetimi)

---

## 📊 Proje Özellikleri ve Yol Haritası (Roadmap)

Proje aktif geliştirme aşamasındadır. Tamamlanan ve planlanan özellikler aşağıdadır:

### ✅ Tamamlanan Özellikler
- [x] **İş Takibi (CRUD):** Yeni iş ilanı ekleme, düzenleme, silme ve listeleme.
- [x] **Dinamik Filtreleme:** Başvuruları statüsüne göre (Mülakat, Beklemede, Red vb.) anlık filtreleme.
- [x] **Analitik Dashboard:** Başvuru dağılımlarını gösteren görsel analiz ekranı (Pasta Grafik).
- [x] **Responsive UI:** Masaüstü ve mobil cihazlarla uyumlu, esnek ve modern arayüz tasarımı.
- [x] **Modern Navigasyon:** Angular Router ile sayfa yenilenmeden hızlı geçişler (SPA).

### 🔜 Gelecek Planları (To-Do)
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