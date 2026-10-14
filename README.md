# Solar Coin Mining — Telegram Mini App başlangıç demosu

Bu paket, Android telefondan GitHub'a yükleyip Railway'de yayınlamayı denemek için hazırlanmış başlangıç projesidir.

## Özellikler
- Telegram `/start` komutu ve Mini App açma düğmesi
- Türkçe / English arayüz seçimi
- Demo madencilik sayaç ekranı, görevler, günlük ödül ve davet sayfası
- `/health` sağlık kontrolü
- Railway için `Procfile`

## Önemli sınırlar
- SCN yalnızca sanal demo puanıdır; gerçek kripto para veya para çekme sistemi değildir.
- Puanlar tarayıcıda demo olarak tutulur; güvenilir/kalıcı kullanıcı bakiyesi değildir.
- Reklam butonu gerçek reklam göstermez; demo bildirimi gösterir.
- Canlı kullanıma açmadan önce Telegram `initData` sunucu tarafında doğrulanmalı, ödüller sunucu tarafında ve veritabanında tutulmalı, hız sınırı ve kötüye kullanım koruması eklenmelidir.
- Bot tokenını asla GitHub dosyalarına yazmayın. Railway Variables/Secrets alanına `TELEGRAM_BOT_TOKEN` olarak ekleyin.

## Railway değişkenleri
- `TELEGRAM_BOT_TOKEN`: BotFather'dan alınan gizli token
- `WEB_APP_URL`: Railway'de yayınlandıktan sonra oluşan `https://...` adresi

`WEB_APP_URL` ilk deploy sırasında bilinmiyorsa ilk deploydan sonra Railway domain adresini alıp bu değişkene ekleyin ve yeniden deploy edin.

## GitHub'a telefondan yükleme
1. ZIP'i telefona indirin ve dosya yöneticisiyle ZIP içeriğini çıkarın.
2. GitHub deposunda `Add file` / `Upload files` ekranında, ZIP'in kendisini değil içindeki dosya ve `web` klasörünü seçin.
3. Yüklemeden sonra `Commit changes` düğmesine basın.
4. Railway'de `New Project` → GitHub deposundan deploy yolunu seçin ve bu depoyu bağlayın.
5. Railway Variables bölümüne `TELEGRAM_BOT_TOKEN` ekleyin; `WEB_APP_URL` değişkenini HTTPS domain aldıktan sonra ekleyin.

## Yerel çalıştırma
Python 3.12 ile:
```bash
pip install -r requirements.txt
python app.py
```
