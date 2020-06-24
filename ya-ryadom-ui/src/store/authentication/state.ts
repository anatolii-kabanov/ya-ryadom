import { User, Geo } from "./models";
import { UserInfo } from "@vkontakte/vk-bridge";

export interface AuthenticationState {
    currentUser: User | null;
    vkUserInfo: UserInfo | null;
    geoData: Geo | null;
}
