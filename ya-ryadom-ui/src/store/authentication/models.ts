import { ThemeType } from "../../utils/enums/theme-type.enum";

export interface User {
    guideCompleted: boolean,
    vkUserId: number,
    firstName: string,
    lastName: string,
    vkUserAvatarUrl: string,
    selectedThemes: ThemeType[],
    lastLocation: Position | null,
    aboutMySelf: string;
    avgRating: number;
    // some settings
}

export interface Position {
    // X
    longitude: number;

    // Y
    latitude: number;
}

export interface Geo {
    available: boolean,
    lat: number,
    long: number,
}

export interface UserIntro {
    vkUserId: number,
    selectedThemes: ThemeType[],
}

export interface UserBaseInfo {
    vkUserId: number,
    firstName: string,
    lastName: string,
    vkUserAvatarUrl: string,
}

export class User implements User {
    constructor() {

        this.guideCompleted = false;
    }
}
