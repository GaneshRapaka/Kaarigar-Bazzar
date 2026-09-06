import fs from 'fs';
import path from 'path';

const targetDir = 'C:\\Users\\BroGa\\OneDrive\\Desktop\\Kaarigar-Buyer';

// Helper to write file ensuring dir exists
function writeFile(relPath, content) {
  const fullPath = path.join(targetDir, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`Created: ${relPath}`);
}

// Ensure target dir
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. package.json
writeFile('package.json', JSON.stringify({
  name: "kaarigar-buyer",
  private: true,
  version: "0.1.0",
  type: "module",
  scripts: {
    dev: "vite --port 5174",
    build: "tsc -b && vite build",
    preview: "vite preview"
  },
  dependencies: {
    "canvas-confetti": "^1.9.4",
    "lucide-react": "^1.41.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  devDependencies: {
    "@types/canvas-confetti": "^1.9.0",
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "autoprefixer": "^10.5.5",
    "postcss": "^8.5.28",
    "tailwindcss": "^3.4.17",
    "typescript": "~6.0.2",
    "vite": "^8.2.2"
  }
}, null, 2));

// 2. vite.config.ts
writeFile('vite.config.ts', `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    open: true
  }
})
`);

// 3. tsconfig.json
writeFile('tsconfig.json', JSON.stringify({
  files: [],
  references: [
    { path: "./tsconfig.app.json" },
    { path: "./tsconfig.node.json" }
  ]
}, null, 2));

// 4. tsconfig.app.json
writeFile('tsconfig.app.json', JSON.stringify({
  compilerOptions: {
    target: "ES2020",
    useDefineForClassFields: true,
    lib: ["ES2020", "DOM", "DOM.Iterable"],
    module: "ESNext",
    skipLibCheck: true,
    moduleResolution: "bundler",
    allowImportingTsExtensions: true,
    isolatedModules: true,
    moduleDetection: "force",
    noEmit: true,
    jsx: "react-jsx",
    strict: true,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: true
  },
  include: ["src"]
}, null, 2));

// 5. tsconfig.node.json
writeFile('tsconfig.node.json', JSON.stringify({
  compilerOptions: {
    target: "ES2022",
    lib: ["ES2023"],
    module: "ESNext",
    skipLibCheck: true,
    moduleResolution: "bundler",
    allowImportingTsExtensions: true,
    isolatedModules: true,
    moduleDetection: "force",
    noEmit: true,
    strict: true,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: true
  },
  include: ["vite.config.ts"]
}, null, 2));

// 6. postcss.config.js
writeFile('postcss.config.js', `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`);

// 7. tailwind.config.js
writeFile('tailwind.config.js', `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: '#C85A32',
          hover: '#B54C26',
          dark: '#933B1B',
          light: '#FAEDE6',
          soft: '#F5DDD3',
        },
        indigo: {
          dye: '#1F3A52',
          deep: '#15293A',
          light: '#E8EFF5',
        },
        mustard: {
          DEFAULT: '#D9822B',
          light: '#FEF5E7',
        },
        artisan: {
          bg: '#FAF7F2',
          card: '#FFFFFF',
          cream: '#F4ECE1',
          sand: '#EFE7DA',
          border: '#E8DEC9',
          text: '#2B2521',
          muted: '#766D64',
          subtle: '#9E9488',
        },
        forest: {
          DEFAULT: '#2E7D32',
          light: '#E8F5E9',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        telugu: ['"Noto Sans Telugu"', 'sans-serif'],
      },
      boxShadow: {
        'craft': '0 2px 10px rgba(200, 90, 50, 0.12)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'elevated': '0 12px 36px -4px rgba(43, 37, 33, 0.14)',
      },
    },
  },
  plugins: [],
}
`);

// 8. index.html
writeFile('index.html', `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kaarigar Bazaar | Direct Handcrafted Heritage Marketplace</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-[#FAF7F2] text-artisan-text antialiased selection:bg-terracotta selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

// 9. favicon.svg
writeFile('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
  <circle cx="24" cy="24" r="22" fill="#C85A32"/>
  <path d="M14 34L24 14L34 34H28L24 24L20 34H14Z" fill="#FAF7F2"/>
  <circle cx="24" cy="21" r="3" fill="#D9822B"/>
</svg>`);

// Copy assets from Kaarigar-Bazaar/public/assets to Kaarigar-Buyer/public/assets
const srcAssetsDir = path.resolve('public/assets');
const destAssetsDir = path.join(targetDir, 'public', 'assets');
if (!fs.existsSync(destAssetsDir)) {
  fs.mkdirSync(destAssetsDir, { recursive: true });
}
if (fs.existsSync(srcAssetsDir)) {
  const files = fs.readdirSync(srcAssetsDir);
  for (const f of files) {
    fs.copyFileSync(path.join(srcAssetsDir, f), path.join(destAssetsDir, f));
    console.log(`Copied asset: ${f}`);
  }
}

console.log('Base configs and assets generated successfully.');
