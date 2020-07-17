import { ThemeType } from "../../../utils/enums/theme-type.enum";
import { ApplicationStatus } from "../../../utils/enums/application-status.enum";

export interface MyEvent {
    distance: number,
    longitude: number,
    latitude: number,
    createdDate: Date,
    date: Date,
    time: string,
    title: string,
    description: string,
    maxQuantity: number,
    revoked: boolean,
    id: number,
    themeType: ThemeType,
    ended: boolean,
    participants: Applicant[]
}

export interface Applicant {
    applicationId: number;
    vkUserId: number;
    vkUserAvatarUrl: string;
    applicationStatus: ApplicationStatus;
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
