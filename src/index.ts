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
        }).catch(e => {
            reject(e);
        });
    });
}

function showMessage(message: string, messageType: string) {
    let messageBoard = (document.querySelector("#message-board")) as HTMLDivElement;

    let newMessage = document.createElement('div');
    newMessage.innerText = message;
    newMessage.classList.add('alert');
    newMessage.classList.add('alert-' + messageType);
    messageBoard.appendChild(newMessage);
}

export function start() {
    let blocklistInput = (document.querySelector('#blocklist')) as HTMLInputElement;
    let fileInput = (document.querySelector('#upload')) as HTMLInputElement;
    let goButton = (document.querySelector('#go')) as HTMLButtonElement;
    let downloadButton = (document.querySelector('#download')) as HTMLButtonElement;
    let downloadIcon = (document.querySelector('#download-icon')) as HTMLSpanElement;
    let downloadText = (document.querySelector('#download-text')) as HTMLSpanElement;
    let deltaCheckbox = (document.querySelector("#deltaOnly")) as HTMLInputElement;
    let messageBoard = (document.querySelector("#message-board")) as HTMLDivElement;

    worker = new Worker('worker-main.js');
    worker.addEventListener('message', e => {
        let data = e.data;
        if(data.cmd === 'output') {
            downloadIcon.classList.add('d-none');
            downloadText.innerText = 'Download';
            downloadButton.disabled = false;
            downloadButton.classList.add('btn-success');
            downloadButton.classList.remove('btn-primary');
            downloadButton.addEventListener('click', () => {
                saveAs(data.blob, 'buildings.zip');
            });
        }
        else if(data.cmd === 'warning') {
            showMessage(data.message, 'warning');
        }
        else if(data.cmd === 'error') {
            showMessage(data.message, 'danger');
        }
    });

    goButton.addEventListener('click', () => {
        messageBoard.innerHTML = '';
        if(!blocklistInput.files?.length || !fileInput.files?.length) {
            showMessage('Please supply all required files', 'danger');
            return;
        }

        if(!/\.zip$/.test(fileInput.files[0].name)) {
            showMessage('Buildings file should be a zip archive', 'danger');
            return;
        }

        try {
            goButton.classList.add('d-none');
            downloadButton.classList.remove('d-none');

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
                            }).catch(e => {
                                reject(e);
                            });
                        }));
                    }
                    else if(/\.png$/.test(path)) {
                        currentBuilding?.promises.push(new Promise((resolve, reject) => {
                            let thisBuilding = currentBuilding!;
                            let index = +path.replace(/\.png$/, '')?.match(/\d+$/)![0];
                            parseImage(entry, index, path).then(data => {
                                thisBuilding.pngs.push(data);
                                resolve();
                            }).catch(e => {
                                reject(e);
                            });
                        }));
                    }
                });

                if(currentBuilding) {
                    buildingPromises.push(waitForBuilding(currentBuilding, deltaOnly));
                }

                Promise.all(buildingPromises).then(() => {
                    worker.postMessage({ cmd: 'buildingsDone'});
                }).catch(e => {
                    showMessage(e.toString(), 'danger');
                });
            }).catch(e => {
                showMessage(e.toString(), 'danger');
            });
        }
        catch(e) {
            showMessage(e.toString(), 'danger');
        }
    });
}