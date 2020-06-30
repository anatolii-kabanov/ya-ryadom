import { ThemeType } from "../../../utils/enums/theme-type.enum";

export interface MyEvent {
    distance: number,
    longitude: number,
    latitude: number,
    date: Date,
    title: string,
    description: string,
    maxQuantiyty: number,
    revoked: boolean,
    id: number
}

export interface MyEventCreate {
    longitude: number,
    latitude: number,
    date: string,
    time: string,
    title: string,
    description: string,
    maxQuantiyty: number,
    vkUserId: number,
    selectedThemes: ThemeType[]
}
