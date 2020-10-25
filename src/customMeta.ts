interface MetaEntry {
    [key: string]: string
}

interface BlockMeta {
    [key: number]: MetaEntry
}

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


let customMeta: {[key: string]: BlockMeta} = {
    'minecraft:dirt': {
        1: { variant: 'coarse_dirt' }
    },
    'minecraft:stonebrick': {
        1: { variant: 'mossy_stonebrick' },
        2: { variant: 'cracked_stonebrick' },
        3: { variant: 'chiseled_stonebrick' }
    },
    'minecraft:sand': {
        1: { variant: 'red_sand'}
    },
    'minecraft:sandstone': {
        1: { type: 'chiseled_sandstone' },
        2: { type: 'smooth_sandstone' }
    },
    'minecraft:red_sandstone': {
        1: { type: 'chiseled_red_sandstone'},
        2: { type: 'smooth_red_sandstone'}
    },
    'minecraft:red_flower': {
        1: { type: 'blue_orchid' },
        2: { type: 'allium'},
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
        5: { half: 'bottom', variant: 'stone_brick'},
        8: { half: 'top', variant: 'stone' },
        9: { half: 'top', variant: 'sandstone' },
        11: { half: 'top', variant: 'cobblestone'},
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
        10: {half: 'top', variant: 'birch' },
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
}

export default customMeta;