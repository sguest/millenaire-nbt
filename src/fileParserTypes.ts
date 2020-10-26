export interface FileBuildingData {
    path: string;
    textFile?: TxtBuildingData;
    pngs: PngBuildingData[];
    promises: Promise<void>[];
}

export interface PngBuildingData {
    path: string;
    imageData: ImageData;
    index: number;
}

export interface TxtBuildingData {
    width: number;
    length: number;
    startLevels: number[];
}