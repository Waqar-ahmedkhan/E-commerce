# Try the Look — Nike Runway Experience

A high-performance, interactive outfit runway built with modern vanilla HTML, CSS, and JavaScript featuring a custom `<runway-section>` Web Component.

## Features

- **Head-to-Toe Outfit Architecture**: Every look is structured in natural top-to-bottom order:
  1. **Shirt / Top** (T-Shirt, Hoodie, Sweatshirt, Knitwear)
  2. **Pant / Bottom** (Relaxed Baggy Denim, Easy Denim, Tailored Chinos)
  3. **Shoes / Footwear** (Tatum 5 Orbit, Air Jordan 12 Retro, Luka 5)
- **Precise Anatomical Hotspots**: Interactive pin indicators on the runway models pinpoint each piece (Chest, Thigh, Shoes) with frosted-glass label tooltips.
- **Synchronized Bidirectional Interaction**:
  - Tapping a pin on the model automatically highlights the product and opens the size drawer.
  - Hovering or clicking an item in the sidebar pulses its pin on the model.
- **High-Performance Motion**: 60fps physics-based ring and carousel navigation with subpixel rendering, GPU acceleration, and responsive touch gestures.
- **Dynamic Outfit Bundling**: Instant bundle calculations with automatic 10% outfit savings and one-click "Add full look to bag".
- **Completely Self-Contained**: Local typography (`assets/inter-600.woff2`) and optimized WebP visual assets for fast loading with zero external dependencies.
- **Styling Shortlist Bag**: Saved looks and sizes stored in `localStorage` with `.txt` shortlist export.

## Quick Start

Serve the project folder with any local web server:

```bash
# Using Python
python3 -m http.server 8000

# Or using Node.js
npx serve .
```

Then navigate to `http://localhost:8000` in your browser.

## File Structure

```
├── assets/                  # High-resolution optimized model & garment imagery + Inter font
├── index.html               # Main application entry point & semantic markup
├── styles.css               # Design system, layout, responsive queries, and animations
├── app.js                   # Web Component logic, carousel physics, and interaction handlers
├── .gitignore               # Ignored build & cache artifacts
└── README.md                # Project documentation
```
