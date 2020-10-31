import { AppearanceSchemeType, AppearanceType } from '@vkontakte/vk-bridge';

export interface VkStyles {
	schemeType: AppearanceSchemeType;
    appearance: AppearanceType;
    viewportHeight: number;
}

export class VkStyles implements VkStyles {}
