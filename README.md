# car-jesus-site · Solara Autos landing page

Landing page for a Mexican pre-owned car dealership, modelled on the structure and purpose of
[regisautomoveis.com.br](https://regisautomoveis.com.br/): inventory search, brand filters, featured vehicles,
"sell your car" valuation, financing and WhatsApp-first contact. The visual design is new: light, glassy,
card-based, with motion and 3D details.

- **Look and feel:** a bright, cool palette (ice canvas, cobalt `brand`, `aqua`, `iris`, `mint`) built from solid
  fills, hairlines and white space rather than gradients. Sections flow into each other through drifting
  wave dividers (`components/ui/WaveDivider.tsx`), backgrounds carry "light-trail" contour lines
  (`components/ui/FlowLines.tsx`), headings rise word by word, photos open with a curtain wipe, and Lenis gives the
  page inertial smooth scrolling. All motion respects `prefers-reduced-motion`.
- **Languages:** Spanish (primary, `es-MX`), English and Brazilian Portuguese, switched with a toggle of
  circular flags (header, mobile drawer and footer). The choice is remembered in `localStorage` and can be forced
  with `?lang=en` / `?lang=pt`.
- **Stack:** Next.js 16 (App Router, Turbopack, Cache Components), React 19, Tailwind CSS v4, Motion, Lenis,
  lucide glyphs and simple-icons brand logos.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (the page, icons and OG image are prerendered)
npm start
```

Requires Node.js 20.9 or newer.

## Page structure

| # | Section | Component | Highlights |
|---|---------|-----------|------------|
| 1 | Header | `components/Header.tsx` | Tall bar with bold 17px nav, scroll-spy pill, becomes a floating glass island on scroll; full-screen drawer on mobile |
| 2 | Hero (`#inicio`) | `sections/Hero.tsx`, `HeroSearch.tsx` | Fits one screen at every size; video stage, floating 3D glass cards, rotating badge, folder-tab search (brand, type, budget, keyword) |
| 3 | Brands | `sections/BrandMarquee.tsx` | Circular logo coins in a marquee; clicking one filters the inventory |
| 4 | Services | `sections/Services.tsx` | 12 capabilities as large animated glass icons in a bento grid with leaf, pill and round shapes |
| 5 | Inventory (`#inventario`) | `sections/Inventory.tsx`, `VehicleCard.tsx` | Ticket-shaped cards with notches, specs, MXN price and monthly estimate; body-type chips; WhatsApp "view details" |
| 6 | Sell your car (`#vender`) | `sections/SellCar.tsx` | Arched video, starburst sticker, 3-step timeline |
| 7 | Why sell with us | `sections/WhySell.tsx` | Capsule cards: security, convenience, speed, benefits |
| 8 | Financing (`#financiamiento`) | `sections/Financing.tsx` | Live payment calculator (price, down payment, term) in a chamfered card |
| 9 | About (`#nosotros`) | `sections/About.tsx` | Arch and circle photo collage, count-up stat circles |
| 10 | Testimonials | `sections/Testimonials.tsx` | Speech-bubble cards in two opposing marquee rows |
| 11 | Contact (`#contacto`) | `sections/Contact.tsx` | Contact cards, illustrated map, folder-tab form |
| 12 | Footer | `components/Footer.tsx` | WhatsApp CTA strip, link columns, language toggle, giant wordmark |
| + | Floating WhatsApp | `components/WhatsAppFab.tsx` | Appears after the hero |

## Editing content

All business data is placeholder content to be replaced with the client's real information.

| What | Where |
|------|-------|
| Name, phone, WhatsApp number, email, address, socials | `src/lib/site.ts` |
| Vehicles (model, year, km, price, photo, badge) | `src/lib/inventory.ts` |
| Every visible text, per language | `src/lib/i18n/es.ts` (source of truth and type), `en.ts`, `pt.ts` |
| Colors, shadows, radii, animations | `@theme` block in `src/app/globals.css` |
| Section background order and wave transitions | `src/app/page.tsx` |

TypeScript enforces that `en.ts` and `pt.ts` have exactly the same keys as `es.ts`. To add a language, create a
dictionary of type `Dictionary`, register it in `src/lib/i18n/provider.tsx` and add a flag in
`src/components/icons/Flags.tsx`.

The contact form has no backend yet: on submit it opens WhatsApp with the lead pre-filled. To send leads by email or
to a CRM, replace `onSubmit` in `Contact.tsx` with a Server Action or API route.

## Brand assets

- **Favicon:** `src/app/icon.svg`, an animated sun rising over a road, the same artwork as `LogoMark.tsx`.
- **Apple touch icon:** `src/app/apple-icon.tsx`, generated at build time (180×180 PNG).
- **Open Graph image:** `src/app/opengraph-image.tsx`, generated at build time (1200×630 PNG) using the fonts in
  `src/assets/fonts` (Sora and Plus Jakarta Sans, SIL Open Font License).
- **Web manifest:** `src/app/manifest.ts`.

Update `site.url` in `src/lib/site.ts` before deploying, so the absolute OG image URL is correct.

## Media credits

All media is free for commercial use without attribution under the license of its source. Files live in
`public/media`.

| File | Source |
|------|--------|
| `videos/hero.mp4` | [Mixkit: car driving through mountains](https://mixkit.co/free-stock-video/car-driving-through-the-road-in-the-mountains-20039/) |
| `videos/showroom.mp4` | [Mixkit: giving the key to a new car owner](https://mixkit.co/free-stock-video/giving-the-key-to-a-new-car-owner-24456/) |
| `images/car-1.jpg` | [Unsplash](https://unsplash.com/photos/white-suv-in-parking-lot-2xqFLkR0f4Y) |
| `images/car-2.jpg` | [Unsplash](https://unsplash.com/photos/black-sedan-on-road-during-daytime-bb6NaemzpGY) |
| `images/car-3.jpg` | [Pexels](https://www.pexels.com/photo/white-bmw-sedan-parked-beside-tree-100656/) |
| `images/car-4.jpg` | [Pexels](https://www.pexels.com/photo/red-sedan-car-in-the-car-park-5864402/) |
| `images/car-5.jpg` | [Unsplash](https://unsplash.com/photos/tan-toyota-tacoma-pickup-truck-o7fqZ18YFXc) |
| `images/car-6.jpg` | [Unsplash](https://unsplash.com/photos/white-volkswagen-vehicle-during-daytime-SuD4h8Gpgok) |
| `images/car-7.jpg` | [Unsplash](https://unsplash.com/photos/Xxq4jADBhq0) |
| `images/car-8.jpg` | [Unsplash](https://unsplash.com/photos/vUOpElTmh6k) |
| `images/showroom-mg.jpg` | [Unsplash](https://unsplash.com/photos/DB7_9Z7gj2Y) |
| `images/handshake.jpg` | [Pexels](https://www.pexels.com/photo/car-dealership-customer-purchase-agreement-36730221/) |
| `images/interior.jpg` | [Unsplash](https://unsplash.com/photos/vyvYqNO81CM) |
| `images/road.jpg` | [Unsplash](https://unsplash.com/photos/lqd2nynliu8) |
| `images/inspection.jpg` | [Unsplash](https://unsplash.com/photos/8t6tk7LYLrE) |

Car-maker logos come from [simple-icons](https://simpleicons.org/) (CC0) and are used only to identify the brands in
stock. Some photos show real brand badges and license plates; swap them for the client's own photos before launch.
