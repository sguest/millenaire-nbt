import * as JSZip from 'jszip';

export interface FileBuildingData {
    path: string;
    textFile?: TxtBuildingData;
    pngs: PngBuildingData[];
    promises: Promise<void>[];
}

export interface PngBuildingData {
    context: CanvasRenderingContext2D;
    index: number;
}

export interface TxtBuildingData {
    width: number;
    length: number;
    startLevels: number[];
}

export function parseImage(file: JSZip.JSZipObject, index: number): Promise<PngBuildingData> {
    return new Promise((resolve, reject) => {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d')!;
        let image = new Image();
        image.onload = () => {
            context.canvas.width = image.width;
            context.canvas.height = image.height;
            context.drawImage(image, 0, 0);
            resolve({ context, index });
        }
        file.async('blob').then(blob => {
            image.src = URL.createObjectURL(blob);
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