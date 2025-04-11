import * as fs from 'fs/promises';
import * as path from 'path';

interface CoordinateSystem {
    prj: string;
    epsg: number;
}

interface BufferObject {
    buffer: { byteLength: number };
    toString(): string;
}

type PrjInput = string | BufferObject | undefined;
type EpsgInput = string | number;

let crsArray: CoordinateSystem[] | null = null;
let crsByPrj: Map<string, CoordinateSystem> | null = null;
let crsByEpsg: Map<number, CoordinateSystem> | null = null;

export async function prj2epsg(prj: PrjInput): Promise<string | undefined> {
    const crs = await get(prj, 'prj');
    return crs.epsg?.toString();
}

export async function epsg2prj(epsg: EpsgInput): Promise<string | undefined> {
    const crs = await get(epsg.toString(), 'epsg');
    return crs.prj;
}

async function init() {
    crsArray = JSON.parse(await fs.readFile(path.join(__dirname, '..', 'resources', 'data.json'), 'utf8')) as CoordinateSystem[];
    crsByPrj = new Map(crsArray.map(crs => [crs.prj, crs]));
    crsByEpsg = new Map(crsArray.map(crs => [crs.epsg, crs]));
}

export async function get(prj: PrjInput, type: 'prj' | 'epsg' = 'prj'): Promise<Partial<CoordinateSystem>> {
    if (!crsArray) {
        await init();
    }

    if (prj) {
        if (typeof prj === 'object') {
            if ('buffer' in prj && prj.buffer.byteLength) {
                return findBy(prj.toString(), type) || {};
            } else {
                console.log('[prj2epsg] Invalid object');
                return {};
            }
        } else {
            return findBy(prj.toString(), type) || {};
        }
    } else {
        return {};
    }
}

function findBy(prj: string, type: 'prj' | 'epsg'): CoordinateSystem | null {
    if (type === 'prj') {
        return crsByPrj?.get(prj) ?? null;
    } else {
        return crsByEpsg?.get(Number(prj)) ?? null;
    }
}
