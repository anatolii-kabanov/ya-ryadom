import { ThemeType } from "../../../utils/enums/theme-type.enum";
import { Position } from '../../authentication/models';

export interface SettingsState {
    eventsFilter: EventsFilter,
    eventsFilterForm: EventsFilter,
    isClearFilterEnabled: boolean;
    isOnline: boolean;
}

export interface EventsFilter {
    radius: number;
    text?: string;
    selectedTheme?: ThemeType;
    selectedPosition?: Position;
    address?: string;
}