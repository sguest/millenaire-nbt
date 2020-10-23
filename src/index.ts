import * as JSZip from 'jszip';
import { parseBlocklist, Blocklist } from './blocklist';
import { FileBuildingData, parseImage, parseTextFile } from './fileParser';
import { convertBuilding, BuildingData } from './dataConvert';
import { writeBuildings } from './nbtConvert';
import { saveFile } from './fileWriter';

function finishBuilding(building: FileBuildingData, blocklist: Blocklist): Promise<BuildingData[]> {
    return new Promise((resolve, reject) => {
        Promise.all(building.promises).then(() => {
            resolve(convertBuilding(building, blocklist));
        });
    });
}

export function start() {
    let blocklistInput = (document.querySelector('#blocklist')) as HTMLInputElement;
    let fileInput = (document.querySelector('#upload')) as HTMLInputElement;
    let goButton = (document.querySelector('#go')) as HTMLButtonElement;

    goButton.addEventListener('click', () => {
        if(!blocklistInput.files?.length || !fileInput.files?.length) {
            console.log('Invalid');
            return;
        }

        let blocklistData = parseBlocklist(blocklistInput.files);

        JSZip.loadAsync(fileInput.files[0]).then(zip => {
            let currentBuilding: FileBuildingData | null = null;
            let buildingPromises: Array<Promise<BuildingData[]>> = [];
            zip.forEach((path, entry) => {
                if(/\.txt$/.test(path)) {
                    if(currentBuilding) {
                        buildingPromises.push(finishBuilding(currentBuilding, blocklistData));
                    }
                    currentBuilding = {
                        path: path,
                        pngs: [],
                        promises: [],
                    };
                    currentBuilding.promises.push(new Promise((resolve, reject) => {
                        parseTextFile(entry).then(data => {
                            currentBuilding!.textFile = data;
                            resolve();
                        })
                    }));
                }
                else {
                    currentBuilding?.promises.push(new Promise((resolve, reject) => {
                        let index = +path.replace(/\.png$/, '')?.match(/\d+$/)![0];
                        parseImage(entry, index).then(data => {
                            currentBuilding?.pngs.push(data);
                            resolve();
                        })
                    }));
                }
            });

            if(currentBuilding) {
                buildingPromises.push(finishBuilding(currentBuilding, blocklistData));
            }

            Promise.all(buildingPromises).then(buildings => {
                saveFile(writeBuildings(buildings.flat()));
            });
        });
    });
}