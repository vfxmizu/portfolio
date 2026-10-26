# Mizu — Video Editor Portfolio (vfxmizu)

100% static site: plain HTML, CSS and JS. No build step, no dependencies. All paths are relative, so it works at a domain root, under a GitHub Pages subpath (`user.github.io/repo/`) and on a VPS.

```
index.html          page content (hero, work, services, about, contact)
assets/style.css    styling
assets/main.js      gallery, modal player, animations
assets/videos.js    <-- YOUR VIDEO LIST (edit this)
assets/videos/      self-hosted MP4 files (ad-01.mp4 ...)
assets/thumbs/      poster / thumbnail images
assets/favicon.svg  favicon
assets/og-image.png social share image
previews/           screenshots of the first draft
```

## Adding videos

Open `assets/videos.js` and edit the `window.VIDEOS` array. One entry per video.

**Self-hosted MP4 (what the gallery uses now):**

```js
{ title: "Ad 05", category: "Ads", platform: "mp4", src: "assets/videos/ad-05.mp4", thumb: "assets/thumbs/ad-05.jpg", vertical: true }
```

1. Prepare a web-friendly file (H.264 High, yuv420p, `+faststart`, 720p or 1080p). Example for a vertical ad:

   ```bash
   ffmpeg -i input.mp4 -vf "scale='min(720,iw)':-2" -c:v libx264 -preset slow -profile:v high \
     -pix_fmt yuv420p -crf 27 -c:a aac -b:a 96k -movflags +faststart -map_metadata -1 assets/videos/ad-05.mp4
   ```

   Lower `-crf` (e.g. 22) = better quality and a bigger file. Aim for roughly 10–20 MB per file: GitHub rejects files over 100 MB and the repo should stay small.
2. Make a poster image (about 720px wide, frame at 1 second):

   ```bash
   ffmpeg -ss 1 -i assets/videos/ad-05.mp4 -frames:v 1 -vf scale=720:-2 -q:v 4 assets/thumbs/ad-05.jpg
   ```
3. Add the entry. `thumb` is used as the card image and as the `poster` of the player; `vertical: true` is for 9:16.
4. The file is only requested when a visitor clicks the card (`preload="none"`); closing the player stops and removes it.

**YouTube / Vimeo:**

```js
{ title: "Skincare VSL", category: "VSL", platform: "youtube", id: "dQw4w9WgXcQ", note: "Optional short description." },
{ title: "Vimeo piece",  category: "Motion & VFX", platform: "vimeo", id: "123456789", thumb: "assets/thumbs/vimeo-piece.jpg" }
```

- **YouTube ID**: the part after `v=` in `youtube.com/watch?v=...` (or after `youtu.be/`). **Vimeo ID**: the number in `vimeo.com/123456789`.
- YouTube thumbs load automatically; for a custom one (or any Vimeo video) set `thumb`.
- Embeds are only loaded on click (privacy-friendly `youtube-nocookie.com`).
- **Categories** are free text. Filter buttons are generated automatically and hidden while there is only one category.
- Entries with an ID starting `YOUR_` (or an mp4 entry without `src`) are placeholders: they show a "Placeholder" badge and don't play.

## Other things to personalize

- **About photo/logo**: in `index.html`, replace the `about-placeholder` block with `<img src="assets/mizu.jpg" alt="Mizu">`.
- **Social image**: replace `assets/og-image.png` (1200×630). The social/SEO tags in `index.html` use absolute URLs for `https://vfxmizu.github.io/portfolio/`: `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image` and the JSON-LD `url`. **When moving to a custom domain or VPS, update all of them to the new domain** (e.g. `https://yourdomain.com/`), otherwise link previews and search engines will keep pointing at the GitHub Pages URL.
- **Colors**: CSS variables at the top of `assets/style.css` (`--red`, `--orange`, `--green`).

## Preview locally

```bash
cd mizu-portfolio
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to GitHub Pages

1. Create a repo on GitHub and push this folder (files at the repo root).
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. The site appears at `https://<user>.github.io/<repo>/`. Relative paths work under that subpath.
4. Custom domain: add it in the same Pages settings and create the DNS record GitHub asks for.

## Deploy to a VPS (nginx)

1. Copy the files: `rsync -av --exclude .git --exclude previews ./ user@your-vps:/var/www/mizu-portfolio/`
2. nginx server block, e.g. `/etc/nginx/sites-available/mizu`:

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/mizu-portfolio;
    index index.html;

    location / { try_files $uri $uri/ =404; }
    location ~* \.(css|js|svg|png|jpg|jpeg|webp|mp4)$ { expires 30d; add_header Cache-Control "public"; }
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

3. Enable and reload: `sudo ln -s /etc/nginx/sites-available/mizu /etc/nginx/sites-enabled/ && sudo nginx -t && sudo systemctl reload nginx`
4. HTTPS: `sudo certbot --nginx -d example.com -d www.example.com`
