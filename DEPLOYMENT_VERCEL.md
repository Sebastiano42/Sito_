# DEPLOYMENT GUIDE - Seba Motion Portfolio
**Step-by-step guide per deploy su Vercel con dominio custom seba.dev**

---

## 📋 PRE-DEPLOYMENT CHECKLIST

Prima di fare il deploy, assicurati che:

- ✅ Codice è pushato su GitHub (main branch)
- ✅ Tutti i test locali passano (`pnpm dev` funziona)
- ✅ Build è corretto (`pnpm build` no errors)
- ✅ Lighthouse score > 85 (target 90+)
- ✅ Mobile responsive testato (Chrome DevTools)
- ✅ Animazioni fluide su desktop e mobile
- ✅ Environment variables configurate
- ✅ Contact form endpoint testato localmente

---

## 🚀 STEP 1: PREPARE GITHUB REPOSITORY

### 1.1 Initialize Git (se non fatto)

```bash
cd seba-motion

# Initialize git
git init

# Create .gitignore (already done by create-next-app)
cat .gitignore

# Stage all files
git add .

# First commit
git commit -m "Initial commit: Seba Motion Portfolio MVP"

# Create main branch (usually default)
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/seba-motion.git

# Push to GitHub
git push -u origin main
```

### 1.2 Verify Repository

Go to https://github.com/YOUR_USERNAME/seba-motion and confirm:
- ✅ Code is visible
- ✅ All files are present
- ✅ Main branch is default
- ✅ No sensitive data exposed

---

## 🌐 STEP 2: SETUP VERCEL ACCOUNT

### 2.1 Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Sign up with GitHub"
4. Authorize GitHub integration
5. Confirm email

### 2.2 Create Vercel Project

```bash
# Option A: Using Vercel CLI (recommended)
npm install -g vercel
vercel

# This will:
# - Ask you to login to Vercel
# - Detect your Next.js project
# - Create project
# - Set up automatic deployments

# Option B: Using Vercel Dashboard
# 1. Go to https://vercel.com/dashboard
# 2. Click "Add New" → "Project"
# 3. Select "Import Git Repository"
# 4. Choose seba-motion repository
# 5. Configure project settings
```

### 2.3 Configure Project Settings (Dashboard)

Go to https://vercel.com/dashboard → seba-motion → Settings

**General:**
- Project name: `seba-motion`
- Framework: `Next.js`
- Node.js version: `18.x` or higher

**Build & Development:**
- Build command: `next build`
- Output directory: `.next`
- Development command: `next dev`
- Root directory: `./`

**Environment Variables:**

Add these variables (source: `.env.local`):

```
NEXT_PUBLIC_CONTACT_ENDPOINT=https://seba.dev/api/contact.php
NEXT_PUBLIC_WHATSAPP_NUMBER=+39XXXXXXXXX
```

**Git Integration:**
- Connected repository: `YOUR_USERNAME/seba-motion`
- Production branch: `main`
- Preview deployments: Enabled (for PRs)
- Auto-deploy: Enabled

---

## 🌍 STEP 3: SETUP DOMAIN (seba.dev)

### 3.1 Domain Registration

If you don't have `seba.dev` yet, register it:

