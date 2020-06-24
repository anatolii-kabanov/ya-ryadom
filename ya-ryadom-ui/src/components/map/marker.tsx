import './marker';
import * as React from 'react';
import { ReactComponent as NavIcon } from './../../assets/images/svg/nav-icon.svg';

interface AllProps {
    lat: number,
    lng: number,
    text?: string,
    onClick?: (e: any) => any,
}

const Marker: React.FC<AllProps> = ({ lat, lng, onClick }) => {
    return (
        <NavIcon onClick={(e: any) => onClick && onClick(e)}></NavIcon>
    )
}

export default Marker;
