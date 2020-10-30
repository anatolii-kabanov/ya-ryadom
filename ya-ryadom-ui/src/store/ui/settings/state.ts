import { ThemeType } from '../../../utils/enums/theme-type.enum';
import { Position } from '../../authentication/models';
import { VkStyles } from './models';

export interface SettingsState {
	eventsFilter: EventsFilter;
	eventsFilterForm: EventsFilter;
	isClearFilterEnabled: boolean;
	isOnline: boolean;
	isWebView: boolean;
	vkStyles: VkStyles;
}

export interface EventsFilter {
	radius: number;
	text?: string;
	selectedTheme?: ThemeType;
	selectedPosition?: Position;
	address?: string;
}
