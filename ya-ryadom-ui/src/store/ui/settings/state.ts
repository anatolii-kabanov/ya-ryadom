import { ThemeType } from "../../../utils/enums/theme-type.enum";
import { Position } from '../../authentication/models';

export interface SettingsState {
    eventsFilter: EventsFilter,
    eventsFilterForm: EventsFilter,
}

export interface EventsFilter {
    radius: number;
    text?: string;
    selectedTheme?: ThemeType;
    selectedPosition?: Position;
    address?: string;
}