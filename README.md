# Wizend CLI Tool

[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/ovictorvasconcelos/wizend-cli-tool/releases)
[![Build Status](https://travis-ci.org/ovictorvasconcelos/wizend-cli-tool.svg?branch=main)](https://travis-ci.org/ovictorvasconcelos/wizend-cli-tool)

Wizend is a command-line interface (CLI) tool designed to manage projects quickly and efficiently. With Wizend, you can create Node, React and Next projects.

## Features

- Create a new project in Node.js, React.js, or Next.js, with optional TypeScript support.
- Delete an existing project.
- Link a project to a GitHub repository.
- View local Git repositories.

## Installation

To install Wizend, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/ovictorvasconcelos/wizend-cli-too.git
    ```

2. Navigate to the project directory:
    ```sh
    cd wizend-cli-tool
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Link the tool globally:
    ```sh
    npm link
    ```

## Usage

Once installed, you can use Wizend via the command line:

## Example Usage
### To create a new project, run:

```sh
cli-tool-wizend --create
```

You will be prompted to provide the project name, project type (Node, React, or Next), author name, and whether to use TypeScript.

### To delete a project, run:

```sh
cli-tool-wizend --delete
```

You will be prompted to provide the project name and confirm that you really want to delete the project.

### To link to a repository on Github, run

```sh
cli-tool-wizend --link
```

You will be prompted to provide the project name and github repository url.

### To list local git repositories, run:

```sh
cli-tool-wizend --list-repos
```

You'll get a list of all the local git repositories

## Project Structure

```
/wizend-cli-tool
    /bin
        index.js
    /src
        /commands
            create.js
            delete.js
            listRepositories.js
        /logger.js
        /templates
            nodeProject.js
            reactProject.js
            nextProject.js
        /utils
            gitUtils.js
            npmUtils.js
    .gitignore
    LICENSE.md
    package.json
    README.md
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

### How to Contribute

- Fork the repository.
- Create your feature branch (git checkout -b feature/AmazingFeature).
- Commit your changes (git commit -m 'Add some AmazingFeature').
- Push to the branch (git push origin feature/AmazingFeature).
- Open a pull request.

# License

Distributed under the MIT <code>LICENSE.md</code>. See LICENSE for more information.