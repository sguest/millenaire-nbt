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
        let blockValues = building.blocks.map(b => ({
            state: { type: 'int', value: b.paletteIndex },
            pos: { type: 'list', value: {
                type: 'int', value: [b.x, b.y, b.z],
            }}
        }));
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