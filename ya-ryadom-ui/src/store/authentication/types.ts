export enum AuthenticationTypes {
    FETCH_VK_USER_INFO = '[Authentication] (GET) VK User info',
    FETCH_VK_USER_INFO_SUCCESS = '[Authentication] VK User info success',
    FETCH_VK_USER_INFO_ERROR = '[Authentication] VK User info error',

    FETCH_USER_GEO = '[Authentication] (GET) User geo',
    FETCH_USER_GEO_SUCCESS = '[Authentication] User geo success',
    FETCH_USER_GEO_ERROR = '[Authentication] User geo error',

    CLEAR_USER_GEO = '[Authentication] Clear user geo',
    SET_USER_DEFAULT_LOCATION = '[Authentication] Set user default location',

    SAVE_USER_INFO = '[Authentication] (POST) Save user info',
    SAVE_USER_INFO_SUCCESS = '[Authentication] Save user info success',
    SAVE_USER_INFO_ERROR = '[Authentication] Save user info error',

    FETCH_USER_INFO = '[Authentication] (GET) User info',
    FETCH_USER_INFO_SUCCESS = '[Authentication] User info success',
    FETCH_USER_INFO_ERROR = '[Authentication] User info error',

    SAVE_USER_GUIDE_COMPLETED = '[Authentication] (POST) Save user guide completed',
    SAVE_USER_GUIDE_COMPLETED_SUCCESS = '[Authentication] Save user guide completed success',
    SAVE_USER_GUIDE_COMPLETED_ERROR = '[Authentication] Save user guide completed error',

    SET_USER_THEMES = '[Authentication] Set user themes',
    SAVE_USER_PROFILE_THEMES = '[Authentication] Save user themes on profile',
    SET_USER_ABOUT_MYSELF = '[Authentication] Set user about myself',
    SAVE_USER_PROFILE_ABOUT_MYSELF = '[Authentication] Save about myself on profile',

    SAVE_USER_THEMES = '[Authentication] (POST) Save user themes',
    SAVE_USER_THEMES_SUCCESS = '[Authentication] Save user themes success',
    SAVE_USER_THEMES_ERROR = '[Authentication] Save user themes error',

    SAVE_USER_LOCATION = '[Authentication] (POST) Save user location',
    SAVE_USER_LOCATION_SUCCESS = '[Authentication] Save user location success',
    SAVE_USER_LOCATION_ERROR = '[Authentication] Save user about my self error',

    SAVE_USER_ABOUT_MYSELF = '[Authentication] (POST) Save user about my self',
    SAVE_USER_ABOUT_MYSELF_SUCCESS = '[Authentication] Save user about my self success',
    SAVE_USER_ABOUT_MYSELF_ERROR = '[Authentication] Save user about my self error',

    ALLOW_NOTIFICATIONS = '[Authentication] Allow notifications',
    ALLOW_NOTIFICATIONS_SUCCESS = '[Authentication] Allow notifications success',
    ALLOW_NOTIFICATIONS_ERROR = '[Authentication] Allow notifications error',

    DISABLE_NOTIFICATIONS = '[Authentication] Disable notifications',
    DISABLE_NOTIFICATIONS_SUCCESS = '[Authentication] Disable notifications success',
    DISABLE_NOTIFICATIONS_ERROR = '[Authentication] Disable notifications error',

    COMPLETE_USER_GUIDE = '[Authentication] Complete user guide',
    SET_USER_GEOLOCATION = '[Authentication] Set user geo location',

    ENABLE_USER_LOCATION = '[Authentication] Enable user location',
    DISABLE_USER_LOCATION = '[Authentication] Disable user location',

    SET_USER_LOCATION_PROCESS = '[Authentication] Set user location',
};
