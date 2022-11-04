export enum FloorType {
    OFFICE = 1,
    MEETING_ROOM = 2,
    WAREHAUSE = 3,
    SHOP = 4
}

export interface FloorI {
    type: FloorType,
};