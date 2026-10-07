# HIMASTA UNTIRTA - R Shiny

Versi ini mengubah website HIMASTA UNTIRTA menjadi aplikasi R Shiny dengan struktur single-file `app.R` dan aset di folder `www/`.

## Cara menjalankan

1. Ekstrak folder ini.
2. Buka RStudio.
3. Buka file `app.R`.
4. Jalankan:

```r
shiny::runApp()
```

## Struktur folder

```text
HIMASTA_RShiny/
├─ app.R
└─ www/
   ├─ assets/
   ├─ css/
   ├─ pages/
   ├─ partials/
   └─ script.js
```

Catatan: file video profil disimpan di `www/assets/video-profil.mp4`, sehingga ukuran folder cukup besar.

Catatan revisi: halaman Kontak dihapus karena informasi sosial media dan email sudah tersedia di footer.
