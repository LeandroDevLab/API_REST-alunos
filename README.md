# Instalando na pasta do projeto

### Iniciando

`npm init -y`

Wrote to .../projects/API_REST/package.json:

```bash
{
  "name": "api_rest",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}

```

### Configurando o ESLINT

`npx eslint --init`

You can also run this command directly using 'npm init @eslint/config@latest'.

> api_rest@1.0.0 npx
> create-config

@eslint/create-config: v1.10.0

- What do you want to lint? · `javascript`
- How would you like to use ESLint? · `problems`
- What type of modules does your project use? · `esm`
- Which framework does your project use? · `none`
- Does your project use TypeScript? · `No` / Yes
- Where does your code run? · `node`

The config that you've selected requires the following dependencies:

eslint, @eslint/js, globals

- Would you like to install them now? · No / `Yes`
- Which package manager do you want to use? · `npm`
  ☕️Installing...

added 87 packages, and audited 88 packages in 6s

24 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
Successfully created /home/leandro/Documentos/projects/API_REST/eslint.config.mjs file.

#### Instalando as devDependences

`npm i nodemon sucrase --save-dev`

#### Instalando o express 4.21 compatível com as configurações do projeto

`npm install express@4.21.0`
