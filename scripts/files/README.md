<p align="center"><img src="src/shared/images/slash-logo.svg" width=250></p>
<h2 align="center">React Starter Toolkit</h2>

<p align="center">
  <strong>A starter based on Slash Design System (<a href="https://axaguildev.github.io/design-system/">Guidelines</a>, <a
      href="https://axaguildev.github.io/react-toolkit/latest/storybook/?path=/story/alert-alert--default">Storybook</a>)</strong>
  <br><br>

## Installation 🚀

```
git clone my-repository-url.git
```

> For VSCode users, you can open the workspace directly by double clicking on the app.code-workspace file

### 🚨 Before installation 🚨

If you want to clean this demo, you have to launch (node required):

```
npm run clean
```

This script delete all files of the demo (see the [CLEAN.md](./docs/CLEAN.md) file)

You can run :

```
npm i
```

## Available Scripts

In the project directory, you can run:

### `npm start` 🏁

Runs the app in the development mode.<br />
Open [http://localhost:9999](http://localhost:9999) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test` or `npm t` 🔬

Launches the test runner in the interactive watch mode.<br />

### `npm run cover:local`

Launches the test runner with coverage and all warnings.

### `npm run cover` ☂

Launches the test runner with coverage and no warning (silent mode).

### `npm run build` 📦

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run cz` ⛩

If you want a helper to respect the conventional commits naming, Commitizen give a cli interface.

![commitizen](./docs/images/commitizen.png)

### `npm run lint` 👮‍♂️

Script to launch eslint analyse (see the [.eslintrc.cjs](./.eslintrc.cjs) file)

### `npm run lint:fix` 👮‍♂️⛑

Script to launch eslint analyse with auto fix.

### `npm run prettier` 🎩

Script to launch prettier analyse (see the [..prettierrc.cjs](./.prettierrc.cjs) file)

### `npm run prettier:fix` 🎩⛑

Script to launch prettier analyse with auto fix.

### `npm run check` 👍

Script to launch eslint analyse and prettier analyse with auto fix.

### `npm run prepare` 🐶

Script to launch husky installation, it's launched during the global installation.
