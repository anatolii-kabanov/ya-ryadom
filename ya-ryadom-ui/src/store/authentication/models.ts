export interface User {
    guideCompleted: boolean,
    vkUserId:number,
    firstName: string,
    lastName: string,
    vkUserAvatarUrl: string,
    // some settings
}

export interface Geo {
    available: boolean,
    lat: number,
    long: number,
}

export class User implements User {
    constructor() {
        
        this.guideCompleted = false;
    }
}
