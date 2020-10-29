define("blocklist", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseBlocklist = void 0;
    function parseBlocklist(files) {
        let blocklist = {};
        Array.from(files).forEach(file => {
            file.text().then(text => {
                for (let line of text.split(/\r?\n/)) {
                    if (line?.trim().length && !line.startsWith('//')) {
                        let parts = line.split(';');
                        let identifier = parts[0];
                        let blockId = parts[1];
                        let stateValues = parts[2];
                        let placeAfter = parts[3];
                        let colourString = parts[4];
                        blocklist[colourString] = {
                            identifier,
                            blockId,
                            stateValues,
                            placeAfter: /true/i.test(placeAfter),
                        };
                    }
                }
            }).catch(e => {
                throw e;
            });
        });
        return blocklist;
    }
    exports.parseBlocklist = parseBlocklist;
});
define("fileParserTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("customBlocklist", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let customBlocklist = {
        grass: {
            id: 'minecraft:grass'
        },
        mainchestTop: {
            id: 'millenaire:locked_chest',
            properties: {
                facing: 'east'
            }
        },
        mainchestBottom: {
            id: 'millenaire:locked_chest',
            properties: {
                facing: 'west'
            }
        },
        mainchestLeft: {
            id: 'millenaire:locked_chest',
            properties: {
                facing: 'north'
            }
        },
        mainchestRight: {
            id: 'millenaire:locked_chest',
            properties: {
                facing: 'south'
            }
        },
        lockedchestTop: {
            id: 'millenaire:locked_chest',
            properties: {
                facing: 'east'
            }
        },
        lockedchestBottom: {
            id: 'millenaire:locked_chest',
            properties: {
                facing: 'west'
            }
        },
        lockedchestLeft: {
            id: 'millenaire:locked_chest',
            properties: {
                facing: 'north'
            }
        },
        lockedchestRight: {
            id: 'millenaire:locked_chest',
            properties: {
                facing: 'south'
            }
        },
        soil: { id: 'minecraft:farmland' },
        ricesoil: { id: 'minecraft:farmland' },
        turmericsoil: { id: 'minecraft:farmland' },
        sugarcanesoil: { id: 'minecraft:dirt', properties: { variant: 'dirt' } },
        potatosoil: { id: 'minecraft:farmland' },
        netherwartsoil: { id: 'minecraft:soul_sand' },
        vinesoil: { id: 'minecraft:dirt' },
        maizesoil: { id: 'minecraft:farmland' },
        carrotsoil: { id: 'minecraft:farmland' },
        flowersoil: { id: 'minecraft:grass' },
        cottonsoil: { id: 'minecraft:farmland' },
        oakspawn: {
            id: 'minecraft:sapling',
            properties: {
                type: 'oak',
                stage: '0',
            }
        },
        pinespawn: {
            id: 'minecraft:sapling',
            properties: {
                type: 'spruce',
                stage: '0',
            }
        },
        birchspawn: {
            id: 'minecraft:sapling',
            properties: {
                type: 'birch',
                stage: '0',
            }
        },
        junglespawn: {
            id: 'minecraft:sapling',
            properties: {
                type: 'jungle',
                stage: '0',
            }
        },
        acaciaspawn: {
            id: 'minecraft:sapling',
            properties: {
                type: 'acacia',
                stage: '0',
            }
        },
        darkoakspawn: {
            id: 'minecraft:sapling',
            properties: {
                type: 'dark_oak',
                stage: '0',
            }
        },
        applespawn: {
            id: 'millenaire:sapling_appletree',
            properties: {
                stage: '0',
            }
        },
        olivespawn: {
            id: 'millenaire:sapling_olivetree',
            properties: {
                stage: '0',
            }
        },
        pistachiospawn: {
            id: 'millenaire:sapling_pistachio',
            properties: {
                stage: '0',
            }
        },
        brewingstand: { id: 'minecraft:brewing_stand' },
        snailsoilblock: {
            id: 'millenaire:snail_soil',
            properties: { progress: 'snail_soil_empty' }
        },
    };
    exports.default = customBlocklist;
});
define("customMeta", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let standardColours = {
        1: { color: 'orange' },
        2: { color: 'magenta' },
        3: { color: 'light_blue' },
        4: { color: 'yellow' },
        5: { color: 'lime' },
        6: { color: 'pink' },
        7: { color: 'gray' },
        8: { color: 'silver' },
        9: { color: 'cyan' },
        10: { color: 'purple' },
        11: { color: 'blue' },
        12: { color: 'brown' },
        13: { color: 'green' },
        14: { color: 'red' },
        15: { color: 'black' },
    };
    let customMeta = {
        'minecraft:dirt': {
            1: { variant: 'coarse_dirt' }
        },
        'minecraft:stonebrick': {
            1: { variant: 'mossy_stonebrick' },
            2: { variant: 'cracked_stonebrick' },
            3: { variant: 'chiseled_stonebrick' }
        },
        'minecraft:sand': {
            1: { variant: 'red_sand' }
        },
        'minecraft:sandstone': {
            1: { type: 'chiseled_sandstone' },
            2: { type: 'smooth_sandstone' }
        },
        'minecraft:red_sandstone': {
            1: { type: 'chiseled_red_sandstone' },
            2: { type: 'smooth_red_sandstone' }
        },
        'minecraft:red_flower': {
            1: { type: 'blue_orchid' },
            2: { type: 'allium' },
            3: { type: 'houstonia' },
            4: { type: 'red_tulip' },
            5: { type: 'orange_tulip' },
            6: { type: 'white_tulip' },
            7: { type: 'pink_tulip' },
            8: { type: 'oxeye_daisy' }
        },
        'minecraft:stone_slab': {
            1: { half: 'bottom', variant: 'sandstone' },
            3: { half: 'bottom', variant: 'cobblestone' },
            4: { half: 'bottom', variant: 'brick' },
            5: { half: 'bottom', variant: 'stone_brick' },
            8: { half: 'top', variant: 'stone' },
            9: { half: 'top', variant: 'sandstone' },
            11: { half: 'top', variant: 'cobblestone' },
            12: { half: 'top', variant: 'brick' },
            13: { half: 'top', variant: 'stone_brick' }
        },
        'minecraft:stone_slab2': {
            8: { half: 'top', variant: 'red_sandstone' }
        },
        'minecraft:wooden_slab': {
            1: { half: 'bottom', variant: 'spruce' },
            2: { half: 'bottom', variant: 'birch' },
            3: { half: 'bottom', variant: 'jungle' },
            4: { half: 'bottom', variant: 'acacia' },
            5: { half: 'bottom', variant: 'dark_oak' },
            8: { half: 'top', variant: 'oak' },
            9: { half: 'top', variant: 'spruce' },
            10: { half: 'top', variant: 'birch' },
            11: { half: 'top', variant: 'jungle' },
            12: { half: 'top', variant: 'acacia' },
            13: { half: 'top', variant: 'dark_oak' }
        },
        'minecraft:wool': standardColours,
        'millenaire:wood_deco': {
            1: { variant: 'timberframecross' },
            2: { variant: 'thatch' }
        },
        // the path blocks have meta values specified in blocklist, but the meta doesn't seem to do anything
        // add dud entries here so the converter doesn't give meaningless warnings
        'millenaire:pathdirt': { 1: {} },
        'millenaire:pathgravel': { 1: {} },
        'millenaire:pathslabs': { 1: {} },
        'millenaire:pathsandstone': { 1: {} },
        'millenaire:pathochretiles': { 1: {} },
        'millenaire:pathgravelslabs': { 1: {} },
        'millenaire:pathsnow': { 1: {} },
        'millenaire:pathdirt_slab': { 1: {} },
        'millenaire:pathgravel_slab': { 1: {} },
        'millenaire:pathslabs_slab': { 1: {} },
        'millenaire:pathsandstone_slab': { 1: {} },
        'millenaire:pathochretiles_slab': { 1: {} },
        'millenaire:pathgravelslabs_slab': { 1: {} },
        'millenaire:pathsnow_slab': { 1: {} },
        'millenaire:crop_maize': {
            7: { age: '7' }
        },
        'miillenaire:stone_deco': {
            2: { variant: 'mayangoldblock' }
        },
        'minecraft:sapling': {
            1: { type: 'spruce', stage: '0' }
        },
        'minecraft:tallgrass': {
            1: { type: 'tall_grass' },
            2: { type: 'fern' }
        },
        'minecraft:redstone_torch': {
            5: {}
        },
        'minecraft:stone_button': {
            1: { facing: 'east' },
            2: { facing: 'west' },
            3: { facing: 'south' },
            4: { facing: 'north' },
            5: { facing: 'up' }
        },
        'minecraft:snow_layer': {
            1: { layers: '1' },
            2: { layers: '2' },
            3: { layers: '3' },
            4: { layers: '4' },
            5: { layers: '5' },
            6: { layers: '6' },
            7: { layers: '7' }
        },
        'minecraft:vine': {
            1: { north: 'true' },
            2: { east: 'true' },
            4: { south: 'true' },
            8: { west: 'true' }
        },
        'minecraft:cauldron': {
            3: { level: '3' }
        },
        'minecraft:nether_wart': {
            3: { age: '3' }
        },
        'minecraft:stained_glass_pane': standardColours,
        'minecraft:carpet': standardColours,
        'minecraft:concrete': standardColours,
        'millenaire:leaves_olivetree': {
            1: {
                age: '1',
                check_decay: 'false',
                decayable: 'true'
            }
        },
        'minecraft:flower_pot': {
            1: { contents: 'rose' },
            2: { contents: 'blue_orchid' },
            3: { contents: 'allium' },
            4: { contents: 'houstonia' },
            5: { contents: 'red_tulip' },
            6: { contents: 'orange_tulip' },
            7: { contents: 'white_tulip' },
            8: { contents: 'pink_tulip' },
            9: { contents: 'oxeye_daisy' },
            10: { contents: 'dandelion' },
            11: { contents: 'oak_sapling' },
            12: { contents: 'spruce_sapling' },
            13: { contents: 'birch_sapling' },
            14: { contents: 'jungle_sapling' },
            15: { contents: 'acacia_sapling' },
            16: { contents: 'dark_oak_sapling' },
            17: { contents: 'mushroom_red' },
            18: { contents: 'mushroom_brown' },
            19: { contents: 'dead_bush' },
            20: { contents: 'fern' },
            21: { contents: 'cactus' },
        }
    };
    exports.default = customMeta;
});
define("dataConvert", ["require", "exports", "customBlocklist", "customMeta"], function (require, exports, customBlocklist_1, customMeta_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertBuilding = void 0;
    function blocklistToPalette(blocklistItem, index, buildingIndex) {
        if (blocklistItem.blockId.length) {
            let stateValues = {};
            if (blocklistItem.stateValues.length) {
                if (isNaN(+blocklistItem.stateValues)) {
                    for (let stateItem of blocklistItem.stateValues.split(',')) {
                        let stateParts = stateItem.split('=');
                        stateValues[stateParts[0]] = stateParts[1];
                    }
                }
                else if (+blocklistItem.stateValues > 0) {
                    let meta = +blocklistItem.stateValues;
                    let blockStateLookup = customMeta_1.default[blocklistItem.blockId];
                    if (blockStateLookup && blockStateLookup[meta]) {
                        stateValues = blockStateLookup[meta];
                    }
                    else {
                        postMessage({ cmd: 'warning', message: `Warning: unrecognized meta value ${meta} for block ID ${blocklistItem.blockId}. Using base version of block.` });
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
        else if (/^free./.test(blocklistItem.identifier)) {
            return {
                name: 'millenaire:freeblock',
                properties: { resource: blocklistItem.identifier.replace(/^free/, '') },
                index,
                placeAfter: false,
            };
        }
        else if (/.source$/.test(blocklistItem.identifier)) {
            return {
                name: 'millenaire:source',
                properties: { resource: blocklistItem.identifier.replace(/source$/, '') },
                index,
                placeAfter: false,
            };
        }
        else if (/^cultureBannerStanding\d+$/.test(blocklistItem.identifier) || /^villageBannerStanding\d+$/.test(blocklistItem.identifier)) {
            let rotation = /\d+$/.exec(blocklistItem.identifier)[0];
            return {
                name: 'minecraft:standing_banner',
                properties: { rotation },
                index,
                placeAfter: blocklistItem.placeAfter,
            };
        }
        else {
            let custom = customBlocklist_1.default[blocklistItem.identifier];
            if (custom) {
                return {
                    name: custom.id,
                    properties: custom.properties || {},
                    index,
                    placeAfter: !!custom.placeAfter,
                };
            }
        }
        // haven't found a match. If 'preserveground' or this is an upgrade (not initial state)
        // return nothing so existing block remains
        if (blocklistItem.identifier === 'preserveground' || buildingIndex > 0) {
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
    function getBedFootPalette(headPalette, index) {
        let footProperties = {};
        for (let propertyName in headPalette.properties) {
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
    let bedDeltas = {
        north: { x: 0, z: 1 },
        south: { x: 0, z: -1 },
        west: { x: 1, z: 0 },
        east: { x: -1, z: 0 },
    };
    function convertBuilding(buildingData, blocklist, deltaOnly) {
        let buildings = [];
        let width = buildingData.textFile.width;
        let length = buildingData.textFile.length;
        let startLevel = 0;
        let blocks = [];
        let paletteLookup = {};
        let paletteArray = [];
        let paletteIndex = 0;
        for (let png of buildingData.pngs) {
            if (buildingData.textFile?.startLevels[png.index] !== undefined) {
                startLevel = buildingData.textFile?.startLevels[png.index];
            }
            let y = startLevel;
            if (deltaOnly) {
                blocks = [];
                paletteLookup = {};
                paletteArray = [];
                paletteIndex = 0;
            }
            else {
                let newBlocks = [];
                for (let x in blocks) {
                    newBlocks[x] = [];
                    for (let y in blocks[x]) {
                        newBlocks[x][y] = blocks[x][y].slice();
                    }
                }
                blocks = newBlocks;
                paletteArray = paletteArray.slice();
                let newPaletteLookup = {};
                for (let key in paletteLookup) {
                    newPaletteLookup[key] = paletteLookup[key];
                }
                paletteLookup = newPaletteLookup;
                // "Empty" is treated differently in base building vs upgrades, so ensure this is cleared out
                delete paletteLookup['255/255/255'];
            }
            for (let left = 0; left < png.imageData.width; left += width + 1) {
                for (let x = 0; x < length; x++) {
                    for (let z = 0; z < width; z++) {
                        let baseIndex = (x * png.imageData.width + left + width - z - 1) * 4;
                        let colourString = `${png.imageData.data[baseIndex]}/${png.imageData.data[baseIndex + 1]}/${png.imageData.data[baseIndex + 2]}`;
                        let paletteItem = paletteLookup[colourString];
                        if (!paletteItem) {
                            let blocklistItem = blocklist[colourString];
                            if (blocklistItem) {
                                paletteItem = blocklistToPalette(blocklistItem, paletteIndex, png.index);
                                if (paletteItem) {
                                    paletteLookup[colourString] = paletteItem;
                                    paletteArray.push(paletteItem);
                                    paletteIndex++;
                                }
                            }
                            else {
                                postMessage({ cmd: 'warning', message: `Warning: Unrecognized colour ${colourString} loading building ${buildingData.path} image ${png.path} x ${left + width - z - 1} y ${x}` });
                            }
                        }
                        if (paletteItem) {
                            blocks[x] = blocks[x] || [];
                            blocks[x][y] = blocks[x][y] || [];
                            blocks[x][y][z] = { state: paletteItem.index, after: paletteItem.placeAfter };
                            if (paletteItem.properties.part === 'head' && !!paletteItem.properties.facing) {
                                // Assuming this is the head of a bed, add the foot
                                let fakeColourString = `${paletteItem.name}-foot-${paletteItem.properties.facing}`;
                                let footPalette = paletteLookup[fakeColourString];
                                if (!footPalette) {
                                    footPalette = getBedFootPalette(paletteItem, paletteIndex);
                                    paletteArray.push(footPalette);
                                    paletteIndex++;
                                }
                                let delta = bedDeltas[paletteItem.properties.facing];
                                let footX = x + delta.x;
                                let footZ = z + delta.z;
                                blocks[footX] = blocks[footX] || [];
                                blocks[footX][y] = blocks[footX][y] || [];
                                blocks[footX][y][footZ] = { state: footPalette.index, after: paletteItem.placeAfter };
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
                height: y - startLevel,
                startLevel,
                palette: paletteArray,
                blocks,
            });
        }
        return buildings;
    }
    exports.convertBuilding = convertBuilding;
});
/// <reference path="../types/nbt.d.ts" />
define("nbtConvert", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.writeBuildings = void 0;
    function writeBuildings(buildings, nbtRef) {
        let results = [];
        for (let building of buildings) {
            let paletteValues = building.palette.map(p => {
                let propertyValues = {};
                for (let propertyName in p.properties) {
                    if (p.properties[propertyName]) {
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
            for (let x = 0; x < building.length; x++) {
                for (let y = building.startLevel; y < building.height - building.startLevel; y++) {
                    for (let z = 0; z < building.width; z++) {
                        let blockData = building.blocks[x] && building.blocks[x][y] && building.blocks[x][y][z];
                        if (blockData) {
                            let blockItem = {
                                state: { type: 'int', value: blockData.state },
                                pos: { type: 'list', value: {
                                        type: 'int', value: [x, y, z],
                                    } }
                            };
                            if (blockData.after) {
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
                        } },
                    palette: { type: 'list', value: {
                            type: 'compound', value: paletteValues
                        } },
                    blocks: { type: 'list', value: {
                            type: 'compound', value: blockValues
                        } }
                }
            };
            results.push({ path: building.path + '.nbt', data: nbtRef.writeUncompressed(nbtValues) });
        }
        return results;
    }
    exports.writeBuildings = writeBuildings;
});
/// <reference path="../types/file-saver.d.ts" />
/// <reference path="../types/zlib.d.ts" />
define("fileGenerator", ["require", "exports", "jszip"], function (require, exports, JSZip) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateFile = void 0;
    function generateFile(buildings) {
        let zip = new JSZip();
        for (let building of buildings) {
            zip.file(building.path, new Zlib.Gzip(new Uint8Array(building.data)).compress());
        }
        return new Promise((resolve, reject) => {
            zip.generateAsync({ type: 'blob' }).then(blob => {
                resolve(blob);
            }).catch(e => {
                reject(e);
            });
        });
    }
    exports.generateFile = generateFile;
});
define("worker", ["require", "exports", "blocklist", "dataConvert", "fileGenerator", "nbtConvert"], function (require, exports, blocklist_1, dataConvert_1, fileGenerator_1, nbtConvert_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.start = void 0;
    function finishBuilding(building, blocklist, deltaOnly) {
        return new Promise((resolve, reject) => {
            Promise.all(building.promises).then(() => {
                resolve(dataConvert_1.convertBuilding(building, blocklist, deltaOnly));
            });
        });
    }
    function start(nbtRef) {
        let buildingPromises = [];
        let blocklistData;
        let handlers = {
            blocklist: (blocklistFiles) => {
                blocklistData = blocklist_1.parseBlocklist(blocklistFiles);
            },
            building: (data) => {
                buildingPromises.push(finishBuilding(data.building, blocklistData, data.deltaOnly));
            },
            buildingsDone: () => {
                Promise.all(buildingPromises).then(buildings => {
                    fileGenerator_1.generateFile(nbtConvert_1.writeBuildings(buildings.flat(), nbtRef)).then(blob => {
                        self.postMessage({
                            cmd: 'output',
                            blob
                        });
                    });
                });
            }
        };
        self.addEventListener('message', e => {
            try {
                let data = e.data;
                handlers[data.cmd](data.data);
            }
            catch (e) {
                postMessage({ cmd: 'error', message: e.toString() });
            }
        });
    }
    exports.start = start;
});
//# sourceMappingURL=worker.js.map