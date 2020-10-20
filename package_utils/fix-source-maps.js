/*
Bug: https://github.com/apollographql/apollo-client/issues/3699
Description: Source maps points to non existing files in apollo client package causing terminal warnings using parcel
Work around: Run 'node fix-maps.js' in npm start script to avoid source maps warnings after installning apollo client npm package
*/

/* eslint-disable */
const fs = require('fs');
const path = require('path');
async function* walk(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isDirectory()) yield* walk(entry);
        else if (d.isFile()) yield entry;
    }
}
async function main() {
    let counter = 0;
    for await (const p of walk(path.resolve('./node_modules/@apollo/client'))) {
      counter++;
      if (p.indexOf('.js.map') !== -1) {
        const mappath = p;
        const jspath = p.replace('.map', '');
        // @TODO: Make these async for more perf.
        const js = fs.readFileSync(jspath, {encoding:'utf8', flag:'r'});
        const map = JSON.parse(fs.readFileSync(mappath, {encoding:'utf8', flag:'r'}));
        // Add missing source content to the .map files.
        map.sourcesContent = js;
        fs.writeFileSync(mappath, JSON.stringify(map));
      }
    }
/*     console.log(`Updated ${parseInt(counter)} files`); */
}
main();