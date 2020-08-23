import { ComplaintType } from "../enums/complaint-type.enum";


export const ALL_COMPLAINTS = [
    {
        name: 'Спам',
        id: ComplaintType.spam
    },
    {
        name: 'Неприемлемый контент',
        id: ComplaintType.inappropriateContent
    },
    {
        name: 'Остальное',
        id: ComplaintType.other
    },
]
