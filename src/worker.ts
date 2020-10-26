import { Blocklist, parseBlocklist } from "./blocklist";
import { BuildingData, convertBuilding } from "./dataConvert";
import { generateFile } from "./fileGenerator";
import { FileBuildingData } from "./fileParserTypes";
import { writeBuildings } from "./nbtConvert";

function finishBuilding(building: FileBuildingData, blocklist: Blocklist): Promise<BuildingData[]> {
    return new Promise((resolve, reject) => {
        Promise.all(building.promises).then(() => {
            resolve(convertBuilding(building, blocklist));
        });
    });
}


export function start(nbtRef: nbt) {
    let buildingPromises: Array<Promise<BuildingData[]>> = [];
    let blocklistData: Blocklist;

    let handlers: {[key: string]: (data: any) => void} = {
        blocklist: (blocklistFiles) => {
            blocklistData = parseBlocklist(blocklistFiles);
        },
        building: (buildingData) => {
            buildingPromises.push(finishBuilding(buildingData, blocklistData));
        },
        buildingsDone: () => {
            Promise.all(buildingPromises).then(buildings => {
                generateFile(writeBuildings(buildings.flat(), nbtRef)).then(blob => {
                    self.postMessage({
                        cmd: 'output',
                        blob
                    })
                });
            });
        }
    }

    self.addEventListener<'message'>('message', e => {
        let data = e.data;
        handlers[data.cmd](data.data);
    });
}