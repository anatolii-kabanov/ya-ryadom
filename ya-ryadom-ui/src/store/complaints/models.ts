export interface ComplaintToEventRequest {
    eventId: number;
    vkUserId: number;
}

export interface ComplaintToUserRequest {
    toVkUserId: number;
    vkUserId: number;
}
