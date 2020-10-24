declare module Zlib {
    class Gzip {
        constructor(data: Array<number> | Uint8Array);

        compress: () => Uint8Array;
    }
}