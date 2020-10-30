import * as React from 'react';
import Icon from '@vkontakte/icons/dist/28/accessibility_outline';

interface AllProps {
	lat: number;
	lng: number;
	text?: string;
	onClick?: (e: any) => any;
}

const UserMarker: React.FC<AllProps> = ({ lat, lng, onClick }) => {
	return (
		<Icon
			className='nav-icon-selected'
			onClick={(e: any) => onClick && onClick(e)}
		></Icon>
	);
};

export default UserMarker;
