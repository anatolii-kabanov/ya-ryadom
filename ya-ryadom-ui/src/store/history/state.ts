import { PANELS } from '../../utils/enums/panels.enum';
import { VIEWS } from '../../utils/enums/views.enum';
import { ViewPanelsHistory, VkHistoryModel } from './models';

export interface HistoryState {
    history: VkHistoryModel[];
    viewPanelsHistory: ViewPanelsHistory;
    currentView: VIEWS;
	currentModal: string | null;
}
