# AGENTS.md — BlokShop Proje Mimarisi

## Proje Tipi

Derleme adımı olmayan saf statik HTML/CSS/JS sitesi. `netlify.toml` kökü (`"."`) yayın dizini olarak ayarlar.

## Dizin Yapısı

```
/
├── index.html       # Ana sayfa (Hero + Kategoriler + Ürünler + Banner + Features)
├── urunler.html     # Ürünler sayfası (filtre + grid + sayfalama)
├── iletisim.html    # İletişim (form + iletişim bilgileri + FAQ accordion)
├── styles.css       # Paylaşımlı CSS — TÜM stiller burada
├── main.js          # Paylaşımlı JS — TÜM mantık burada
└── netlify.toml     # publish = "."
```

## Temel Tasarım Kararları

### CSS Değişken Sistemi
Tüm renkler `styles.css` dosyasının `:root` bloğunda `--color-*` prefix'i ile tanımlıdır.
Hiçbir renk sabit yazılmamalıdır; her zaman değişken kullan.

### Tipografi
- **Başlıklar / UI elementleri:** `'Press Start 2P'` — Google Fonts CDN
- **Gövde metni:** `'Nunito'` — Google Fonts CDN

### Pixel Estetik Kuralları
- Butonlar: `border-radius: 0` (köşeli), `box-shadow: Xpx Xpx 0 rgba(0,0,0,0.7)` (offset shadow)
- Hover animasyonları: yalnızca `transform` ve `box-shadow` kullan; `width`/`height`/`top` kullanma
- Ürün kartı hover: sarı (`--color-gold`) border glow efekti (Minecraft envanter kutusu)
- Kategori kartı hover: yeşil (`--color-primary`) border + `translateY(-8px)`

### Sayfa Kimliği
Her `<body>` etiketinde benzersiz `id` bulunur:
- `id="page-home"` → index.html
- `id="page-products"` → urunler.html
- `id="page-contact"` → iletisim.html

`main.js` bu id'yi okuyarak aktif navbar linkini otomatik stilleştirir.

### Sepet Sayacı
`localStorage` ile kalıcı hale getirilmiş basit sayaç. `main.js` içindeki `cartCount` değişkeni ve `updateCartBadge()` fonksiyonu.

### Animasyonlar
- **Piksel blok yağmuru:** JS ile dinamik oluşturulan `.pixel-block` elementleri, CSS `@keyframes fall`
- **Marquee banner:** CSS `@keyframes marquee` ile iki kopya içerik (kesintisiz döngü için)
- **Hero başlık:** `@keyframes heroTitleGlow` (altın rengi parıltı efekti)
- **Karakter:** `@keyframes characterFloat` (yukarı-aşağı)

### Responsive Breakpointler
- `1200px`: 4-kolon → 2-kolon geçişleri
- `768px`: Hamburger menü, tek-kolon düzeni
- `480px`: Tam mobil düzeni

### Ürün Filtresi (urunler.html)
Her `.product-card` üzerinde `data-category` attribute'u bulunur: `kiyafet`, `aksesuar`, `koleksiyon`.
`main.js`'deki `initFilter()` fonksiyonu filtre butonlarını ve `display:none` mantığını yönetir.

## Yeni Sayfa Eklerken

1. Aynı navbar/footer HTML'ini kopyala
2. `<body id="page-XXX">` ekle
3. `styles.css` ve `main.js` linkle
4. `main.js`'deki `pageMap` objesini güncelle
