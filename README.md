# Funngro — Website Redesign

A complete, production-ready 2-page responsive website redesign for **Funngro**, a platform connecting teenagers with companies for real-world project work, skill development, and earnings.

## 🎯 Project Overview

This redesign showcases modern front-end development, UI/UX design, SEO optimization, and accessibility best practices for a youth-focused startup brand.

**Pages:**
1. `index.html` — Home page (hero, why Funngro, how it works, stats, projects, testimonials, FAQ, CTA)
2. `companies-teens.html` — For Companies & Teens (split benefits, success stories, comparison table, process flows, trust badges, contact form)

## 🛠 Tech Stack

- **HTML5** — Semantic markup, proper heading hierarchy
- **CSS3** — Custom properties, glassmorphism, gradients, responsive grid/flexbox
- **Vanilla JavaScript** — No framework dependencies (lightweight, fast)
- **AOS (Animate On Scroll)** — Scroll-reveal animations via CDN

## 📁 Project Structure

```
funngro-website/
├── index.html              # Home page
├── companies-teens.html    # Companies & Teens page
|
│─── style.css           # Complete design system & styles
├── main.js              # Navbar, carousel, FAQ, counters, form validation
├── sitemap.xml              # SEO sitemap
├── robots.txt                # Crawler directives
└── README.md                  # This file
```

## ✨ Features

- Responsive design (mobile-first, works on mobile/tablet/laptop/desktop)
- Hamburger navigation for mobile
- Animated scroll-triggered statistic counters
- Testimonial carousel with swipe support, autoplay, and dot navigation
- Accessible FAQ accordion (single-open, ARIA-compliant)
- Contact form with live client-side validation
- Glassmorphism cards, gradient accents, smooth hover/lift animations
- Full SEO implementation: meta tags, Open Graph, Twitter Cards, JSON-LD structured data, sitemap, robots.txt
- Accessibility: ARIA labels, keyboard navigation, focus states, `prefers-reduced-motion` support, semantic HTML

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `#00C896` |
| Secondary | `#1E293B` |
| Accent | `#14B8A6` |
| Background | `#F8FAFC` |
| Text | `#0F172A` |
| Display Font | Poppins |
| Body Font | Inter |

## 🚀 Local Development

No build step required. Open `index.html` directly in a browser, or serve locally:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `https://aryan-verma11.github.io/Funngro-website/`.

## 🌐 Deployment Instructions

### GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under "Build and deployment," select **Deploy from a branch**.
4. Choose `main` branch and `/ (root)` folder, then **Save**.
5. Your site will be live at `https://aryan-verma11.github.io/Funngro-website/`.


## 📝 License

This project was built as a design/development case study and is free to adapt.
