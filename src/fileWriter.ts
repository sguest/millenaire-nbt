/// <reference path="../types/file-saver.d.ts" />
/// <reference path="../types/zlib.d.ts" />

import * as JSZip from 'jszip';
import { NbtFile } from './nbtConvert';

export function saveFile(buildings: NbtFile[]) {
    let zip = new JSZip();

    for(let building of buildings) {
        zip.file(building.path, new Zlib.Gzip(new Uint8Array(building.data)).compress());
    }

    zip.generateAsync({type: 'blob'}).then(blob => {
        saveAs(blob, 'buildings.zip');
    });
}