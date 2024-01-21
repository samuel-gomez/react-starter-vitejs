import fs from 'fs-extra';
const basePath = '../';

function deleteFolderRecursive(path) {
  if (!fs.existsSync(path)) return console.log(`${path} does not exist!`);
  if (fs.existsSync(path)) {
    if (fs.lstatSync(path).isDirectory()) {
      fs.readdirSync(path).forEach(function (file) {
        const curPath = `${path}/${file}`;

        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });

      console.log(`Deleting directory "${path}"...`);
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }
}

const pathsDelete = [
  './src/templates',
  './public/images',
  './public/_redirect',
  './src/pages/Home/Galleries',
  './src/assets',
  './src/shared/testsUtils/clearString.ts',
  './src/shared/components/LiveCode',
  './src/shared/components/Cards',
  './src/shared/components/LazyImage',
  './src/shared/components/DownloadLink',
  './src/shared/components/Editor',
  './src/pages/Demos',
  './features/Demos',
  'renovate.json',
  'netlify.toml',
  'LICENSE',
  './docs',
  '.github',
  'package-lock.json',
];

console.log('Cleaning working tree...');
pathsDelete.forEach(path => deleteFolderRecursive(`${basePath}${path}`));
console.log('Successfully cleaned working tree!');

function replaceContentsSync(file, replacement) {
  const contents = fs.readFileSync(replacement);
  fs.writeFileSync(file, contents);
}

const pathsReplace = [
  'package.json',
  'starter.code-workspace',
  'README.md',
  'features/Home/Home.feature',
  'src/shared/constants.ts',
  'src/shared/testsUtils/constants.ts',
  'src/pages/Home/Home.tsx',
  'src/pages/Home/__tests__/Home.spec.tsx',
  'src/Layout/Menu/constants.ts',
  'src/Layout/Header/Header.tsx',
  'src/Layout/Header/Header.scss',
  'src/Layout/Header/constants.ts',
  'src/App/Routes/Routes.tsx',
  'src/App/Routes/constants.ts',
  'src/App/Routes/__tests__/Routes.test.tsx',
  'public/favicon.ico',
  'public/environment.development.json',
  'index.html',
  '.eslintrc.cjs',
];

console.log('Cleaning files...');
pathsReplace.forEach(file => replaceContentsSync(`${basePath}${file}`, `./files/${file}`));
console.log('Successfully cleaned files!');
