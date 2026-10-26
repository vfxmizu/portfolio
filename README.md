# Mizu — Video Editor Portfolio (vfxmizu)

100% static site: plain HTML, CSS and JS. No build step, no dependencies. All paths are relative, so it works at a domain root, under a GitHub Pages subpath (`user.github.io/repo/`) and on a VPS.

```
index.html          page content (hero, work, services, about, contact)
assets/style.css    styling
assets/main.js      gallery, modal player, animations
assets/videos.js    <-- YOUR VIDEO LIST (edit this)
assets/favicon.svg  favicon
assets/og-image.png social share image
previews/           screenshots of the first draft
```

## Adding videos

Open `assets/videos.js` and edit the `window.VIDEOS` array. One entry per video:

```js
{ title: "Skincare VSL", category: "VSL", platform: "youtube", id: "dQw4w9WgXcQ", note: "Optional short description." },
{ title: "Gym ad",       category: "Ad Creative", platform: "youtube", id: "abc123XYZ", vertical: true },
{ title: "Vimeo piece",  category: "Motion & VFX", platform: "vimeo", id: "123456789", thumb: "assets/thumbs/vimeo-piece.jpg" }
```

- **YouTube ID**: the part after `v=` in `youtube.com/watch?v=...` (or after `youtu.be/`).
- **Vimeo ID**: the number in `vimeo.com/123456789`.
- **Thumbnails**: YouTube thumbs load automatically (lazy). For a custom one (or any Vimeo video), drop an image in `assets/thumbs/` and set `thumb: "assets/thumbs/file.jpg"`.
- **Vertical (9:16)** videos: add `vertical: true`.
- **Categories** are free text. Filter buttons are generated automatically (shown when there are 2+ categories).
- Entries with an ID starting `YOUR_` are placeholders (they show a "Placeholder" badge and don't play). Replace or delete them.
- Embeds are only loaded when a visitor clicks a card (privacy-friendly `youtube-nocookie.com`, fast page load).

## Other things to personalize

- **About photo/logo**: in `index.html`, replace the `about-placeholder` block with `<img src="assets/mizu.jpg" alt="Mizu">`.
- **Social image**: replace `assets/og-image.png` (1200×630). Once you have a final domain, change `og:image` (and optionally add `og:url`) to absolute URLs for best results on social platforms.
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
    location ~* \.(css|js|svg|png|jpg|jpeg|webp)$ { expires 30d; add_header Cache-Control "public"; }
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

3. Enable and reload: `sudo ln -s /etc/nginx/sites-available/mizu /etc/nginx/sites-enabled/ && sudo nginx -t && sudo systemctl reload nginx`
4. HTTPS: `sudo certbot --nginx -d example.com -d www.example.com`
