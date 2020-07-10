import * as React from 'react';
import './star.input.scss';
import { Div } from '@vkontakte/vkui';
import Icon24Star from '@vkontakte/icons/dist/24/favorite';

interface StarProps {

}

const StarInput: React.FC<StarProps> = ({ }) => {


    return (
        <Icon24Star>

        </Icon24Star >
    );
}

StarInput.defaultProps = {

}

export default StarInput;