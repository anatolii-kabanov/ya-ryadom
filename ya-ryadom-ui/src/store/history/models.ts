export interface VkHistoryModel {
    view: string;
    panel: string;
};

export class VkHistoryModel implements VkHistoryModel {
    constructor(view: string, panel: string) {
        this.view = view;
        this.panel = panel;
    }
}
