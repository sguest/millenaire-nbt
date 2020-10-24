import { FileBuildingData } from "./fileParser";
import { Blocklist } from './blocklist';

export interface PaletteItem {
    name: string;
    index: number;
    properties: { [key: string]: string };
}

export interface BlockData {
    paletteIndex: number;
    x: number;
    y: number;
    z: number;
    // NBT would go here
}

export interface BuildingData {
    path: string;
    width: number;
    length: number;
    height: number;
    palette: PaletteItem[];
    blocks: BlockData[];
}

export function convertBuilding(buildingData: FileBuildingData, blocklist: Blocklist): BuildingData[] {
    let buildings: BuildingData[] = [];
    let width = buildingData.textFile!.width;
    let length = buildingData.textFile!.length;
    for(let png of buildingData.pngs) {
        let paletteLookup: {[key: string]: PaletteItem} = {};
        let paletteArray: PaletteItem[] = [];
        let paletteIndex = 0;
        let y = 0;
        let blocks: BlockData[] = [];

        for(let left = 0; left < png.context.canvas.width; left += width + 1) {
            let layerData = png.context.getImageData(left, 0, width, length).data;
            for(let x = 0; x < width; x++) {
                for(let z = 0; z < length; z++) {
                    let baseIndex = (x + z * width) * 4;
                    let colourString = `${layerData[baseIndex]}/${layerData[baseIndex + 1]}/${layerData[baseIndex + 2]}`;
                    let paletteItem = paletteLookup[colourString];
                    if(!paletteItem) {
                        let blocklistItem = blocklist[colourString];
                        if(!blocklistItem) {
                            throw new Error(`Unrecognized colour ${colourString} loading building ${buildingData.path}`);
                        }
                        let stateValues: {[key: string]: string} = {};
                        if(blocklistItem.stateValues.length) {
                            for(let stateItem of blocklistItem.stateValues.split(',')) {
                                let stateParts = stateItem.split('=');
                                stateValues[stateParts[0]] = stateParts[1];
                            }
                        }
                        if(blocklistItem.blockId.length) {
                            paletteItem = {
                                name: blocklistItem.blockId,
                                properties: stateValues,
                                index: paletteIndex,
                            };
                            paletteLookup[colourString] = paletteItem;
                            paletteArray.push(paletteItem);
                            paletteIndex++;
                        }
                    }
                    if(paletteItem) {
                        blocks.push({x, y, z, paletteIndex: paletteItem.index});
                    }
                }
            }
            y++;
        }

        buildings.push({
            path: buildingData.path.replace(/\.txt$/, '') + png.index,
            width,
            length,
            height: y,
            palette: paletteArray,
            blocks,
        });
    }

    return buildings;
}