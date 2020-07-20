import { ApplicationStatus as ApplicationStatusEnum } from '../enums/application-status.enum';

export const ApplicationStatusString = {
    [ApplicationStatusEnum.none]: '',
    [ApplicationStatusEnum.sent]: 'В ожидании',
    [ApplicationStatusEnum.confirmed]: 'Подтверждено',
    [ApplicationStatusEnum.rejected]: 'Отклонено',
    [ApplicationStatusEnum.visited]: 'Посещено',
}