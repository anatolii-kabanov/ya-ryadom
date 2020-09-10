import { SnackbarNotification } from "./state";
import { NotificationType } from "../../../utils/enums/notification-type.enum";

export class SnackbarErrorNotification implements SnackbarNotification {
    public message: string;
    public type: NotificationType;

    constructor(message: string) {
        this.message = message;
        this.type = NotificationType.error;
    }
}

export class SnackbarSuccessNotification implements SnackbarNotification {
    public message: string;
    public type: NotificationType;

    constructor(message: string) {
        this.message = message;
        this.type = NotificationType.success;
    }
}
