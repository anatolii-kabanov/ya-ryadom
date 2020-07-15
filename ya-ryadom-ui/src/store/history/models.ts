export interface VkHistoryModel {
    view: string;
    panel: string;
    tab?: string;
};

export class VkHistoryModel implements VkHistoryModel {
    constructor(view: string, panel: string, tab?: string) {
        this.view = view;
        this.panel = panel;
        this.tab = tab;
    }
}
