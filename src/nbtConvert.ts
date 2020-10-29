/// <reference path="../types/nbt.d.ts" />

import { BuildingData } from "./dataConvert";

export interface NbtFile {
    path: string,
    data: ArrayBuffer
}

export function writeBuildings(buildings: BuildingData[], nbtRef: nbt): NbtFile[] {
    let results: NbtFile[] = [];
    for(let building of buildings) {
        let paletteValues = building.palette.map(p => {
            let propertyValues:{ [key: string]: {type: 'string', value: string}} = {};
            for(let propertyName in p.properties) {
                if(p.properties[propertyName]) {
                    propertyValues[propertyName] = { type: 'string', value: p.properties[propertyName] };
                }
            }
            return {
                Name: { type: 'string', value: p.name },
                Properties: { type: 'compound', value: propertyValues }
            };
        });
        let blocks = [];
        let afterBlocks = [];
        for(let x = 0; x < building.length; x++) {
            for(let y = building.startLevel; y < building.height - building.startLevel; y++) {
                for(let z = 0; z < building.width; z++) {
                    let blockData = building.blocks[x] && building.blocks[x][y] && building.blocks[x][y][z];
                    if(blockData) {
                        let blockItem = {
                            state: { type: 'int', value: blockData.state },
                            pos: { type: 'list', value: {
                                type: 'int', value: [x, y, z],
                            }}
                        };
                        if(blockData.after) {
                            afterBlocks.push(blockItem);
                        }
                        else {
                            blocks.push(blockItem);
                        }
                    }
                }
            }
        }
        let blockValues = blocks.concat(...afterBlocks);
        let nbtValues = {
            name: '',
            value: {
                DataVersion: { type: 'int', value: 1343 },
                size: { type: 'list', value: {
                    type: 'int', value: [building.width, building.height, building.length]
                }},
                palette: { type: 'list', value: {
                    type: 'compound', value: paletteValues
                }},
                blocks: { type: 'list', value: {
                    type: 'compound', value: blockValues
                }}
            }
        }
        results.push({ path: building.path + '.nbt', data: nbtRef.writeUncompressed(nbtValues) });
    }

    return results;
}