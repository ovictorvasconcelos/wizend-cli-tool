import fs from "fs";
import path from "path";
import { promisify } from "util";

const makeDirAsync = promisify(fs.mkdir);
const writeAsyncFile = promisify(fs.writeFile);

export async function createReactProject(projectDirectory, useTypeScript, projectAuthor, projectDescription) {
    const packageContent = {
        name: path.basename(projectDirectory),
        version: "1.0.0",
        scripts: {
            start: "vite",
            build: "vite build",
            preview: "vite preview"
        },
        author: projectAuthor,
        description: projectDescription,
        dependencies: {
            "react": "^18.2.0",
            "react-dom": "^18.2.0"
        },
        devDependencies: {
            "vite": "^4.0.0",
            "@vitejs/plugin-react": "^4.0.0",
            ...(useTypeScript && {
                "typescript": "^5.0.0",
                "@types/react": "^18.0.0",
                "@types/react-dom": "^18.0.0"
            })
        }
    };

    await writeAsyncFile(
        path.join(projectDirectory, 'package.json'),
        JSON.stringify(packageContent, null, 2)
    );

    await makeDirAsync(path.join(projectDirectory, 'src'));

    const mainFileContent = useTypeScript
        ? `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport './index.css';\n\nconst App = () => <div>Hello, TypeScript React!</div>;\n\nReactDOM.render(<App />, document.getElementById('root'));\n`
        : `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport './index.css';\nimport App from './App';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n<React.StrictMode>\n<App />\n</React.StrictMode>\n);`;
    
    const indexHTMLContent = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${path.basename(projectDirectory)}</title>
        </head>
        <body>
            <div id="root"></div>
            <script type="module" src="/src/${useTypeScript ? 'main.tsx' : 'main.jsx'}"></script>
        </body>
    </html>`;

    const viteConfigContent = `
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';
    
    export default defineConfig({
        plugins: [react()],
        server: {
            open: true
        }
    });`;

    const tsConfigContent = `
    {
        "compilerOptions": {
            "target": "ESNext",
            "module": "ESNext",
            "lib": ["DOM", "ESNext"],
            "jsx": "react-jsx",
            "moduleResolution": "node",
            "strict": true,
            "esModuleInterop": true,
            "skipLibCheck": true,
            "forceConsistentCasingInFileNames": true
        },
        "include": ["src"]
    }`;

    const defaultAppContent = `import { useState } from 'react';\nimport './App.css';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className=\"App\">\n      <div>\n        <a href=\"https://vitejs.dev\" target=\"_blank\" rel=\"noopener noreferrer\">\n          <img src=\"/vite.svg\" className=\"logo\" alt=\"Vite logo\" />\n        </a>\n        <a href=\"https://reactjs.org\" target=\"_blank\" rel=\"noopener noreferrer\">\n          <img src=\"/react.svg\" className=\"logo react\" alt=\"React logo\" />\n        </a>\n      </div>\n      <h1>Vite + React</h1>\n      <div className=\"card\">\n        <button onClick={() => setCount((count) => count + 1)}>\n          count is {count}\n        </button>\n        <p>\n          Edit <code>src/App.jsx</code> and save to test HMR\n        </p>\n      </div>\n      <p className=\"read-the-docs\">\n        Click on the Vite and React logos to learn more\n      </p>\n    </div>\n  );\n}\n\nexport default App;\n`;
    const defaulCssApp = ".App {\n  text-align: center;\n}\n\n.logo {\n  height: 6rem;\n  padding: 1.5rem;\n  will-change: filter;\n  transition: filter 300ms;\n}\n\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n\n.logo.react:hover {\n  filter: drop-shadow(0 0 2em #61dafbaa);\n}\n\n.card {\n  padding: 2em;\n}\n\n.read-the-docs {\n  color: #888;\n}\n";

    await writeAsyncFile(
        path.join(projectDirectory, 'index.html'),
        indexHTMLContent
    );

    await writeAsyncFile(
        path.join(projectDirectory, 'vite.config.ts'),
        viteConfigContent
    );

    if (useTypeScript) {
        await writeAsyncFile(
            path.join(projectDirectory, 'tsconfig.json'),
            tsConfigContent
        );
    }

    await writeAsyncFile(
        path.join(projectDirectory, 'src', useTypeScript ? 'App.tsx' : 'App.jsx'),
        defaultAppContent
    );
    

    await writeAsyncFile(
        path.join(projectDirectory, 'src', useTypeScript ? 'main.tsx' : 'main.jsx'),
        mainFileContent
    );

    await writeAsyncFile(
        path.join(projectDirectory, 'src', 'App.css'),
        defaulCssApp
    );

    await writeAsyncFile(
        path.join(projectDirectory, 'src', 'index.css'),
        `body { font-family: Arial, sans-serif; }`
    );
}