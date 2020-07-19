import * as React from 'react';
import './empty-text.scss';
import { Placeholder } from '@vkontakte/vkui';

interface PillProps {
    text?: string;
}

const EmptyText: React.FC<PillProps> = ({ text }) => {
    return (
        <Placeholder className='empty-text'>{text ?? "Тут пока ничего нет"}</Placeholder>
    );
}

export default EmptyText;