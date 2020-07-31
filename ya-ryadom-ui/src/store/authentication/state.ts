import { CurrentUser, Geo } from "./models";
import { UserInfo } from "@vkontakte/vk-bridge";

export interface AuthenticationState {
    currentUser: CurrentUser | null;
    vkUserInfo: UserInfo | null;
    geoData: Geo | null;
}
