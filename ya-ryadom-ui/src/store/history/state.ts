import { VkHistoryModel } from './models';

export interface HistoryState {
	history: VkHistoryModel[];
	currentViewPanel: VkHistoryModel;
	currentModal: string | null;
}
