import * as React from 'react';
import './pill.input.scss';
import { Div } from '@vkontakte/vkui';
import { ThemeType } from '../../utils/enums/theme-type.enum';

interface PillProps {
    id: ThemeType;
    text: string;
    selected: boolean;
    onClick?: (themeType: ThemeType) => void;
}

const PillInput: React.FC<PillProps> = ({ id, text, selected, onClick }) => {
    return (
        <Div className={`pill-container ${selected ? 'selected' : ''}`} onClick={() => onClick && onClick(id)}>{text}</Div>
    );
}

export default PillInput;