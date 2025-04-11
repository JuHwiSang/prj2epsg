# prj2epsg
Fork of https://github.com/lolastudio/prj2epsg

- Install

```sh
npm i @juhwisang/prj2epsg
```

- From .prj file

```javascript
const { prj2epsg } = require('@juhwisang/prj2epsg');
const fs = require('fs');

fs.readFile('./myproj.prj', async (err, data) => {
    if(!err) console.log(await prj2epsg(data));
});
```

- From GEOGCS / PROJCS string

```javascript
const { epsg2prj } = require('@juhwisang/prj2epsg');
let prj = 'GEOGCS[\"GCS_WGS_1984\",DATUM[\"WGS_1984\",SPHEROID[\"WGS_84\",6378137,298.257223563]],PRIMEM[\"Greenwich\",0],UNIT[\"Degree\",0.017453292519943295]]';

console.log(await prj2epsg(prj));
```

- Methods

| Method | Arguments | Description |
| ----------- | ----------- | ----------- |
| get | projection (String, File), type ('prj', 'epsg') | returns full data object |
| fromPRJ | projection (String, File) | returns epsg code without prefix |
| fromEPSG | projection (String, File) | returns prj projcs / geogcs string |
