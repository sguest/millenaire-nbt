import { FileBuildingData } from "./fileParser";
import { Blocklist, BlocklistItem } from './blocklist';
import customBlocklist from './customBlocklist';
import customMeta from './customMeta';

export interface PaletteItem {
    name: string;
    index: number;
    properties: { [key: string]: string };
    placeAfter: boolean;
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

function blocklistToPalette(blocklistItem: BlocklistItem, index: number, buildingIndex: number): PaletteItem | null {
    if(blocklistItem.blockId.length) {
        let stateValues: {[key: string]: string} = {};
        if(blocklistItem.stateValues.length) {
            if(isNaN(+blocklistItem.stateValues)) {
                for(let stateItem of blocklistItem.stateValues.split(',')) {
                    let stateParts = stateItem.split('=');
                    stateValues[stateParts[0]] = stateParts[1];
                }
            }
            else if(+blocklistItem.stateValues > 0) {
                let meta = +blocklistItem.stateValues
                let blockStateLookup = customMeta[blocklistItem.blockId];
                if(blockStateLookup && blockStateLookup[meta]) {
                    stateValues = blockStateLookup[meta];
                }
                else {
                    console.log(`Warning: unrecognized meta value ${meta} for block ID ${blocklistItem.blockId}. Using base version of block.`)
                }
            }
        }

        return {
            name: blocklistItem.blockId,
            properties: stateValues,
            index,
            placeAfter: blocklistItem.placeAfter,
        };
    }
    else if(/^free./.test(blocklistItem.identifier)) {
        return {
            name: 'millenaire:freeblock',
            properties: { resource: blocklistItem.identifier.replace(/^free/, '') },
            index,
            placeAfter: false,
        }
    }
    else if(/.source$/.test(blocklistItem.identifier)) {
        return {
            name: 'millenaire:source',
            properties: { resource: blocklistItem.identifier.replace(/source$/, '') },
            index,
            placeAfter: false,
        }
    }
    else if(/^cultureBannerStanding\d+$/.test(blocklistItem.identifier) || /^villageBannerStanding\d+$/.test(blocklistItem.identifier)) {
        let rotation = /\d+$/.exec(blocklistItem.identifier)![0];
        return {
            name: 'minecraft:standing_banner',
            properties: { rotation },
            index,
            placeAfter: blocklistItem.placeAfter,
        }
    }
    else {
        let custom = customBlocklist[blocklistItem.identifier];
        if(custom) {
            return {
                name: custom.id,
                properties: custom.properties || {},
                index,
                placeAfter: !!custom.placeAfter,
            }
        }
    }

    // haven't found a match. If 'preserveground' or this is an upgrade (not initial state)
    // return nothing so existing block remains
    if(blocklistItem.identifier === 'preserveground' || buildingIndex > 0) {
        return null;
    }
    // for any unrecognized entry for base-level, return air so that existing ground blocks get cleared
    // this is mostly for millenaire markers that aren't actual blocks - selling position, defending position, etc
    return {
        name: 'minecraft:air',
        properties: {},
        index,
        placeAfter: false,
    };
}

function getBedFootPalette(headPalette: PaletteItem, index: number): PaletteItem {
    let footProperties: {[key: string]: string} = {};
    for(let propertyName in headPalette.properties) {
        footProperties[propertyName] = headPalette.properties[propertyName];
    }
    footProperties['part'] = 'foot';
    return {
        name: headPalette.name,
        index: index,
        placeAfter: headPalette.placeAfter,
        properties: footProperties,
    };
}

let bedDeltas: {[key: string]: {x: number, z: number}} = {
    north: {x: 0, z: 1},
    south: {x: 0, z: -1},
    west: {x: 1, z: 0},
    east: {x: -1, z: 0},
}

export function convertBuilding(buildingData: FileBuildingData, blocklist: Blocklist): BuildingData[] {
    let buildings: BuildingData[] = [];
    let width = buildingData.textFile!.width;
    let length = buildingData.textFile!.length;
    let startLevel = 0;
    for(let png of buildingData.pngs) {
        let paletteLookup: {[key: string]: PaletteItem} = {};
        let paletteArray: PaletteItem[] = [];
        let paletteIndex = 0;
        if(buildingData.textFile?.startLevels[png.index] !== undefined) {
            startLevel = buildingData.textFile?.startLevels[png.index];
        }
        let y = startLevel;
        let blocks: BlockData[] = [];
        let afterBlocks: BlockData[] = [];

        for(let left = 0; left < png.context.canvas.width; left += width + 1) {
            let layerData = png.context.getImageData(left, 0, width, length).data;
            for(let x = 0; x < length; x++) {
                for(let z = 0; z < width; z++) {
                    let baseIndex = (x * width + width - z - 1) * 4;
                    let colourString = `${layerData[baseIndex]}/${layerData[baseIndex + 1]}/${layerData[baseIndex + 2]}`;
                    let paletteItem: PaletteItem | null = paletteLookup[colourString];
                    if(!paletteItem) {
                        let blocklistItem = blocklist[colourString];
                        if(blocklistItem) {
                            paletteItem = blocklistToPalette(blocklistItem, paletteIndex, png.index);
                            if(paletteItem) {
                                paletteLookup[colourString] = paletteItem;
                                paletteArray.push(paletteItem);
                                paletteIndex++;
                            }
                        }
                        else {
                            console.log(`Warning: Unrecognized colour ${colourString} loading building ${buildingData.path} image ${png.path} x ${left + width - z - 1} y ${x}`);
                        }
                    }
                    if(paletteItem) {
                        let newBlocks = [{x, y, z, paletteIndex: paletteItem.index}];
                        if(paletteItem.properties.part === 'head' && !!paletteItem.properties.facing) {
                            // Assuming this is the head of a bed, add the foot
                            let fakeColourString = `${paletteItem.name}-foot-${paletteItem.properties.facing}`;
                            let footPalette = paletteLookup[fakeColourString];
                            if(!footPalette) {
                                footPalette = getBedFootPalette(paletteItem, paletteIndex);
                                paletteArray.push(footPalette);
                                paletteIndex++;
                            }
                            let delta = bedDeltas[paletteItem.properties.facing];
                            newBlocks.push({x: x + delta.x, y, z: z + delta.z, paletteIndex: footPalette.index});
                        }
                        if(paletteItem.placeAfter) {
                            afterBlocks.push(...newBlocks);
                        }
                        else {
                            blocks.push(...newBlocks);
                        }
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
            blocks: blocks.concat(afterBlocks),
        });
    }

    return buildings;
}