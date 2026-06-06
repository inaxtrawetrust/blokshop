# BlokShop — Minecraft Temalı E-Ticaret Sitesi

Minecraft temalı fiziksel aksesuar ve kıyafet satan bir e-ticaret vitrin sitesi. Retro-piksel estetik ile modern e-ticaret şıklığını birleştiren 3 sayfalık statik HTML/CSS/JS sitesi.

## Sayfalar

- **`index.html`** — Ana sayfa: Hero, Kategoriler, Öne Çıkan Ürünler, Kampanya Banner, Neden Biz, Footer
- **`urunler.html`** — Ürün listesi: Filtre, Sıralama, 12 ürün kartı, Sayfalama
- **`iletisim.html`** — İletişim: İletişim bilgileri, Form, SSS (FAQ Accordion)

## Teknolojiler

- **Vanilla HTML/CSS/JS** — Framework yok, derleme yok
- **Google Fonts** — Press Start 2P (piksel yazı) + Nunito (gövde)
- **CSS Custom Properties** — Tüm renkler `--color-*` değişkenleriyle tanımlı
- **CSS @keyframes** — Tüm animasyonlar harici kütüphane olmadan

## Lokal Çalıştırma

```bash
# Python ile basit sunucu
python3 -m http.server 8080
# veya
npx serve .
```

Ardından `http://localhost:8080` adresini aç.

## Yapı

```
/
├── index.html       # Ana sayfa
├── urunler.html     # Ürünler sayfası
├── iletisim.html    # İletişim sayfası
├── styles.css       # Tüm CSS (paylaşımlı)
├── main.js          # Tüm JS (paylaşımlı)
└── netlify.toml     # Netlify yapılandırması
```
