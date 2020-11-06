import { VIEWS } from '../../utils/enums/views.enum';
import { ViewPanelsHistory } from './models';

export interface HistoryState {
    viewsHistory: VIEWS[];
    viewPanelsHistory: ViewPanelsHistory;
    currentView: VIEWS;
	currentModal: string | null;
}
