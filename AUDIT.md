# Performance Audit Notes

## Hero Image Opportunities
- `/img/servicehero.jpg` (used in ServicePageLayout hero) — convert to WebP (~40% savings) and provide AVIF fallback.
- `/img/s7.jpg`, `/img/s5.jpg`, `/img/s1.jpg` (services overview) — generate 1600px WebP versions, defer original JPEG as fallback.
- `/img/solutionhero.jpg`, `/img/ss2.jpg`, `/img/ss3.jpg` (solutions pages) — compress to 70% quality WebP; ensure lazy loading for below-the-fold cards.
- `/img/bloghero.jpg` (home/blog hero) — re-export as WebP and limit max width to 1920px.
- `/img/resource*.jpg` (multiple resources) — create shared optimized variants to reuse cache.

## Code-Splitting Targets
- `ServicePageLayout` and `SolutionPage` long-form sections can be split using dynamic imports for resource grids.
- Blog admin panel (in `BlogLanding`) only used by admins; load via `dynamic` when admin UI toggles open.
- Rich animations (`ScrollAnimator`) already defer-loaded; consider moving hero Lottie/large media into dynamically imported components.
- Investigate deferring chat widget API init until the chat bubble is opened to avoid idle network requests.
