import { ThemeType } from "../../utils/enums/theme-type.enum";

export interface User {
    vkUserId: number,
    firstName: string,
    lastName: string,
    vkUserAvatarUrl: string,
    selectedThemes: ThemeType[],
    aboutMySelf: string;
    avgRating: number;
}
