import fs from 'fs-extra';

const srcDir = `../src/templates`;
const destDir = `../build/templates`;

try {
  fs.copySync(srcDir, destDir, { overwrite: true | false });
  console.log('Copy template success!');
} catch (err) {
  console.error(err);
}
