import { ThemeType } from "../../utils/enums/theme-type.enum";

export interface User {
    vkUserId: number,
    firstName: string,
    lastName: string,
    vkUserAvatarUrl: string,
    selectedThemes: ThemeType[],
    aboutMySelf: string;
    avgRating: number;
    // some settings
}

export interface CurrentUser {
    guideCompleted: boolean,
    selectedThemes: ThemeType[],
    lastLocation: Position | null,
    aboutMySelf: string;
    avgRating: number;
    notificationsEnabled: boolean;
    geolocationEnabled: boolean;
    address: string;
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
