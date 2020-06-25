import { ThemeType } from "../../utils/enums/theme-type.enum";

export interface User {
    guideCompleted: boolean,
    vkUserId: number,
    firstName: string,
    lastName: string,
    vkUserAvatarUrl: string,
    selectedThemes: ThemeType[],
    // some settings
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

export class User implements User {
    constructor() {

        this.guideCompleted = false;
    }
}
