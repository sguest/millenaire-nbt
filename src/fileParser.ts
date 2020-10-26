import * as JSZip from 'jszip';
import { PngBuildingData, TxtBuildingData } from './fileParserTypes';

export function parseImage(file: JSZip.JSZipObject, index: number, path: string): Promise<PngBuildingData> {
    return new Promise((resolve, reject) => {
        file.async('blob').then(createImageBitmap).then(image => {
            let canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            let context = canvas.getContext('2d')!;
            context.drawImage(image, 0, 0);
            resolve({ imageData: context.getImageData(0, 0, image.width, image.height), index, path });
        });
    });
}

export function parseTextFile(file: JSZip.JSZipObject): Promise<TxtBuildingData> {
    return new Promise((resolve, reject) => {
        file.async('string').then(content => {
            let width = 0;
            let length = 0;
            let startLevels: number[] = [];
            for(let line of content.split(/\r?\n/)) {
                if(line.startsWith('building.width')) {
                    width = +line.split('=')[1];
                }
                else if(line.startsWith('building.length')) {
                    length = +line.split('=')[1];
                }
                else if(line.startsWith('initial.startlevel')) {
                    startLevels[0] = +line.split('=')[1];
                }
                else if(/^upgrade\d+\.startlevel/.test(line)) {
                    let level = +/^upgrade(\d+)/.exec(line)![1];
                    startLevels[level] = +line.split('=')[1];
                }
            }
            resolve({width, length, startLevels});
        });
    });
}