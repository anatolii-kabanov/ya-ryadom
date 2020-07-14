import './marker';
import * as React from 'react';

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
            : <svg onClick={(e: any) => onClick && onClick(e)} width="17" height="25" viewBox="0 0 35 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16.5" cy="17.5" r="14.5" fill="white" />
                <path d="M19.3218 16.5576C19.326 17.916 18.2379 19.0268 16.8914 19.0331C15.5533 19.0395 14.4277 17.9202 14.4194 16.5724C14.411 15.2055 15.4949 14.1265 16.8747 14.1307C18.2921 14.1349 19.3176 15.1526 19.3218 16.5576Z" fill="black" />
                <path fill={inActive ? '#E7E5E5' : '#F05C44'} d="M8.24448e-05 16.9155C-0.0240118 9.09601 5.48553 2.1748 13.1475 0.426449C20.8255 -1.32992 28.8087 2.46351 32.198 9.51305C34.6636 14.6458 34.6877 19.8588 31.957 24.8392C27.9333 32.1614 23.6847 39.3553 19.5003 46.5812C18.2796 48.6905 15.6774 48.6905 14.4486 46.5732C10.2482 39.3553 6.07985 32.1132 1.95171 24.8552C0.570312 22.4091 -0.00794896 19.7224 8.24448e-05 16.9155Z" />
            </svg>
    )
}

export default Marker;
