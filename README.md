<p align="center"><img src="https://raw.githubusercontent.com/samuel-gomez/react-starter-vitejs/main/src/assets/slash-logo.svg" width=250></p>
<h2 align="center">React Starter Toolkit</h2>

<p align="center">
  <strong>A starter based on <a href="https://vitejs.dev/">Vite</a> and Slash
    Design System (<a href="https://axafrance.github.io/design-system/">Guidelines</a>, <a
      href="https://axafrance.github.io/react-toolkit/latest/storybook/?path=/story/alert-alert--default">Storybook</a>)</strong>
  <br><br>

</p>
<p align="center">
  <a href="https://github.com/samuel-gomez/react-starter-vitejs/actions/workflows/build.yml">
    <img alt="Build" src="https://github.com/samuel-gomez/react-starter-vitejs/actions/workflows/build.yml/badge.svg">
  </a>
  <a href="http://commitizen.github.io/cz-cli/">
    <img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg">
  </a>
  </a>
 <a href="https://codecov.io/gh/samuel-gomez/react-starter-vitejs" > 
 <img src="https://codecov.io/gh/samuel-gomez/react-starter-vitejs/branch/main/graph/badge.svg?token=pSOetPjFk7"/> 
 </a>
  </a>
  <a href="https://app.netlify.com/sites/react-starter-vitejs/deploys">
    <img alt="Netlify Status"
      src="https://api.netlify.com/api/v1/badges/c496aa9a-8801-4a32-9571-547bd4ea5ea3/deploy-status">
  </a>
  </a>
  <a href="https://sonarcloud.io/dashboard?id=samuel-gomez_react-starter-vitejs">
    <img alt="Quality Gate Status"
      src="https://sonarcloud.io/api/project_badges/measure?project=samuel-gomez_react-starter-vitejs&metric=alert_status">
  </a>
  </a>
  <a href="https://sonarcloud.io/component_measures?id=samuel-gomez_react-starter-vitejs&metric=reliability_rating">
    <img alt="Reliability"
      src="https://sonarcloud.io/api/project_badges/measure?project=samuel-gomez_react-starter-vitejs&metric=reliability_rating">
  </a>
  <a href="https://sonarcloud.io/component_measures?id=samuel-gomez_react-starter-vitejs&metric=security_rating">
    <img alt="Security"
      src="https://sonarcloud.io/api/project_badges/measure?project=samuel-gomez_react-starter-vitejs&metric=security_rating">
  </a>
</p>

<h2 align="center">Demo 😎</h2>
<p align="center">
  <img src="src/assets/screenshot-demo.png" style="width: 70%;">
</p>
<p align="center"><a href="https://react-starter-vitejs.netlify.app/">You can see a demo here</a></p>

## Installation 🚀

> Requirement : Node > 18

### Cloning

```
git clone https://github.com/samuel-gomez/react-starter-vitejs.git
```

> For VSCode users, you can open the workspace directly by double clicking on the app.code-workspace file

### 🚨 Before installation 🚨

If you want to clean this demo, you have to launch (**node required)**:

```
npm run clean
```

This script delete all files of the demo (see the [CLEAN.md](./docs/CLEAN.md) file)

After that, you can run :

```
npm i
```

you have to update snapshots

```
npm t -- -u
```

### Remote

```
git init
git add .
git commit -m "Initial Commit"
git remote add origin $repo__url
git push -u origin master
```

## Configuration ⚙️

After installation, you have to personalize some parameters, you can check it in the [CONFIG.md](./docs/CONFIG.md) file

## Available Scripts

In the project directory, you can run :

### `npm start` 🏁

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test` or `npm t` 🔬

Launches the test runner in the interactive watch mode.<br />

### `npm run cover:local`

Launches the test runner with **coverage and all warnings**.

### `npm run cover` ☂

Launches the test runner with **coverage and no warning** (silent mode).

### `npm run build` 📦

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run cz` ⛩

If you want a helper to respect the conventional commits naming, **Commitizen** give a cli interface.

![commitizen](./docs/images/commitizen.png)

### `npm run lint` 👮‍♂️

Script to launch eslint analyse (see the [eslintrc.cjs](./.eslintrc.cjs) file)

### `npm run lint:fix` 👮‍♂️⛑

Script to launch **eslint** analyse with **auto fix**.

### `npm run prettier` 🎩

Script to launch prettier analyse (see the [prettierrc.cjs](./.prettierrc.cjs) file)

### `npm run prettier:fix` 🎩⛑

Script to launch **prettier** analyse with **auto fix**.

### `npm run check` 👍

Script to launch **eslint** analyse and **prettier** analyse with **auto fix**.

### `npm run prepare` 🐶

Script to launch **husky** installation, it's launched during the global installation.

## Issues 🐞

If you detect a **bug**, please create an issue :
https://github.com/samuel-gomez/react-starter-vitejs/issues

## Quality 💎

### SonarCloud

https://sonarcloud.io/project/overview?id=samuel-gomez_react-starter-vitejs

## Structure

See the [STRUCTURE.md](./docs/STRUCTURE.md) file
