import { PANELS } from '../../utils/enums/panels.enum';
import { TABS } from '../../utils/enums/tabs.enum';
import { VIEWS } from '../../utils/enums/views.enum';

export type ViewPanelsHistory = {
    [key in VIEWS]: VkPanelHistoryModel[];
};

export interface VkPanelHistoryModel {
    panel: PANELS;
    tab?: TABS;
    modal?: string;
}

export interface VkHistoryModel extends VkPanelHistoryModel {
    view: VIEWS;
}

export class VkHistoryModel implements VkHistoryModel {
    constructor(view: VIEWS, panel: PANELS, tab?: TABS, modal?: string) {
        this.view = view;
        this.panel = panel;
        this.tab = tab;
        this.modal = modal;
    }
}
