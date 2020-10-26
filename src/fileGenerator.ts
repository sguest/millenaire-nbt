/// <reference path="../types/file-saver.d.ts" />
/// <reference path="../types/zlib.d.ts" />

import * as JSZip from 'jszip';
import { NbtFile } from './nbtConvert';

export function generateFile(buildings: NbtFile[]): Promise<Blob> {
    let zip = new JSZip();

    for(let building of buildings) {
        zip.file(building.path, new Zlib.Gzip(new Uint8Array(building.data)).compress());
    }

    return new Promise((resolve, reject) => {
        zip.generateAsync({type: 'blob'}).then(blob => {
            resolve(blob);
        });
    });
}