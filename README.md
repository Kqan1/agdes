# AGDES (Afet Güzergah Denetim Sistemi)

AGDES (Afet Güzergah Denetim Sistemi), afet sonrası yol hasarlarını haritalandırmayı amaçlayan açık kaynak bir projedir. Bu repository, haritalandırma verilerini görüntüleyebileceğiniz web uygulamasını içermektedir. Proje, Başakşehir Living Lab 11. İnovasyon Yarışması'nda üçüncülük ödülüne layık görülmüştür.

## 🚀 Teknolojiler

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Tip güvenliği için
- [Tailwind CSS](https://tailwindcss.com/) - Stil ve tasarım için
- [Prisma](https://www.prisma.io/) - Veritabanı ORM
- [Google Maps API](https://developers.google.com/maps) - Harita entegrasyonu için

## 🛠️ Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd agdes
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun ve gerekli ortam değişkenlerini ekleyin:
```env
DATABASE_URL="your-database-url"
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

4. Veritabanı şemasını senkronize edin:
```bash
npx prisma generate
npx prisma db push
```

## 🚀 Geliştirme

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacaktır.

## 🏗️ Derleme

Projeyi production için derlemek için:

```bash
npm run build
```

Derlenmiş uygulamayı başlatmak için:

```bash
npm start
```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.