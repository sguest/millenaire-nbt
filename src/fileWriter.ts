/// <reference path="../types/file-saver.d.ts" />

import * as JSZip from 'jszip';
import { NbtFile } from './nbtConvert';
//import { saveAs } from 'file-saver';

declare var saveAs: (blob: Blob, name: string) => void;

export function saveFile(buildings: NbtFile[]) {
    let zip = new JSZip();

    for(let building of buildings) {
        //zip.file(building.path, new Zlib.Gzip(building.data).compress());
        zip.file(building.path, building.data);
    }

    zip.generateAsync({type: 'blob'}).then(blob => {
        saveAs(blob, 'buildings.zip');
    });
}