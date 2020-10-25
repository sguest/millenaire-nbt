let customBlocklist: {[key: string]: {id: string, properties?: {[key: string]: string}, placeAfter?: boolean}} = {
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
    soil: { id: 'minecraft:farmland'},
    ricesoil: { id: 'minecraft:farmland'},
    turmericsoil: { id: 'minecraft:farmland'},
    sugarcanesoil: { id: 'minecraft:dirt', properties: { variant: 'dirt' }},
    potatosoil: { id: 'minecraft:farmland'},
    netherwartsoil: { id: 'minecraft:soul_sand'},
    vinesoil: { id: 'minecraft:dirt'},
    maizesoil: { id: 'minecraft:farmland'},
    carrotsoil: { id: 'minecraft:farmland'},
    flowersoil: { id: 'minecraft:grass'},
    cottonsoil: { id: 'minecraft:farmland'},
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
    brewingstand: { id: 'minecraft:brewing_stand'},
    snailsoilblock: {
        id: 'millenaire:snail_soil',
        properties: { progress: 'snail_soil_empty' }
    },
}

export default customBlocklist;