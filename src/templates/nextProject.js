import fs from "fs";
import path from "path";
import { promisify } from "util";

const makeDirAsync = promisify(fs.mkdir);
const writeAsyncFile = promisify(fs.writeFile);

export async function createNextProject(projectDirectory, useTypeScript, projectAuthor, projectDescription) {
    const packageContent = {
        name: path.basename(projectDirectory),
        version: "1.0.0",
        scripts: {
            dev: "next dev",
            build: "next build",
            start: "next start"
        },
        author: projectAuthor,
        description: projectDescription
    };

    await writeAsyncFile(
        path.join(projectDirectory, 'package.json'),
        JSON.stringify(packageContent, null, 2)
    );

    await makeDirAsync(path.join(projectDirectory, 'pages'));
    const mainFileContent = useTypeScript
        ? `import React from 'react';\n\nconst Home: React.FC = () => {\n    return <div>Hello, TypeScript Next.js!</div>;\n};\n\nexport default Home;\n`
        : `const Home = () => {\n    return <div>Hello, Next.js!</div>;\n};\n\nexport default Home;\n`;
    
    await writeAsyncFile(
        path.join(projectDirectory, 'pages', useTypeScript ? 'index.tsx' : 'index.js'),
        mainFileContent
    );
}