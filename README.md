# 1️⃣ Purpose of the app

**App for a mobile phone catalog created by Ignacio Jimenez**

## ✅ The app lets users:

- Browse a list of phones.
- Search in real time using the API’s `search` parameter.
- View detailed product pages (PDP).
- Add items to a cart (with selected color & storage options).
- Keep the cart in `localStorage` so it survives page reloads.
---

# 2️⃣ Development vs Production Modes in Next.js

### Development mode:

- Command: npm run dev
- Assets are **not minified**.
- We get **source maps** for easier debugging.
- **Hot reloading** (changes appear immediately).

### Production mode:

- Command: npm run build then npm start
- Next.js bundles, concatenates, tree-shakes and minifies all JS and CSS.
- Image optimization, static generation, SSR all fully optimized.

👉 In practice:

We don’t have to manually configure Webpack for minification. Next.js handles it.  
The mode depends purely on which command you use.
---

# 3️⃣ Installation

Node.js in needed (typically v18+ is safe).

Install dependencies with: npm install

---

# 4️⃣ Running in Development

Run: npm run dev

✅ This starts Next.js’s dev server:

- Source maps for debugging
- Hot reload
- Assets served unminified

Great for local development.

Access it at: http://localhost:3000

---

# 5️⃣ Building for Production

Run: npm run build  
Then: npm start

✅ What happens on build:

- Next.js analyzes your pages.
- Pre-renders pages for SSR or static generation.
- Minifies all JavaScript and CSS.
- Concatenates / splits bundles optimally.
- Optimizes images.

✅ Then `start` runs the built app.

---

# 6️⃣ Project Structure Example

The repo is organized like:

```bash 
src/
├── app/ # Next.js App Router pages
├── components/ # Reusable UI components
├── context/ # CartContext and other React contexts
├── hooks/ # Hooks to keep code SOLID
├── lib/ # API calls and utility functions
└── styles/ # CSS Modules and global styles
└── types/ # CSS Modules and global styles
```
---
# 7️⃣ Environment Variables

A `.env.local` file is needed to store secrets (only the API key for now).

Example:
```bash
NEXT_PUBLIC_API_KEY=your-api-key-here
```


✅ `.env.local` is git-ignored.  
✅ In Next.js, variables prefixed with `NEXT_PUBLIC_` are exposed to the client.

---

# 8️⃣ Features Explained

✅ **SSR Home Page:** The main catalog page is server-rendered to improve SEO and load performance.

✅ **Search with API:** Uses the search query param on the API. Input has a debounce for UX.

✅ **Persistent Cart:** Uses React Context + localStorage.

✅ **Product Details Page:** Includes:

- Image gallery
- Color & storage selectors
- Add to cart button
- Specs section
- Similar products grid  

Please, feel free to add any comments and request new features!
Happy coding :) 