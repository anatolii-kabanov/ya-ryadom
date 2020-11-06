export enum HistoryTypes {
    GO_FORWARD_PANEL = '[History Types] Navigate to view panel',
    MOVE_TO_NEXT_PANEL = '[History Types] Move to next view panel (push)',
    
	GO_BACK_PANEL = '[History Types] Navigate back to view panel',
    MOVE_TO_PREVIOUS_PANEL = '[History Types] Move to previous view panel (pop)',

    SET_CURRENT_VIEW = '[History Types] Set current view',
    SET_TAB_FOR_CURRENT_VIEW_PANEL = '[History Types] Set tab for view panel',
    
	RESET_VIEW_PANEL = '[History Types] Reset to view panel',
	SET_ACTIVE_MODAL = '[History Types] Set active modal',
	OPEN_USER_PROFILE = '[History Types] Open user profile',
	OPEN_EVENT_BY_ID = '[History Types] Open event information by id',
}
