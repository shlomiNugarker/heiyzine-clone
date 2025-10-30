# 🚀 Deployment Guide - FlipBook Viewer

## Vercel Deployment (Current)

Your site is deployed at: **https://heiyzine-clone.vercel.app**

### Environment Variables to Add in Vercel

Go to your Vercel project settings → Environment Variables and add:

```env
# Required
NEXT_PUBLIC_SITE_URL=https://heiyzine-clone.vercel.app
NEXT_PUBLIC_SITE_NAME=FlipBook Viewer

# Optional - Analytics (add when ready)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Optional - Database (when you set it up)
DATABASE_URL=postgresql://user:pass@host:5432/db

# Optional - Sentry (for error tracking)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx

# SEO Verification (get these from Google/Bing Search Console)
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_code
NEXT_PUBLIC_BING_VERIFICATION=your_code

# Processing Limits
NEXT_PUBLIC_MAX_FILE_SIZE=52428800
NEXT_PUBLIC_MAX_PAGES=500

# Localization
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_SUPPORTED_LOCALES=en,he,es,fr,de,ja,zh
```

### Post-Deployment Checklist

#### 1. Google Search Console Setup
- [ ] Go to [Google Search Console](https://search.google.com/search-console)
- [ ] Add property: `https://heiyzine-clone.vercel.app`
- [ ] Verify ownership using verification code
- [ ] Submit sitemap: `https://heiyzine-clone.vercel.app/sitemap.xml`

#### 2. Google Analytics Setup
- [ ] Create GA4 property at [Google Analytics](https://analytics.google.com)
- [ ] Get Measurement ID (starts with G-)
- [ ] Add to Vercel environment variables
- [ ] Redeploy

#### 3. Google Tag Manager (Optional)
- [ ] Create container at [Google Tag Manager](https://tagmanager.google.com)
- [ ] Get Container ID (starts with GTM-)
- [ ] Add to Vercel environment variables
- [ ] Configure tags in GTM dashboard

#### 4. Bing Webmaster Tools
- [ ] Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Add site
- [ ] Verify ownership
- [ ] Submit sitemap

#### 5. Performance Testing
- [ ] Test on [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Target: 90+ score on all metrics
- [ ] Test on [GTmetrix](https://gtmetrix.com/)
- [ ] Test mobile responsiveness

#### 6. SEO Verification
- [ ] Test structured data at [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verify Open Graph tags with [OpenGraph.xyz](https://www.opengraph.xyz/)
- [ ] Test Twitter Cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

#### 7. Security Headers Check
- [ ] Test at [Security Headers](https://securityheaders.com/)
- [ ] Should get A or A+ rating
- [ ] Verify CSP is working

#### 8. Social Media Setup
- [ ] Create Twitter account (optional)
- [ ] Create Facebook page (optional)
- [ ] Share on social media for initial traffic

#### 9. Monitoring Setup

**Vercel Analytics (Built-in)**
- Already enabled by default
- View at Vercel Dashboard → Analytics

**Sentry for Error Tracking** (when ready)
1. Create account at [Sentry.io](https://sentry.io)
2. Create new project (Next.js)
3. Get DSN
4. Add to environment variables
5. Install Sentry SDK:
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard@latest -i nextjs
   ```

#### 10. Database Setup (Optional - for production features)

**PostgreSQL (Recommended)**
- [ ] Create database at [Neon](https://neon.tech) or [Supabase](https://supabase.com)
- [ ] Get connection string
- [ ] Add DATABASE_URL to Vercel
- [ ] Run migrations:
  ```bash
  npm run db:push
  ```

**Alternative: MongoDB**
- [ ] Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Get connection string
- [ ] Update Prisma schema to use MongoDB
- [ ] Run migrations

### Custom Domain Setup (Optional)

1. **Purchase Domain** (if you want custom domain)
   - GoDaddy, Namecheap, Google Domains, etc.

2. **Add to Vercel**
   - Go to Vercel project → Settings → Domains
   - Add your domain (e.g., `flipbook-viewer.com`)
   - Follow DNS configuration instructions

3. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

4. **Update Files**
   - Update `robots.txt` sitemap URL
   - Redeploy

### Performance Optimization Tips

#### Images
- Add your images to `/public` folder
- Create optimized versions:
  - `og-image.jpg` (1200x630px) for Open Graph
  - `twitter-image.jpg` (1200x600px) for Twitter
  - Icons: 16x16, 32x32, 192x192, 512x512
  - `apple-touch-icon.png` (180x180px)

#### CDN (Optional)
- For heavy traffic, consider Cloudflare CDN
- Or use Vercel's edge network (already enabled)

### Scaling Considerations

When you reach **10,000+ users/month**:
- [ ] Enable database for user content storage
- [ ] Add Redis for rate limiting (Upstash Redis)
- [ ] Consider CDN for static assets
- [ ] Monitor costs in Vercel dashboard

When you reach **100,000+ users/month**:
- [ ] Upgrade Vercel plan if needed
- [ ] Add caching layer (Redis/Memcached)
- [ ] Consider serverless database (PlanetScale, Neon)
- [ ] Enable auto-scaling

When you reach **1,000,000+ users/month**:
- [ ] Consider dedicated infrastructure
- [ ] Add load balancing
- [ ] Implement CDN for all assets
- [ ] Professional monitoring (Datadog, New Relic)

### Maintenance Schedule

**Daily:**
- Check Vercel Analytics for traffic
- Monitor error rates

**Weekly:**
- Review Google Analytics
- Check Search Console for issues
- Review performance metrics

**Monthly:**
- Security updates: `npm audit fix`
- Dependency updates: `npm update`
- Review and optimize slow pages
- Check SEO rankings

### Troubleshooting

**Build Fails:**
```bash
# Clear cache and rebuild
vercel --force

# Or in Vercel dashboard: Settings → Clear Build Cache
```

**Middleware Warning:**
- This is expected with Next.js 16
- Can be safely ignored
- Will be fixed in future updates

**Turbopack Warning:**
- Already fixed with `turbopack: {}` in config
- Turbopack is faster than webpack

**PDF Processing Issues:**
- Check file size limits
- Verify pdfjs-dist is installed
- Check browser console for errors

### Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js 16 Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Issue Tracker:** Create issues on your GitHub repo

---

## Quick Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server locally
npm run start

# Deploy to Vercel (if using CLI)
vercel --prod

# Database commands
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to DB
npm run db:studio    # Open Prisma Studio

# Code quality
npm run lint         # Check for errors
npm run type-check   # TypeScript check
npm run format       # Format code
```

---

**Your site is live at:** https://heiyzine-clone.vercel.app

Good luck! 🚀
