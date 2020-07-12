import * as React from 'react';
import './star.input.scss';
import Icon24Star from '@vkontakte/icons/dist/24/favorite';

interface StarProps {
    rating: number;
    selected: boolean;
    onClick?: (rating: number) => void;
}

const StarInput: React.FC<StarProps> = ({ rating, selected, onClick }) => {
    return (
        <Icon24Star className={`star ${selected ? 'selected' : ''}`} onClick={() => onClick && onClick(rating)}>
        </Icon24Star >
    );
}

StarInput.defaultProps = {

}

export default StarInput;