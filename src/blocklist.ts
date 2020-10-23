export interface Blocklist {
    [key: string]: BlocklistItem;
}

export interface BlocklistItem {
    blockId: string;
    stateValues: string;
}

export function parseBlocklist(files: FileList): Blocklist {
    let blocklist: Blocklist = {};

    Array.from(files).forEach(file => {
        file.text().then(text => {
            for(let line of text.split(/\r?\n/)) {
                if(line?.trim().length && !line.startsWith('//')) {
                    let parts = line.split(';');
                    blocklist[parts[4]] = {
                        blockId: parts[1],
                        stateValues: parts[2],
                    }
                }
            }
        })
    });

    return blocklist;
}