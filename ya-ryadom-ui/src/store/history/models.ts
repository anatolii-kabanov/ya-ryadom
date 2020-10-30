export interface VkHistoryModel {
	view: string;
	panel: string;
	tab?: string;
	modal?: string;
}

export class VkHistoryModel implements VkHistoryModel {
	constructor(view: string, panel: string, tab?: string, modal?: string) {
		this.view = view;
		this.panel = panel;
		this.tab = tab;
		this.modal = modal;
	}
}
