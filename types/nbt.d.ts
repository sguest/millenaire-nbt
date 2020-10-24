declare module 'nbt';

interface Window {
    nbt: nbt;
}

interface NbtCompoundTag {
    [key: string]: {
        type: string,
        value: NbtTag,
    }
}

interface NbtListTag {
    type: string;
    value: NbtTag[];
}

type NbtTag = NbtCompoundTag | NbtListTag | number | string | number[];

interface NbtRootTag {
    name: string;
    value: NbtCompoundTag;
}

interface nbt {
    writeUncompressed: (tag: NbtRootTag) => ArrayBuffer;
}