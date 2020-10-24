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
    }
}

export default customBlocklist;