**Registrars:**
- Namecheap (https://www.namecheap.com)
- Google Domains (https://domains.google.com)
- Porkbun (https://porkbun.com)
- GoDaddy (https://www.godaddy.com)

**Steps:**
1. Search for `seba.dev`
2. Add to cart
3. Complete checkout
4. Get nameserver info (we'll configure later)

### 3.2 Connect Domain to Vercel

**In Vercel Dashboard:**

1. Go to seba-motion project
2. Settings → Domains
3. Click "Add Domain"
4. Enter `seba.dev`
5. Click "Add"

**You'll see two options:**

#### Option A: Nameserver Configuration (Recommended)
Vercel will provide nameservers:
```
ns1.vercel.com
ns2.vercel.com
```

**In your domain registrar (Namecheap, Google Domains, etc.):**
1. Go to DNS settings
2. Find "Nameserver" section
3. Replace existing nameservers with Vercel nameservers
4. Save changes
5. Wait 24-48 hours for DNS propagation

#### Option B: CNAME Configuration (Alternative)
Vercel will provide CNAME record:
```
cname.vercel.com
```

**In your domain registrar:**
1. Go to DNS records
2. Create CNAME record:
   - Name: `@` or `www`
   - Value: `cname.vercel.com`
3. Save changes
4. Wait for propagation

**Check DNS Status:**
```bash
# In terminal, check DNS propagation
nslookup seba.dev
dig seba.dev

# Or use online tool: https://mxtoolbox.com/
```

### 3.3 Add SSL Certificate

Vercel automatically provides free SSL via Let's Encrypt:
- HTTPS enabled automatically
- Certificate auto-renews
- Visit https://seba.dev (secure)

---

## 🔧 STEP 4: BACKEND CONTACT FORM (Arura)

### 4.1 Connect to Arura via FTP

**Using FileZilla (free FTP client):**

1. Download FileZilla: https://filezilla-project.org/
2. File → Site Manager → New Site
3. Enter Arura credentials:
   - Host: `sftp://ftp.arura.it` (or your Arura host)
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 22 (SFTP)
   - Logon Type: Normal
4. Connect

### 4.2 Create API Directory

In Arura FTP:
1. Navigate to `/public_html/`
2. Create new folder: `api`
3. Set permissions: 755

### 4.3 Upload Contact Handler

Create file `contact.php` locally:

```php
<?php
// /api/contact.php

// CORS headers
header('Access-Control-Allow-Origin: https://seba.dev');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(json_encode(['status' => 'ok']));
}

// Handle POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Parse JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate input
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $message = trim($input['message'] ?? '');

    // Sanitize input
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email']);
        exit;
    }

    // Check required fields
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    // Simple rate limiting (optional)
    $ip = $_SERVER['REMOTE_ADDR'];
    $rate_limit_file = '/tmp/rate_limit_' . md5($ip) . '.txt';
    $attempts = 0;

    if (file_exists($rate_limit_file)) {
        $data = json_decode(file_get_contents($rate_limit_file), true);
        if (time() - $data['time'] < 3600) { // 1 hour window
            $attempts = $data['attempts'];
        }
    }

    if ($attempts >= 5) {
        http_response_code(429);
        echo json_encode(['error' => 'Too many requests. Try again later.']);
        exit;
    }

    // Update rate limit
    file_put_contents($rate_limit_file, json_encode([
        'attempts' => $attempts + 1,
        'time' => time()
    ]));

    // Prepare email
    $to = 'seba@seba.dev'; // Change to your email
    $subject = "[Seba.dev Contact] New message from {$name}";
    $headers = "From: {$email}\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body = "Name: {$name}\n";
    $body .= "Email: {$email}\n";
    $body .= "IP: {$ip}\n";
    $body .= "Date: " . date('Y-m-d H:i:s') . "\n\n";
    $body .= "Message:\n{$message}\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode([
            'status' => 'success',
            'message' => 'Message sent successfully!'
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send message']);
    }
    exit;
}

// Method not allowed
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
?>
```

Upload via FTP:
1. In FileZilla, drag `contact.php` to `/public_html/api/`
2. Right-click → File permissions → 644
3. Verify: Visit https://seba.dev/api/contact.php (should return JSON)

---

## 📝 STEP 5: CONFIGURE FRONTEND CONTACT FORM

### 5.1 Create Contact Component

```typescript
// app/components/Contact.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CONTACT_ENDPOINT,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }

      setSuccessMessage('Message sent successfully! I\'ll get back to you soon.')
      reset()
      setTimeout(() => setSuccessMessage(''), 5000)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong'
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(''), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto"
    >
      {successMessage && (
        <div className="bg-green-500 text-black p-4 rounded">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-500 text-white p-4 rounded">
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-bold">
          Name
        </label>
        <input
          id="name"
          {...register('name')}
          className="w-full border-2 border-gray-200 p-3 mt-2"
          placeholder="Your name"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-bold">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full border-2 border-gray-200 p-3 mt-2"
          placeholder="your@email.com"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold">
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          className="w-full border-2 border-gray-200 p-3 mt-2 min-h-32"
          placeholder="Your message..."
        />
        {errors.message && (
          <span className="text-red-500 text-sm">{errors.message.message}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white border-2 border-green-500 py-3 font-bold hover:bg-green-500 hover:text-black disabled:opacity-50"
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
```

---

## 🔗 STEP 6: WHATSAPP INTEGRATION

### 6.1 Simple WhatsApp Link

```typescript
// components/WhatsAppButton.tsx
export default function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  const message = 'Ciao Seba, mi interessa parlare di un progetto!'
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-green-500 text-black px-6 py-3 font-bold hover:bg-green-600"
    >
      💬 Contact on WhatsApp
    </a>
  )
}
```

### 6.2 Advanced: WhatsApp Business API (Phase 2)

For Phase 2, you can integrate Twilio or WhatsApp Business API for automated responses:

```typescript
// Backend endpoint for WhatsApp
// /api/whatsapp.php (on Arura)

// Would handle incoming/outgoing WhatsApp messages
// Requires separate setup with Twilio/WhatsApp Business API
```

---

## 🧪 STEP 7: TESTING DEPLOYMENT

### 7.1 Test Contact Form

1. Navigate to https://seba.dev (or deployment URL)
2. Fill contact form
3. Submit
4. Check email for confirmation
5. Verify no errors in Vercel logs

### 7.2 Test Performance

Run Lighthouse audit:

```bash
# Using Lighthouse CLI
npm install -g @lhci/cli@latest
lhci autorun

# Or use DevTools (Chrome)
# F12 → Lighthouse → Analyze page load
```

**Target scores:**
- Performance: > 85 (target 90)
- Accessibility: > 90
- Best Practices: > 85
- SEO: > 90

### 7.3 Test Mobile Responsiveness

```bash
# Using Chrome DevTools
# F12 → Toggle Device Toolbar → Test on different devices
# Check: iPhone 12, iPad, Galaxy S21
```

### 7.4 Test Animations

- ✅ Hero fade-in smooth
- ✅ Scroll animations sync with scroll
- ✅ Hover states responsive
- ✅ Mobile animations simplified (no lag)
- ✅ prefers-reduced-motion respected

---

## 📊 STEP 8: MONITORING & ANALYTICS

### 8.1 Vercel Analytics

Automatic on Vercel dashboard:
- Page performance metrics
- Web Vitals (FCP, LCP, CLS)
- User location, browser, device

Check: https://vercel.com/dashboard → seba-motion → Analytics

### 8.2 Google Analytics (Optional)

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

---

## 🔄 CONTINUOUS DEPLOYMENT

### 8.1 GitHub Workflow

Automatic deployments on GitHub:

1. **Push to main branch:**
```bash
git add .
git commit -m "Update hero animations"
git push origin main
```

2. **Vercel automatically:**
   - Builds project
   - Runs tests
   - Deploys to production
   - Updates live site

3. **Pull Request Preview:**
   - Create feature branch
   - Push to GitHub
   - Create PR
   - Vercel creates preview deployment
   - Review changes
   - Merge to main when ready

### 8.2 Deployment Status

Check deployment status:
- Vercel Dashboard: https://vercel.com/dashboard
- GitHub: https://github.com/YOUR_USERNAME/seba-motion/deployments

---

## 🚨 TROUBLESHOOTING

### Domain Not Resolving

```bash
# Check DNS propagation
nslookup seba.dev
dig seba.dev

# Common issues:
# - DNS changes take 24-48 hours
# - Check nameserver configuration in registrar
# - Verify Vercel nameservers are correct
```

### Contact Form Not Working

1. Check Vercel logs:
   - https://vercel.com/dashboard → seba-motion → Deployments → logs

2. Test endpoint:
```bash
curl -X POST https://seba.dev/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello"}'
```

3. Check Arura PHP:
   - Verify contact.php uploaded correctly
   - Check permissions (644)
   - Test CORS headers

### Performance Issues

1. Run Lighthouse audit
2. Check Vercel Analytics
3. Optimize images
4. Check bundle size
5. Disable/simplify animations on mobile

---

## ✅ POST-DEPLOYMENT CHECKLIST

- ✅ Domain resolves to seba.dev
- ✅ HTTPS working (green lock)
- ✅ Contact form submits successfully
- ✅ Email received in inbox
- ✅ WhatsApp link works
- ✅ Lighthouse score > 85
- ✅ Mobile responsive
- ✅ Animations smooth on desktop and mobile
- ✅ No console errors
- ✅ Analytics tracking

---

## 📞 SUPPORT

**Vercel Issues:**
- https://vercel.com/docs
- https://vercel.com/support

**Domain/DNS Issues:**
- Contact domain registrar support
- Use https://mxtoolbox.com/ for DNS debugging

**Arura FTP Issues:**
- Contact Arura support
- Verify FTP credentials

---

**Deployment Complete! 🎉**

Your seba.dev portfolio is now live with:
- ✅ Interactive scrollytelling website
- ✅ Smooth animations with GSAP
- ✅ Contact form with email integration
- ✅ WhatsApp integration
- ✅ Mobile-responsive design
- ✅ High performance (90+ Lighthouse)
- ✅ Custom domain (seba.dev)
- ✅ Automatic deployments from GitHub
