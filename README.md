# 🎉 Festival Greetings

A viral festival greeting website — **frontend only**, deploys to Vercel free tier in seconds.

## 🚀 Deploy to Vercel (30 seconds)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Other**. Output directory: `.` (root).
4. Click **Deploy**.

No build step. No backend. No database.

---

## 📁 File Structure

```
festival-greet/
├── index.html          # Single-page app shell
├── css/
│   └── main.css        # All styles, festival themes, dark mode
├── js/
│   ├── festivals.js    # Festival data & configuration ← edit here
│   ├── confetti.js     # Lightweight confetti engine
│   └── app.js          # App logic, URL routing, sharing
├── robots.txt
├── sitemap.xml
├── vercel.json         # Caching headers, rewrites
└── README.md
```

---

## 🎨 Adding a New Festival

Open `js/festivals.js` and add an entry to the `FESTIVALS` object:

```js
newyear2026: {
  name: "New Year 2026",
  emoji: "🎆",
  tagline: "A Fresh Start Awaits",
  theme: "theme-newyear",          // reuse an existing theme or add a new CSS class
  colors: { primary: "#7c4dff", secondary: "#ffd700", accent: "#00e5ff", bg: "#0a0025" },
  quote: "May 2026 bring you joy and new adventures!",
  confettiColors: ["#7c4dff", "#ffd700", "#00e5ff", "#fff", "#ff4081"],
  particles: "🎆",
  wishes: [
    "Happy New Year 2026! 🎆",
    "Wishing you a spectacular year ahead."
  ]
}
```

Then add a picker button in `index.html`:

```html
<button class="fpick" data-festival="newyear2026" aria-pressed="false">🎆 NY 2026</button>
```

To add a custom CSS theme, add in `css/main.css`:

```css
.theme-newyear2026 { --c-primary:#7c4dff; --c-secondary:#ffd700; --c-accent:#00e5ff; --c-bg:#f5f0ff; }
```

---

## 💰 Enabling Google AdSense

1. Add your AdSense script in `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossorigin="anonymous"></script>
   ```

2. Replace the placeholder `div` content in `index.html`:
   ```html
   <div class="ad-slot ad-top" data-ad="top">
     <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-XXXXXXXX"
          data-ad-slot="YYYYYYYY"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
     <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
   </div>
   ```

Ad slots are pre-sized (`min-height`) to prevent layout shift (CLS).

---

## 🌐 Custom Domain

In Vercel Dashboard → Project → Settings → Domains → Add your domain.

Update the canonical URL in `index.html` and `sitemap.xml` to match.

---

## 📊 Performance Notes

- **No JavaScript frameworks** — vanilla JS only
- **No external JS libraries** — zero npm dependencies
- **Fonts**: loaded via Google Fonts with `display=swap` to avoid FOIT
- **Confetti**: Canvas-based, paused when `prefers-reduced-motion` is set
- **Images**: none (emoji + SVG icons only)
- **Total page weight**: ~25 KB HTML + ~12 KB CSS + ~10 KB JS ≈ **~47 KB** (well under 300 KB target)
- **Cache headers**: JS and CSS cached for 1 year via `vercel.json`

---

## 🔗 How Sharing Works

1. User enters name → link generated: `/?name=John&festival=diwali`
2. Receiver opens link → JS reads URL params → shows receiver view
3. No server involved at any point.

Share message format:
> "John has sent you special Diwali wishes! Open here: https://…"

---

## 🎯 Lighthouse Targets

| Metric       | Target |
|-------------|--------|
| Performance  | 95+    |
| Accessibility| 90+    |
| Best Practices| 95+   |
| SEO          | 95+    |
