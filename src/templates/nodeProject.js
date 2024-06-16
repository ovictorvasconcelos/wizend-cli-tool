import fs from "fs";
import path from "path";
import { promisify } from "util";

const writeAsyncFile = promisify(fs.writeFile);

export async function createNodeProject(projectDirectory, useTypeScript) {
    const packageContent = {
        name: path.basename(projectDirectory),
        version: "1.0.0",
        main: "index.js",
        scripts: {
            start: useTypeScript ? "ts-node index.ts" : "node index.js"
        }
    };

    const mainFileContent = useTypeScript
        ? `console.log('Hello, TypeScript!');`
        : `console.log('Hello, Node.js!');`;
    
    await writeAsyncFile(
        path.join(projectDirectory, 'package.json'),
        JSON.stringify(packageContent, null, 2)
    );

    await writeAsyncFile(
        path.join(projectDirectory, useTypeScript ? 'index.ts' : 'index.js'),
        mainFileContent
    );
}