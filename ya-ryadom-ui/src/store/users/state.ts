import { User } from './models';

export interface UsersState {
	usersProfiles: UsersProfiles;
	selectedProfileVkId: number;
}

export interface UsersProfiles {
	[key: number]: User;
}
