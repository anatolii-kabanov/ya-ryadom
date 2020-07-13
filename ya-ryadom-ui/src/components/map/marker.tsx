import './marker';
import * as React from 'react';
import { ReactComponent as NavIcon } from './../../assets/images/svg/nav-icon.svg';
import { ReactComponent as NavIconSelected } from './../../assets/images/svg/nav-icon-selected.svg';

interface AllProps {
    lat: number,
    lng: number,
    text?: string,
    onClick?: (e: any) => any,
    selected?: boolean,
}

const Marker: React.FC<AllProps> = ({ lat, lng, onClick, selected }) => {
    return (
        selected
            ? <NavIconSelected onClick={(e: any) => onClick && onClick(e)}></NavIconSelected>
            : <NavIcon onClick={(e: any) => onClick && onClick(e)}></NavIcon>
    )
}

export default Marker;
