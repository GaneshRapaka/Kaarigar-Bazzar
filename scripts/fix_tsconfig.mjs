import fs from 'fs';
import path from 'path';

const targetDir = 'C:\\Users\\BroGa\\OneDrive\\Desktop\\Kaarigar-Buyer';

// Update tsconfig.app.json
fs.writeFileSync(path.join(targetDir, 'tsconfig.app.json'), JSON.stringify({
  compilerOptions: {
    target: "es2023",
    lib: ["ES2023", "DOM"],
    module: "esnext",
    types: ["vite/client"],
    allowArbitraryExtensions: true,
    skipLibCheck: true,
    moduleResolution: "bundler",
    allowImportingTsExtensions: true,
    verbatimModuleSyntax: false,
    moduleDetection: "force",
    noEmit: true,
    jsx: "react-jsx",
    noUnusedLocals: false,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: true
  },
  include: ["src"]
}, null, 2));

// Add vite-env.d.ts
fs.writeFileSync(path.join(targetDir, 'src', 'vite-env.d.ts'), `/// <reference types="vite/client" />
`);

console.log('Fixed tsconfig and added vite-env.d.ts');
