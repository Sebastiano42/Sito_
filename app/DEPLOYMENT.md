# 🚀 Deployment Guide - Motion Design Site

## Build Status
✅ Production build completato con successo!
- Build size: ~590 KB (index.html + assets)
- Gzip size: ~165 KB
- Build time: 6s

---

## Opzioni di Deployment

### 1. 🎯 Netlify (Consigliato - Più Semplice)

#### Opzione A: Deploy tramite CLI
```bash
# Installa Netlify CLI (se non già installato)
npm install -g netlify-cli

# Login a Netlify
netlify login

# Deploy del sito
netlify deploy --prod
```

Segui le istruzioni:
- **Publish directory**: `dist`
- Il sito sarà live in pochi secondi!

#### Opzione B: Deploy tramite Drag & Drop
1. Vai su [app.netlify.com/drop](https://app.netlify.com/drop)
2. Trascina la cartella `dist` nell'area di drop
3. Il sito sarà online immediatamente!

#### Opzione C: Deploy tramite Git (CI/CD)
1. Pusha il codice su GitHub
2. Connetti il repo a Netlify
3. Netlify rileverà automaticamente la configurazione da `netlify.toml`

---

### 2. ⚡ Vercel (Ottimizzato per Vite)

#### Deploy tramite CLI
```bash
# Installa Vercel CLI (se non già installato)
npm install -g vercel

# Login a Vercel
vercel login

# Deploy del sito
vercel --prod
```

#### Deploy tramite Git
1. Pusha il codice su GitHub
2. Vai su [vercel.com/new](https://vercel.com/new)
3. Importa il repository
4. Vercel rileverà automaticamente Vite e userà `vercel.json`

---

### 3. 📦 GitHub Pages

#### Setup
```bash
# Installa gh-pages
npm install -D gh-pages

# Aggiungi script a package.json
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

**Nota**: Modifica `vite.config.ts` se il repo non è root:
```ts
export default defineConfig({
  base: '/nome-repo/', // Solo se il repo non è username.github.io
  // ...resto config
})
```

---

### 4. 🎨 Render

1. Vai su [render.com](https://render.com)
2. New → Static Site
3. Connetti il repo GitHub
4. Configura:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

---

## 🔍 Preview Locale del Build

Prima di deployare, puoi testare il build in locale:

```bash
npm run preview
```

Questo avvierà un server locale con i file di produzione da `dist/`.

---

## 📊 Performance Checklist

Prima del deploy, verifica:
- ✅ Build completato senza errori
- ✅ Assets ottimizzati (immagini, fonts)
- ✅ Lazy loading implementato
- ✅ Meta tags SEO configurati
- ✅ Favicon presente
- ✅ Smooth scrolling (Lenis) funzionante
- ✅ Animazioni performanti (GSAP)
- ✅ Responsive su tutti i device

---

## 🎯 Post-Deployment

Dopo il deploy:
1. Testa il sito live su diversi browser
2. Verifica performance con Lighthouse
3. Controlla responsive su mobile/tablet
4. Testa tutte le animazioni
5. Verifica che le texture siano caricate
6. Controlla console per errori

---

## 📝 Note

- **Custom Domain**: Puoi aggiungere un dominio custom su Netlify/Vercel dopo il deploy
- **HTTPS**: Tutte le piattaforme forniscono HTTPS gratuito
- **CI/CD**: Con GitHub + Netlify/Vercel, ogni push a `main` triggera auto-deploy
- **Analytics**: Netlify e Vercel offrono analytics built-in

---

## 🆘 Troubleshooting

**Build fallisce su piattaforma remota:**
- Verifica che Node version sia ≥18 (specificato in `netlify.toml`)
- Controlla che tutte le dipendenze siano in `package.json` (no devDependencies)

**Pagina bianca dopo deploy:**
- Verifica che `base: './'` sia in `vite.config.ts`
- Controlla che il path delle risorse sia relativo

**404 su refresh:**
- Verifica che redirects siano configurati (già fatto in `netlify.toml` e `vercel.json`)
