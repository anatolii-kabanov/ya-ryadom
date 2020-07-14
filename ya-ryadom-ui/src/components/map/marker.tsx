import './marker';
import * as React from 'react';
import { ReactComponent as NavIcon } from './../../assets/images/svg/nav-icon.svg';

interface AllProps {
    lat: number,
    lng: number,
    text?: string,
    onClick?: (e: any) => any,
    selected?: boolean,
    inActive?: boolean,
}

const Marker: React.FC<AllProps> = ({ lat, lng, onClick, selected, inActive }) => {
    return (
        selected
            ? <svg onClick={(e: any) => onClick && onClick(e)} width="26" height="36" viewBox="0 0 52 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill={inActive ? '#E7E5E5' : '#F05C44'} d="M0.000125992 25.639C-0.0366948 13.7869 8.38299 3.29637 20.092 0.646374C31.8255 -2.01578 44.0255 3.73398 49.2049 14.419C52.9729 22.1988 53.0097 30.1002 48.8367 37.649C42.6877 48.7474 36.1949 59.6513 29.8004 70.6038C27.9348 73.8008 23.9582 73.8008 22.0803 70.5916C15.6612 59.6513 9.29123 48.6745 2.98261 37.6733C0.871551 33.9658 -0.0121476 29.8935 0.000125992 25.639Z" />
                <circle cx="26.5" cy="25.5" r="15.5" fill="white" />
            </svg>
            : <NavIcon onClick={(e: any) => onClick && onClick(e)}></NavIcon>
    )
}

export default Marker;
