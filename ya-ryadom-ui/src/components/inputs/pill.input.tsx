import * as React from 'react';
import './pill.input.scss';
import { Div } from '@vkontakte/vkui';
import { ThemeType } from '../../utils/enums/theme-type.enum';

interface PillProps {
    id: ThemeType;
    text: string;
    selected: boolean;
    disabled?: boolean;
    onClick?: (themeType: ThemeType) => void;
}

const PillInput: React.FC<PillProps> = ({ id, text, selected, disabled = false, onClick }) => {
    return (
        <Div className={`pill-container ${disabled ? 'disabled' : ''} ${selected ? 'selected' : ''}`} onClick={() => onClick && onClick(id)}>{text}</Div>
    );
}

export default PillInput;