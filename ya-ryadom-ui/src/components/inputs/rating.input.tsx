import * as React from 'react';
import './rating.input.scss';
import { Div } from '@vkontakte/vkui';
import Icon24Star from '@vkontakte/icons/dist/24/favorite_outline';

interface RatingProps {

}

const RatingInput: React.FC<RatingProps> = () => {
    return (
        <Div className="rating">
            <Icon24Star></Icon24Star>
            <Icon24Star></Icon24Star>
            <Icon24Star></Icon24Star>
            <Icon24Star></Icon24Star>
            <Icon24Star></Icon24Star>
        </Div>
    );
}

export default RatingInput;