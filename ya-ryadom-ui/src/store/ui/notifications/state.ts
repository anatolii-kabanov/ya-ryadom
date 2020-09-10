import { NotificationType } from "../../../utils/enums/notification-type.enum";

export interface NotificationsState {
    notificationsList: SnackbarNotification[];
}

export interface SnackbarNotification {
    message: string;
    type: NotificationType;
}
