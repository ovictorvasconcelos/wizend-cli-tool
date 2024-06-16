import fs from "fs";
import path from "path";
import { promisify } from "util";

const makeDirAsync = promisify(fs.mkdir);
const writeAsyncFile = promisify(fs.writeFile);

export async function createReactProject(projectDirectory, useTypeScript) {
    const packageContent = {
        name: path.basename(projectDirectory),
        version: "1.0.0",
        scripts: {
            start: "react-scripts start",
            build: "react-scripts build",
            test: "react-scripts test",
            eject: "react-scripts eject"
        }
    };

    await writeAsyncFile(
        path.join(projectDirectory, 'package.json'),
        JSON.stringify(packageContent, null, 2)
    );

    await makeDirAsync(path.join(projectDirectory, 'src'));
    const mainFileContent = useTypeScript
        ? `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport './index.css';\n\nconst App = () => <div>Hello, TypeScript React!</div>;\n\nReactDOM.render(<App />, document.getElementById('root'));\n`
        : `import React from 'react';\nimport ReactDOM from 'react-dom';\nimport './index.css';\n\nconst App = () => <div>Hello, React!</div>;\n\nReactDOM.render(<App />, document.getElementById('root'));\n`;
    
    await writeAsyncFile(
        path.join(projectDirectory, 'src', useTypeScript ? 'index.tsx' : 'index.js'),
        mainFileContent
    );
}