export interface Blocklist {
    [key: string]: BlocklistItem;
}

export interface BlocklistItem {
    identifier: string;
    blockId: string;
    stateValues: string;
    placeAfter: boolean;
}

export function parseBlocklist(files: FileList): Blocklist {
    let blocklist: Blocklist = {};

    Array.from(files).forEach(file => {
        file.text().then(text => {
            for(let line of text.split(/\r?\n/)) {
                if(line?.trim().length && !line.startsWith('//')) {
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
                    }
                }
            }
        }).catch(e => {
            throw e;
        })
    });

    return blocklist;
}