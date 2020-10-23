import * as JSZip from 'jszip';

export interface FileBuildingData {
    path: string;
    textFile?: TxtBuildingData;
    pngs: PngBuildingData[];
    promises: Promise<void>[];
}

export interface PngBuildingData {
    context: CanvasRenderingContext2D;
    image: HTMLImageElement;
    index: number;
}

export interface TxtBuildingData {
    width: number;
    length: number;
}

export function parseImage(file: JSZip.JSZipObject, index: number): Promise<PngBuildingData> {
    return new Promise((resolve, reject) => {
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d')!;
        let image = new Image();
        image.onload = () => {
            context?.drawImage(image, 0, 0);
            resolve({ context, index, image });
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
            for(let line of content.split(/\r?\n/)) {
                if(line.startsWith('building.width')) {
                    width = +line.split('=')[1];
                }
                else if(line.startsWith('building.length')) {
                    length = +line.split('=')[1];
                }
            }
            resolve({width, length});
        });
    });
}