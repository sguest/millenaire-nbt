/// <reference path="../types/file-saver.d.ts" />

import JSZip = require("jszip");
import { parseImage, parseTextFile } from "./fileParser";
import { FileBuildingData } from "./fileParserTypes";

let worker: Worker;

function waitForBuilding(building: FileBuildingData, deltaOnly: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
        Promise.all(building.promises).then(() => {
            building.promises = [];
            let transferred = [];
            for(let png of building.pngs) {
                transferred.push(png.imageData.data.buffer);
            }
            worker.postMessage({ cmd: 'building', data: { building, deltaOnly }}, transferred);
            resolve();
        });
    });
}

export function start() {
    worker = new Worker('worker-main.js');
    worker.addEventListener('message', e => {
        let data = e.data;
        if(data.cmd === 'output') {
            saveAs(data.blob, 'buildings.zip');
        }
    });

    let blocklistInput = (document.querySelector('#blocklist')) as HTMLInputElement;
    let fileInput = (document.querySelector('#upload')) as HTMLInputElement;
    let goButton = (document.querySelector('#go')) as HTMLButtonElement;
    let deltaCheckbox = (document.querySelector("#deltaOnly")) as HTMLInputElement;

    goButton.addEventListener('click', () => {
        if(!blocklistInput.files?.length || !fileInput.files?.length) {
            console.log('Invalid');
            return;
        }

        worker.postMessage({ cmd: 'blocklist', data: blocklistInput.files});

        JSZip.loadAsync(fileInput.files[0]).then(zip => {
            let currentBuilding: FileBuildingData | null = null;
            let buildingPromises: Array<Promise<void>> = [];
            let deltaOnly = deltaCheckbox.checked;
            zip.forEach((path, entry) => {
                if(/\.txt$/.test(path)) {
                    if(currentBuilding) {
                        buildingPromises.push(waitForBuilding(currentBuilding, deltaOnly));
                    }
                    currentBuilding = {
                        path: path,
                        pngs: [],
                        promises: [],
                    };
                    currentBuilding.promises.push(new Promise((resolve, reject) => {
                        let thisBuilding = currentBuilding!;
                        parseTextFile(entry).then(data => {
                            thisBuilding.textFile = data;
                            resolve();
                        })
                    }));
                }
                else if(/\.png$/.test(path)) {
                    currentBuilding?.promises.push(new Promise((resolve, reject) => {
                        let thisBuilding = currentBuilding!;
                        let index = +path.replace(/\.png$/, '')?.match(/\d+$/)![0];
                        parseImage(entry, index, path).then(data => {
                            thisBuilding.pngs.push(data);
                            resolve();
                        })
                    }));
                }
            });

            if(currentBuilding) {
                buildingPromises.push(waitForBuilding(currentBuilding, deltaOnly));
            }

            Promise.all(buildingPromises).then(() => {
                worker.postMessage({ cmd: 'buildingsDone'});
            })
        });
    });
}