import { epsg2prj, prj2epsg } from '../src/index';

async function main() {
    const prj: string = 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]]';

    if (await prj2epsg(prj) !== '4326') {
        console.error('prj2epsg failed: ', await prj2epsg(prj));
        process.exit(-1);
    }

    if (await epsg2prj(4326) !== prj) {
        console.error('epsg2prj failed: ', await epsg2prj(4326));
        process.exit(-1);
    }

    console.log('OK');
    process.exit(0);
}

main();