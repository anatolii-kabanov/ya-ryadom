import { ThemeType } from "../../utils/enums/theme-type.enum";
import { UserInfo } from "@vkontakte/vk-bridge";

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

export class CurrentUser implements CurrentUser {

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

export interface GeolocationRequest {
    vkUserId?: number;
    geolocationEnabled: boolean;
    location: Position | null;
}

export interface SaveUserInfoRequest {
    vkUserId: number,
    firstName: string,
    lastName: string,
    vkUserAvatarUrl: string,
    guideCompleted: boolean,
    selectedThemes: ThemeType[],
    lastLocation: Position | null,
    aboutMySelf: string;
    notificationsEnabled: boolean;
    geolocationEnabled: boolean;
}

export class SaveUserInfoRequest implements SaveUserInfoRequest {

    static fromVkAndCurrentUser(vkUserInfo: UserInfo, currentUser: CurrentUser, position?: Position): SaveUserInfoRequest {
        const model = new SaveUserInfoRequest();

        model.vkUserId = vkUserInfo.id;
        model.firstName = vkUserInfo.first_name;
        model.lastName = vkUserInfo.last_name;
        model.vkUserAvatarUrl = vkUserInfo.photo_200;

        model.guideCompleted = true;
        model.geolocationEnabled = currentUser.geolocationEnabled;
        model.notificationsEnabled = currentUser.notificationsEnabled;
        model.lastLocation = position ?? currentUser.lastLocation;
        model.selectedThemes = currentUser.selectedThemes;
        model.aboutMySelf = currentUser.aboutMySelf;

        return model;
    }
}
