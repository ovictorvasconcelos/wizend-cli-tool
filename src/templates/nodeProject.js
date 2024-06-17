import fs from "fs";
import path from "path";
import { promisify } from "util";

const makeDirAsync = promisify(fs.mkdir);
const writeAsyncFile = promisify(fs.writeFile);

export async function createNodeProject(projectDirectory, useTypeScript, projectAuthor, projectDescription) {
    const packageContent = {
        name: path.basename(projectDirectory),
        version: "1.0.0",
        scripts: {
            start: useTypeScript ? "ts-node src/index.ts" : "node src/index.js",
            dev: useTypeScript ? "ts-node-dev --respawn src/index.ts" : "nodemon src/index.js"
        },
        author: projectAuthor,
        description: projectDescription,
        dependencies: {
            "express": "^4.19.2"
        },
        devDependencies: {
            ...(useTypeScript && {
                "typescript": "^5.0.0",
                "ts-node": "^10.0.0",
                "ts-node-dev": "^2.0.0",
                "@types/node": "^18.0.0"
            }),
            "nodemon": "^2.0.0"
        }
    };

    await writeAsyncFile(
        path.join(projectDirectory, 'package.json'),
        JSON.stringify(packageContent, null, 2)
    );

    await makeDirAsync(path.join(projectDirectory, 'src'));

    const mainFileContent = useTypeScript
        ? `import express from 'express';\n\nconst app = express();\nconst port = process.env.PORT || 3000;\n\napp.get('/', (req, res) => {\n  res.send('Hello, TypeScript Node!');\n});\n\napp.listen(port, () => {\n  console.log(\`Server is running on port \${port}\`);\n});\n`
        : `const express = require('express');\n\nconst app = express();\nconst port = process.env.PORT || 3000;\n\napp.get('/', (req, res) => {\n  res.send('Hello, Node!');\n});\n\napp.listen(port, () => {\n  console.log(\`Server is running on port \${port}\`);\n});\n`;

    const tsConfigContent = `
    {
        "compilerOptions": {
        "target": "ESNext",
        "module": "CommonJS",
        "lib": ["ESNext"],
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": ["src"]}`;

    await writeAsyncFile(
        path.join(projectDirectory, 'src', useTypeScript ? 'index.ts' : 'index.js'),
        mainFileContent
    );

    if (useTypeScript) {
        await writeAsyncFile(
            path.join(projectDirectory, 'tsconfig.json'),
            tsConfigContent
        );
    }
}